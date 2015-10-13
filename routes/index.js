var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/open', function(req, res, next) {
    res.json({
        "winning": [{
            "openNum": "49期",
            "numbers": "01 03 05 07 10"
        }, {
            "openNum": "50期",
            "numbers": "01 03 05 07 10"
        }, {
            "openNum": "51期",
            "numbers": "01 03 05 07 10"
        }, {
            "openNum": "52期",
            "numbers": "01 03 05 07 10"
        }, {
            "openNum": "53期",
            "numbers": "01 03 05 07 10"
        }, {
            "openNum": "54期",
            "numbers": "01 03 05 07 10"
        }, {
            "openNum": "55期",
            "numbers": "01 03 05 07 10"
        }, {
            "openNum": "56期",
            "numbers": "01 03 05 07 10"
        }]
    });
})

router.post('/submit', function(req, res, next) {
    res.json({
        success: 1
    });
});

module.exports = router;
