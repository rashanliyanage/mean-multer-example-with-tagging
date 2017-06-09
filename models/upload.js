var mongoose = require('mongoose');

var TagSchema = mongoose.Schema({
    ImageObjects: String,
    CreatorArtist: String,
    Question1: String,
    Question2: String,
    info: Array,
});

var UploadSchema = mongoose.Schema({
    name: String,
    tags: TagSchema,
    created: Date,
    file: Object
});



module.exports = mongoose.model('Upload', UploadSchema);
