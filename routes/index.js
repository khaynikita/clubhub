var express = require('express');
var router = express();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/eco', function(req, res) {
  res.render('eco');
});
router.get('/technical', function(req, res) {
  res.render('technical');
});
router.get('/cultural', function(req, res) {
  res.render('cultural');
});
router.get('/sports', function(req, res) {
  res.render('sports');
});
router.get('/join', function(req, res) {
  res.render('form');
});



module.exports = router;
