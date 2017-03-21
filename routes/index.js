const express = require('express');
const fs = require('fs')
const path = require('path');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Import Export for vPodPlayer' });
});

function writeJs(res, fn, data) {
    fs.writeFile(fn, data, function (err) {
        if (err) {
            res.send(JSON.stringify({success: false, msg: err , data: {}}));
            return;
        }
        res.send(JSON.stringify({success: true, msg: "saved", data: {key: exportKey}}));
    })
};

/* POST a dump */
router.post('/', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    for (var ii = 1; ii < 1000; ii++)
    {
        var exportKey = "exports" + ("" + (1000 + ii)).substr(1, 4);
        var uploadDir = req.app.get('uploadDir');
        var exportFilename = path.join(uploadDir, exportKey + ".json");
        if (!fs.existsSync(exportFilename)) {
            fs.openSync(exportFilename, 'w');
            var json = JSON.stringify(req.body);
            writeJs(res, exportFilename, json);
            break;
        }
    }

});

module.exports = router;
