var express = require('express');
var router = express.Router();
var fs = require('fs');
var Upload = require('../models/upload');
var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});
var _ = require('underscore');


/**
 * Create's the file in the database
 */
router.post('/', upload.single('file'), function(req, res, next) {
    var newUpload = {
        name: req.body.name,
        tags: req.body.tags,
        created: Date.now(),
        file: req.file

    };
    Upload.create(newUpload, function(err, next) {
        if (err) {
            next(err);
        } else {
            res.send(newUpload);
        }
    });

});



/**
 * Gets the list of all files from the database
 */
router.get('/', function(req, res, next) {
    Upload.find({}, function(err, uploads) {
        if (err) next(err);
        else {
            res.send(uploads);
        }
    });
});


/**
* Change tags of one images. Maybe add some too
*/
router.put('/:uuid/:filename', function(req, res) {
    Upload.findOne({
        'file.filename': req.params.uuid,
        'file.originalname': req.params.filename
    }, function(err, upload) {
        if (err) next(err);
        else {
            res.set({
                "Content-Disposition": 'inline; filename="' + upload.file.originalname + '"',
                "Content-Type": upload.file.mimetype
            });
            Upload = _.extend(Uploads, req.params);


            Upload.save(function (err){
              res.send(uploads);
            })
        }
    });
});


/**
 * Gets a file from the hard drive based on the unique ID and the filename
 */

router.get('/:uuid/:filename', function(req, res, next) {
    //console.log(req.params);
    Upload.findOne({
        'file.filename': req.params.uuid,
        'file.originalname': req.params.filename
    }, function(err, upload) {
        if (err) next(err);
        else {
            res.set({
                "Content-Disposition": 'inline; filename="' + upload.file.originalname + '"',
                "Content-Type": upload.file.mimetype
            });
            fs.createReadStream(upload.file.path).pipe(res);
        }
    });
});

module.exports = router;
