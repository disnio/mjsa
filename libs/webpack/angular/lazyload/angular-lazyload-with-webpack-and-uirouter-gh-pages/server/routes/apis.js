var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({ username: 'admin', password: 'admin' });
});

module.exports = router;
