var express = require('express'),
  mongoose = require('mongoose'),
  config = require('../config/app'),
  Api = require('../models/apis'),
  Utils = require('../lib/utils'),
  Session = require('../lib/session'),
  router = express.Router();

router.get('', function(req, res, next) {
  var filters = ['organization', 'title', 'type'];

  Utils.paginate(Api, filters, [], req, res, next);
});

router.get('/:id', function(req, res, next) {
  var cursor = Api.findOne({
      _id: mongoose.Types.ObjectId(req.params.id)
    }),
    callback = function(err, api) {
      if (err || !api) {
        err = new Error('Invalid api id');
        err.status = 404;
        next(err);
      } else {
        res.json(api);
      }
    };

  if (req.query.expanded && req.query.expanded === 'true') {
    var refs = _getRefs();
    for (var i = 0; i < refs.length; i++) {
      cursor.populate(refs[i].field, refs[i].select);
    }

    cursor.exec(callback);
  } else {
    cursor.exec(callback)
  }
});

router.post('/', Session.validate, function(req, res, next) {
  if (req.session.access_level > 2) {
    var err = new Error('Permission denied');
    err.status = 401;
    next(err);
  } else {
    Api.create({
      format: req.body.format,
      link: req.body.link,
      organization: req.body.organization,
      title: req.body.title,
      type: req.body.type
    }, function(err, api) {
      if (err || !api) {
        err = new Error('Invalid api data');
        err.status = 403;
        next(err);
      } else {
        res.json(api);
      }
    });
  }
});

router.put('/:id', Session.validate, function(req, res, next) {
  var updated = function(err, api) {
    res.json(api);
  };

  Api.findById(req.params.id, function(err, api) {
    if (err || !api) {
      err = new Error('Invalid api id');
      err.status = 404;
      next(err);
    } else {
      for (var key in req.body) {
        if (key == 'creation_date') {
          continue;
        }

        api[key] = req.body[key];
      }

      api.save(updated);
    }
  });
});

router.delete('/:id', Session.validate, function(req, res, next) {
  if (req.session.access_level > 2) {
    var err = new Error('Permission denied');
    err.status = 401;
    next(err);
  } else {
    var removed = function(err, api) {
      res.json(api);
    };

    Api.findById(req.params.id, function(err, api) {
      if (err || !api) {
        err = new Error('Invalid api id');
        err.status = 404;
        next(err);
      } else {
        api.remove(removed);
      }
    });
  }
});

module.exports = router;
