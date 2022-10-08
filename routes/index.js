var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/aku', function(req, res){
  res.json({
    msg:'akuuuu'
  })
})

module.exports = router;
