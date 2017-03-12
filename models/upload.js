var mongoose = require('mongoose');

var UploadSchema = mongoose.Schema({
    name: String,
    tags: {
        ImageObjects: String,
        CreatorArtist: String,
        Question1: String,
        Question2: String
    },
    created: Date,
    file: Object
});

// UploadSchema.statics = {
//   load: function(id, cb){
//       this.findOne({_id: id}).exec(cb);
//   }
// }

module.exports = mongoose.model('Upload', UploadSchema);
