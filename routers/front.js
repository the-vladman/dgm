var express = require('express'),
  router = express.Router();

/*
  redirect engine
*/
router.all("/", function(req, res, next){
  var originUrl = req.get("referer");

  if(originUrl && originUrl.match(/.*gob.mx.*/gi)){
    var match = originUrl.match(/.*www\.(\w*)?\.?(?:gob\.mx\/)(\w*)?/i);
    var organization = match==null ? null:match[1] ? match[1]:match[2];
    var regex = new RegExp("," + organization + ",", "i");

    if(process.env.DGM_ORGANIZATIONS_REDIRECT_ENGINE.match(regex)){
      res.redirect("busca/organization/" + organization);
      return;
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

module.exports = router;
