var request = require('request'),
  schedule = require('node-schedule')
  express = require('express'),
  router = express.Router();

var sem = require('semaphore')(1);

/*
  redirect engine
*/
var organizations;
router.all("/", function(req, res, next){
  var originUrl = req.get("referer");

  if(originUrl && originUrl.match(/.*gob.mx.*/gi)){
    var match = originUrl.match(/.*www\.(\w*)?\.?(?:gob\.mx\/)(\w*)?/i);
    var refererOrganization = match==null ? null:match[1] ? match[1]:match[2];

    if(match){

      if(!organizations || organizations.length == 0){
        console.log("Error: variable de organizaciones vacia.");

        buildDGMOrganizationsVar();


        console.log("Resolviendo referer mediante API.");
        request.get("https://api.datos.gob.mx/v1/ckan-organizations?name=" + refererOrganization, function(error, response, body){
          if(error){
           console.log("Error en la respuesta del servidor.", error);
          }

          body = JSON.parse(body);

          if(body.error){
            console.log("Error en la petición.", body);
            next();
            return;
          }

          if(body.results.length == 0){
            console.log("No se encontro la organización.", refererOrganization);
          }else{
            res.redirect("busca/organization/" + refererOrganization);
            return;
          }
        });

        return;
      } else if (organizations.indexOf(refererOrganization) > -1) {
        res.redirect("busca/organization/" + refererOrganization);
        return;
      }


      console.log("Organización no encontrada.", refererOrganization, originUrl);

    }

  }
  next();
});

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/partials/:module/:view', function(req, res) {
  res.render('partials/' + req.params.module + '/' + req.params.view);
});

router.get('*', function(req, res) {
  res.render('index');
});

/*
  redirect engine variable
  From this variable the function validates if the referer is a valid organization
*/
function buildDGMOrganizationsVar(){
  if(sem.available(1)){
    sem.take(function(){
      request.get("https://api.datos.gob.mx/v1/ckan-organizations?pageSize=99999", function(error, response, body){
        console.log("Iniciando actualización de la variable de redirección.");

        if(error){
          console.log("Error en la respuesta del servidor.", error);
        }else{
          body = JSON.parse(body);

          if(body.error){
            console.log("Error", JSON.stringify(body))
          }else{
            organizations = [];
            for(var result of body.results ){
              organizations.push(result.name);
            }

            console.log("Variable de redirección actualizada.", JSON.stringify(organizations));
          }
        }

        sem.leave();
      });
    });
  }
}

// update the var each day
schedule.scheduleJob('15 1 * * *', function(){
  buildDGMOrganizationsVar();
});

// buildDGMOrganizationsVar();
module.exports = router;
