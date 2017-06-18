var express = require('express');
var router = express.Router();
var fs = require('fs');
var Upload = require('../models/upload');
var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});
var author;


/**
 * Create's the file in the database
 */
// router.post('/', upload.single('file'), function (req, res, next) {
router.post('/', upload.single('file'), function (req, res, next) {

    console.log(req.body);
    var newUpload = {
        sessionName: req.body.sessionName,
        tags: null,
        sessionIdentifier: req.body.sessionIdentifier,
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



// router.put('/update/:uuid/:filename', upload.fields([
//   { name: 'name', maxCount: 1 },  
//   { name: 'CreatorArtist', maxCount: 1 },
//   { name: 'info', maxCount: 1 }
// ]), function (req, res, next) {

// router.put('/update/:uuid/:filename', upload.single('file'), function (req, res, next) {
// // router.put('/update/:uuid/:filename', function (req, res, next) {

//     // console.log("_______________________req.FILES_______________________________________");
//     // console.log(req.files);
//     // console.log("_______________________req_______________________________________");
//     // console.log(req);
//     console.log("_______________________req.BODY_______________________________________");
//                 console.log(req.body);

//     Upload.findOneAndUpdate({
//             'file.filename': req.params.uuid,
//             'file.originalname': req.params.filename
//         }, {
//             $set: {
//                 tags: {info: 'Troll'}
//             }
//         },
//         function (err, upload) {
//             if (err) next(err);
//             else {
//                 res.send(upload);
//             }
//         });
// });


router.post('/annotate/:uuid/:filename', upload.single(), function (req, res, next) {
    // var huso = JSON.parse(req.body);
    console.log(req.body);
    Upload.findOneAndUpdate({
            'file.filename': req.params.uuid,
            'file.originalname': req.params.filename
        }, {
            $set: {
                tags: {
                    imageAnnotation: {
                        src: req.body.src,
                        text: req.body.text,
                        shapes: req.body.shapes,
                        context: req.body.context
                    }
                }
            }
        },
        function (err, upload) {
            if (err) next(err);
            else {
                res.send(upload);
            }
        });
});


router.put('/annotate/:uuid/:filename', upload.single(), function (req, res, next) {
    // var huso = JSON.stringify(req.body);
    console.log(req.body);
    Upload.findOneAndUpdate({
            'file.filename': req.params.uuid,
            'file.originalname': req.params.filename
        }, {
            $set: {
                tags: {
                    imageAnnotation: {
                        src: req.body.src,
                        text: req.body.text,
                        shapes: req.body.shapes,
                        context: req.body.context
                    }
                }
            }
        },
        function (err, upload) {
            if (err) next(err);
            else {
                res.send(upload);
            }
        });
});

router.get('/annotate/:uuid/:filename', function (req, res, next) {
    console.log(req.params);
    Upload.find({
        'file.filename': req.params.uuid,
        'file.originalname': req.params.filename
    }, function (err, upload) {
        if (err) next(err);
        else {
            console.log(upload[0].tags.imageAnnotation);
            res.send(upload[0].tags.imageAnnotation);
        }
    });
});


router.put('/updateUploadData/:uuid/:filename', upload.single(), function (req, res, next) {
    console.log(req.body);
    Upload.findOneAndUpdate({
            'file.filename': req.params.uuid,
            'file.originalname': req.params.filename
        }, {
            $set: {
                sessionName: req.body.sessionName,
                sessionIdentifier: req.body.sessionIdentifier
            }
        },
        function (err, upload) {
            if (err) next(err);
            else {
                res.send(upload);
            }
        });
});





router.put('/formImageInfo/:uuid/:filename', upload.single(), function (req, res, next) {
    // console.log(sessionStorage);
    Upload.findOneAndUpdate({
            'file.filename': req.params.uuid,
            'file.originalname': req.params.filename
        }, {
            $set: {
                tags: {
                    imageInformation: req.body.tags.imageInformation
                }
            }
        },
        function (err, upload) {
            if (err) next(err);
            else {
                res.send(upload);
            }
        });
});


router.put('/formImageDes/:uuid/:filename', upload.single(), function (req, res, next) {
    // console.log(sessionStorage);
    Upload.findOneAndUpdate({
            'file.filename': req.params.uuid,
            'file.originalname': req.params.filename
        }, {
            $set: {
                tags: {
                    imageDescrp: req.body.tags.imageDescrp
                }
            }
        },
        function (err, upload) {
            if (err) next(err);
            else {
                res.send(upload);
            }
        });
});


router.put('/formImageDesLocation/:uuid/:filename', upload.single(), function (req, res, next) {
    // console.log(sessionStorage);
    Upload.findOneAndUpdate({
            'file.filename': req.params.uuid,
            'file.originalname': req.params.filename
        }, {
            $set: {
                tags: {
                    imageDescrp: {
                        revolutionLocation: req.body.tags.imageDescrp.revolutionLocation
                    }
                }
            }
        },
        function (err, upload) {
            if (err) next(err);
            else {
                res.send(upload);
            }
        });
});


router.put('/formPRelation/:uuid/:filename', upload.single(), function (req, res, next) {
    // console.log(sessionStorage);
    Upload.findOneAndUpdate({
            'file.filename': req.params.uuid,
            'file.originalname': req.params.filename
        }, {
            $set: {
                tags: {
                    personalRelation: req.body.tags.personalRelation
                }
            }
        },
        function (err, upload) {
            if (err) next(err);
            else {
                res.send(upload);
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
    Upload.find().distinct('sessionName', function (err, upload) {
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

router.get('/topics', function (req, res, next) {
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
    console.log(req.params.author);
    author = req.params.author;
    Upload.find({
        'sessionName': req.params.author
    }, function (err, upload) {
        console.log(upload)
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


// router.put('/:uuid/:filename', function(req, res) {
//     Upload.update({
//         'file.filename': req.params.uuid,
//         'file.originalname': req.params.filename
//     }, { $set: { tags: req.body.tags }},
//     function(err, upload) {
//         if (err) next(err);
//         else {
//           res.send(upload);
//         }
//     });
// });


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

// router.get('/update/:uuid/:filename', function (req, res, next) {
//     // console.log(req);
//     Upload.find({
//         'file.filename': req.params.uuid,
//         'file.originalname': req.params.filename
//     }, function (err, upload) {
//         if (err) next(err);
//         else {
//             res.send(upload);
//         }
//     });
// });



// router.get('/formImageInfo/:uuid/:filename', function (req, res, next) {
//     // console.log(req);
// // console.log(sessionStorage);
//     Upload.find({
//         'file.filename': req.params.uuid,
//         'file.originalname': req.params.filename
//     }, function (err, upload) {
//         if (err) next(err);
//         else {
//             res.send(upload);
//         }
//     });
// });


// router.get('/formImageDes/:uuid/:filename', function (req, res, next) {
//     // console.log(req);
// // console.log(sessionStorage);
//     Upload.find({
//         'file.filename': req.params.uuid,
//         'file.originalname': req.params.filename
//     }, function (err, upload) {
//         if (err) next(err);
//         else {
//             res.send(upload);
//         }
//     });
// });


module.exports = router;