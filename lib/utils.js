var fs = require('fs'),
  mkdirp = require('mkdirp'),
  multiparty = require('multiparty'),
  path = require('path'),
  config = require('../config/app'),
  String = require('./string'),
  setFilters = function(supported, query) {
    var filters = {};
    for (var i = 0; i < supported.length; i++) {
      var key = supported[i];
      if (query[key]) {
        switch (key) {
          case 'name':
            filters[key] = new RegExp(query[key], 'i');
            break;
          case '$and':
            filters.$and = [];
            for (var j = 0; j < query.$and.length; j++) {
              if (typeof query.$and[j] == 'string') {
                filters.$and[j] = setFilters(supported, JSON.parse(query.$and[j]));
              } else {
                filters.$and[j] = setFilters(supported, query.$and[j]);
              }
            }
            break;
          case '$or':
            filters.$or = [];
            for (var j = 0; j < query.$or.length; j++) {
              if (typeof query.$or[j] == 'string') {
                filters.$or[j] = setFilters(supported, JSON.parse(query.$or[j]));
              } else {
                filters.$or[j] = setFilters(supported, query.$or[j]);
              }
            }
            break;
          case 'creation_date':
            if (typeof query[key] == 'object') {
              var objKey = Object.keys(query[key])[0];

              filters[key] = {};
              filters[key][objKey] = new Date(query[key][objKey]);
            } else {
              filters[key] = query[key]
            }
            break;
          case 'user':
            filters[key] = new mongoose.Types.ObjectId(query[key]);
            break;
          default:
            if (Array.isArray(query[key])) {
              filters[key] = {
                "$in": query[key]
              };
            } else {
              try {
                filters[key] = JSON.parse(query[key]);
              } catch (e) {
                filters[key] = query[key];
              }
            }
        }
      }
    }

    return filters;
  };

exports.cors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Lenght, X-Requested-With');

  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

exports.move = function(file, dest, cb, index) {
  mkdirp(dest, function(err, dir) {
    if (err) {
      return cb(err);
    }
  });

  var full = path.join(dest, file.name),
    source = fs.createReadStream(file.path),
    writeDest = fs.createWriteStream(full);

  source.pipe(writeDest);
  source.on('end', () => {
    fs.unlink(file.path);
    source.close();
  });

  source.on('error', (err) => {
    return cb(err);
  });
  writeDest.on('close', function() {
    return cb(null, {
      name: file.name,
      path: full
    }, index);
  });
};
/**** FUNCION refactorizar ***/
// exports.paginate = function(Model, supported, refs, req, res, next) {
//   console.log('QUERYYYY', req.query);
//
//   console.log('NO AGREGATE');
//   var cursor = Model.find(),
//   callback = function(err, docs) {
//     console.log('OSCOOS!', docs.length);
//     res.json(docs);
//   };
//   cursor.exec(callback)
// };

exports.paginate = function(Model, supported, refs, req, res, next) {
  supported.push('$and');
  supported.push('$or');

  var aggregate = req.query.aggregate,
    filters = setFilters(supported, req.query),
    select = (req.query.select) ? req.query.select : null,
    page = (req.query.page) ? req.query.page : 1,
    pageSize = (req.query.per_page) ? req.query.per_page : parseInt(config.page_size),
    sort = (req.query.sort) ? req.query.sort : 'name',
    order = (req.query.order) ? req.query.order : 'ASC',
    obj = {};

  obj[sort] = (order == 'DESC') ? -1 : 1;
  var options = {
    limit: parseInt(pageSize),
    skip: (page - 1) * pageSize,
    sort: obj
  };

  if (aggregate) {
    var field = aggregate.substring(0, aggregate.indexOf(':')),
      method = aggregate.substring(aggregate.indexOf(':') + 1),
      query = null;

    switch (method) {
      default: query = [{
          $match: filters
        },
        {
          $group: {
            _id: '$' + method,
            count: {
              $sum: 1
            }
          }
        },
        {
          $sort: {
            count: -1
          }
        }
      ];
    }

    Model.aggregate(query, function(err, results) {
      var response = {
        results: results,
        pagination: {
          total: results.length,
          page: 1,
          per_page: -1
        }
      };
      res.json(response);
    });
  } else {
    var cursor = Model.find(filters, select, options),
      callback = function(err, docs) {
        Model.count(filters, function(err, count) {
          var response = {
            results: docs,
            pagination: {
              total: count,
              page: page,
              per_page: pageSize
            }
          };

          res.json(response);
        });
      };

    if (req.query.expanded && req.query.expanded === 'true') {
      if (refs != null) {
        for (var i = 0; i < refs.length; i++) {
          cursor.populate(refs[i].field, refs[i].select);
        }
      }

      cursor.exec(callback);
    } else {
      cursor.exec(callback)
    }
  }
};
/**** FUNCION refactorizar ***/

exports.params = function(req, res, next) {
  var type = req.get('Content-Type'),
    form = new multiparty.Form({
      uploadDir: config.uploads_tmp_path
    }),
    params = {};

  if (/multipart\/form-data/.test(type)) {
    form.parse(req, function(err, fields, files) {
      for (var key in fields) {
        params[key] = fields[key][0];
      }

      params.files = files;

      req.body = params;
      req.uploading = true;
      next();
    });
  } else {
    req.uploading = false;
    next();
  }
};

exports.upload = function(req, field, filePath, cb) {
  mkdirp(filePath, function(err, dir) {
    if (err) {
      var error = new Error('Error uploading file');
      error.status = 403;

      return cb(error);
    }

    var file = req.body.files[field][0];
    ext = /(?:\.([^.]+))?$/.exec(file.path)[1],
      name = String.random(16, 'alnum'),
      full = path.join(filePath, name + '.' + ext);

    if (!ext) {
      var error = new Error('Invalid file name');
      error.status = 403;

      return cb(error);
    }

    fs.rename(file.path, full, function(err) {
      if (err) {
        var error = new Error('Error uploading file');
        error.status = 403;

        cb(error);
      } else {
        cb(null, {
          name: name + '.' + ext,
          path: full
        });
      }
    });
  });
};
/**
 * Función para obtener los binarios del del campo contenido
 * @param  {[type]} content [es el contenido que va dentro del post, este trae todo el contenido en formato html para luego renderizarlo en la pagina]
 * @return {[type]}         [regresa un array de objetos con el binario y el la extension de la imagen]
 */
exports.getImagesFromContent = function(content) {
  const regex = /data:image\/([a-zA-Z]*);base64,([^\"]*)/g;
  imagesFound = [];
  var m;
  while ((m = regex.exec(content)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    imagesFound.push({
      ext: m[1],
      binary: m[0]
    });
  }
  return imagesFound;
};
/**
 * Guarda las imagenes que se extrajeron del contenido, las guarda en la carpeta del post
 * @param  {[type]} content [Es el array de los binarios con sus extensiones]
 * @param  {[type]} id      [es el id del post]
 * @param  {[type]} dest    [la url del destino donde se guardara la imagen]
 * @return {[type]}         [Es un array con las urls de las imagenes guardaadas]
 */
exports.saveImagesFromContent = function(content, id, dest) {
var imagesUrls = [];
mkdirp(dest, function(err, dir) {
  if (err) {
    console.log(err);
    return cb(err);
  }
});
content.forEach((c, index) => {
  var data = c.binary.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');
  var pth = `${dest}/${id}-${index}.${c.ext}`;
  fs.writeFile(pth, buf);
  imagesUrls.push({ url: pth });
});

return imagesUrls;
};
/**
 * función que quita los binarios del contenido, y solo coloca las urls de las imagenes
 * @param  {[type]} content [es el string de contenido]
 * @param  {[type]} images  [array con los binarios]
 * @param  {[type]} urls    [array con los urls de las imagenes]
 * @return {[type]}         [El contenido ya limpio, sin los binarios]
 */
exports.returnContentWithUrls = function(content, images, urls) {
  var newContent = content;
  images.forEach((image, index) => {
    newContent = newContent.replace(image.binary, urls[index].url);
  });
  return newContent;
};
