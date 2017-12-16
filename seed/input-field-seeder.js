var InputField = require('../models/input-field');
var InputFieldCodes = require('../models/input-field-codes');

var mongoose = require('mongoose');

var connString = process.env.MONGODB_URI || 'localhost:27017/events';
mongoose.connect(connString);

var inputfields = [
    new InputField({
        fieldName: 'fullName',
        fieldLabel: 'Full Name',
        fieldType: 'Text'
    }),
    new InputField({
        fieldName: 'country',
        fieldLabel: 'Country',
        fieldType: 'List'
    }),
    new InputField({
        fieldName: 'badgeCategory',
        fieldLabel: 'Badge Category',
        fieldType: 'List'
    }),
];

InputField.remove({},function(err){
    var done=0;
    for(var i=0; i<inputfields.length; i++){
        inputfields[i].save(function(err, result){
            done++;
            if(done===inputfields.length){
                exit();
            }
        });
    }
})



function exit(){
    mongoose.disconnect();
}