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


// UploadSchema.statics = {
//   load: function(id, cb){
//       this.findOne({_id: id}).exec(cb);
//   }
// }


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
