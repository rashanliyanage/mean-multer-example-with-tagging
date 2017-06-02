var express = require('express');
var router = express.Router();
var fs = require('fs');
var Upload = require('../models/upload');
var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});
var author;
var _ = require('underscore');


/**
 * Create's the file in the database
 */
router.post('/', upload.single('file'), function (req, res, next) {
    var newUpload = {
        name: req.body.name,
        tags: req.body.tags,
        created: Date.now(),
        file: req.file

    };
    Upload.create(newUpload, function (err, next) {
        if (err) {
            next(err);
        } else {
            res.send(newUpload);
        }
    });

});



// /**
//  * Gets the list of all files from the database
//  */
router.get('/', function (req, res, next) {
    Upload.find({}, function (err, uploads) {
        if (err) next(err);
        else {
            res.send(uploads);
        }
    });
});


router.get('/sessions', function (req, res, next) {
    Upload.find().distinct('name', function (err, upload) {
        if (err) {
            next(err);
        } else {
            res.send(upload);
        }
        //}).select('name -_id');


        // Upload.find({}, function (err, uploads) {
        // if (err) next(err);
        // else {
        //     console.log(uploads);
        //     res.send(uploads);
        // }
    });
});




/**
 * Gets the list of all files from the database with name
 */
router.get('/:author', function (req, res, next) {
    author = req.params.author;
    Upload.find({
        'name': req.params.author
    }, function (err, upload) {
        if (err) next(err);
        else {
            res.send(upload);
        }
    });
});

/**
 * Change tags of one images. Maybe add some too
 */
// router.put('/:uuid/:filename', function(req, res) {
//     Upload.findOne({
//         'file.filename': req.params.uuid,
//         'file.originalname': req.params.filename
//     }, function(err, upload) {
//         if (err) next(err);
//         else {
//             res.set({
//                 "Content-Disposition": 'inline; filename="' + upload.file.originalname + '"',
//                 "Content-Type": upload.file.mimetype
//             });
//             Upload = _.extend(Uploads, req.params);
//
//
//             Upload.save(function(err) {
//                 res.send(uploads);
//             })
//         }
//     });
// });


/*router.put('/:uuid/:filename', function(req, res) {
    Upload.update({
        'file.filename': req.params.uuid,
        'file.originalname': req.params.filename
    }, { $set: { tags: req.body.tags }},
    function(err, upload) {
        if (err) next(err);
        else {
          res.send(upload);
        }
    });
});*/

router.put('/:uuid/:filename', function (req, res) {
    Upload.findOneAndUpdate({
            'file.filename': req.params.uuid,
            'file.originalname': req.params.filename
        }, {
            $push: {
                tags: req.body.tags
            }
        },
        function (err, upload) {
            if (err) next(err);
            else {
                res.send(upload);
            }
        });
});


/**
 * Gets a file from the hard drive based on the unique ID and the filename
 */

router.get('/:uuid/:filename', function (req, res, next) {
    Upload.findOne({
        'file.filename': req.params.uuid,
        'file.originalname': req.params.filename
    }, function (err, upload) {
        if (err) next(err);
        else {

            // res.send(upload);
            res.set({
                "Content-Disposition": 'attachment; filename="' + upload.file.originalname + '"',
                "Content-Type": upload.file.mimetype
            });
            fs.createReadStream(upload.file.path).pipe(res);
        }
    });
});


router.get('/image/:uuid/:filename', function (req, res, next) {
    Upload.find({
        'file.filename': req.params.uuid,
        'file.originalname': req.params.filename
    }, function (err, upload) {
        if (err) next(err);
        else {
            res.send(upload);
        }
    });
});

module.exports = router;