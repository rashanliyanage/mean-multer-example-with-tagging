var mongoose = require('mongoose');

// var UploadSchema = mongoose.Schema({
//     name: String,
//     tags: {
//         ImageObjects: String,
//         CreatorArtist: String,
//         Question1: String,
//         Question2: String,
//         tags: String
//     },
//     created: Date,
//     file: Object
// });



var ImageInformationSchema = mongoose.Schema({
    artist: String,
    publishingYear: Date,
    publishingLocation: String,
    medium: String,
    form: String
});

var ImageDescrpSchema = mongoose.Schema({
    motives: Array,
    motivesRevolution: Array,
    revolutionLocation: Array
});

var personalRelationship = mongoose.Schema({
    source: String,
    placeFoundFirst: String,
    dateFoundFirst: Date,
    time: String,
    Relation: String
});

var TagSchema = mongoose.Schema({
    imageInformation: ImageInformationSchema,
    imagedescrp: ImageDescrpSchema,
    personalRelationship: PersonalRelationshipSchema
});

var UploadSchema = mongoose.Schema({
    sessionName: String,
    sessionDate: String,
    sessionIdentifier: String,
    tags: TagSchema,
    created: Date,
    file: Object,
    sessionRecording: String
});



module.exports = mongoose.model('Upload', UploadSchema);
