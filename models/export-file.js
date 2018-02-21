var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExportFileSchema = new Schema({
    event: {type: Schema.Types.ObjectId, ref:'Event'},
    filename: {type: String, required: true},
    creationDate: {type:Date, required:true},
    rowCount: {type:Number, required:true}

});

module.exports = mongoose.model('ExportFile',ExportFileSchema);