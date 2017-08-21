var express = require('express'),
  User = require('../models/user'),
  Utils = require('../lib/utils'),
  router = express.Router();

router.get('', function(req, res, next) {
  var filters = ['name', 'email', 'type'];

  Utils.paginate(User, filters, [], req, res, next);
});

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, '-pass', function(err, user) {
    if (err || !user) {
      err = new Error('Invalid user id');
      err.status = 404;
      next(err);
    } else if (user._id != req.session.user_id && req.session.access_level > 2) {
      err = new Error('Permission denied');
      err.status = 401;
      next(err);
    } else {
      res.json(user);
    }
  });
});

router.post('/', function(req, res, next) {
  if (req.session.access_level > 2) {
    var err = new Error('Permission denied');
    err.status = 401;
    next(err);
  } else {
    User.create({
      avatar: req.body.avatar,
      name: req.body.name,
      email: req.body.email,
      pass: req.body.pass,
      type: req.body.type
    }, function(err, user) {
      if (err || !user) {
        err = new Error('Invalid user data');
        err.status = 403;
        next(err);
      } else {
        res.json(user);
      }
    });
  }
});

router.delete('/:id', function(req, res, next) {
  if (req.session.access_level > 2 && req.session.user_id != req.params.id) {
    var err = new Error('Permission denied');
    err.status = 401;
    next(err);
  } else {
    var removed = function(err, user) {
      res.json(user);
    };

    User.findById(req.params.id, function(err, user) {
      if (err || !user) {
        err = new Error('Invalid user id');
        err.status = 404;
        next(err);
      } else {
        user.remove(removed);
      }
    });
  }
});

module.exports = router;
