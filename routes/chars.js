var express = require('express');
var Char = require('../Model/Char');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('chars/chars', { title: 'Chars'});
});
/* GET users listing. */
router.get('/newchar', function(req, res, next) {
  res.render('chars/newchar', { title: 'Chars'});
});
router.post('/newchar', function(req, res, next) {
  console.log(req.body);
  const char = new Char();
  char.newChar(req.body);
  res.render('chars/newchar', { title: 'Chars'});
});

module.exports = router;
