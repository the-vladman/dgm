var express = require('express'),
  debug = require('debug')('app'),
  app = express(),
  livereload = require('livereload'),
  error = require('./lib/error'),
  start = require('./lib/start'),
  request = require('request'),
  schedule = require('node-schedule');

// Set the PORT and ENV variables and start the server
app.set('port', process.env.PORT || 3000);
app.set('env', process.env.ENV || 'development');
app.settings.env = app.get('env');
process.env.CDN_URL = process.env.CDN_URL || 'http://cdn.datos.gob.mx/bower_components/';

buildDGMOrganizationsVar();
start.launch(app);

// Set the CMS server routes
var cmsApi = require('./routers/cmsApi'),
  front = require('./routers/front');

app.use('/cms-api', cmsApi);
app.use('/', front);

app.use(error.notFound);
app.use(error.handler);

if (app.get('env') == 'development') {
  var liveServer = livereload.createServer();
  liveServer.watch(__dirname + '/public');
}

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
module.exports = app;

/*
  redirect engine env variable
  From this env the function validates if is a valid organization
*/
function buildDGMOrganizationsVar(){
  request.get("https://api.datos.gob.mx/v1/ckan-organizations?pageSize=9999", function(error, response, body){

    if(error){
      console.log("Error updating DGM_ORGANIZATIONS_REDIRECT_ENGINE");
    }else{
      body = JSON.parse(body);
      if( body.results instanceof Array ){
        var organizations = ",";
        for(var organization of body.results){organizations += organization.name + ",";}
        process.env.DGM_ORGANIZATIONS_REDIRECT_ENGINE=organizations;
      }
    }

  });
}

// update the var each day
schedule.scheduleJob('15 1 * * *', function(){
  buildDGMOrganizationsVar();
});
