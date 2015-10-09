var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 请求开奖信息 */
router.get('/open', function(req, res, next) {
/*    res.json({success: 1});*/
/*    res.json(
        {
            "lottery": [
            {"openNum":"49","num1":"01","num2":"03","num3":"05","num4":"07","num5":"10"},
            {"openNum":"50","num1":"01","num2":"03","num3":"05","num4":"07","num5":"10"},
            {"openNum":"51","num1":"01","num2":"03","num3":"05","num4":"07","num5":"10"},
            {"openNum":"52","num1":"01","num2":"03","num3":"05","num4":"07","num5":"10"},
            {"openNum":"53","num1":"01","num2":"03","num3":"05","num4":"07","num5":"10"},
            {"openNum":"54","num1":"01","num2":"03","num3":"05","num4":"07","num5":"10"},
            {"openNum":"55","num1":"01","num2":"03","num3":"05","num4":"07","num5":"10"},
            {"openNum":"56","num1":"01","num2":"03","num3":"05","num4":"07","num5":"10"}
            ]
        });*/
    res.render('open', {title: 'open'});
})
module.exports = router;
