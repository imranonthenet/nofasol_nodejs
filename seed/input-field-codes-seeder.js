var InputField = require('../models/input-field');
var InputFieldCodes = require('../models/input-field-codes');

var mongoose = require('mongoose');

var connString = process.env.MONGODB_URI || 'localhost:27017/events';
mongoose.connect(connString);

InputFieldCodes.remove({}, function(err){
    var done=0;
    
    InputField.find({fieldName:'country'},'_id', function(err,result){
        if(err)
            throw err;
    
        console.log('id=' + result[0]._id);
    
        var inputfieldcodes = [
            new InputFieldCodes({
                fieldId: result[0]._id,
                code: 'UAE',
                desc: 'United Arab Emirates'
            }),
            new InputFieldCodes({
                fieldId: result[0]._id,
                code: 'KSA',
                desc: 'Saudi Arabia'
            }),
            new InputFieldCodes({
                fieldId: result[0]._id,
                code: 'PAK',
                desc: 'Pakistan'
            }),
        ]
    
       
    
        for(var i=0; i<inputfieldcodes.length; i++){
            inputfieldcodes[i].save(function(err, result){
                done++;
                console.log(done);
                if(done===6){
                    exit();
                }
            });
        }
    })
    
    
    InputField.find({fieldName:'badgeCategory'},'_id', function(err,result){
        if(err)
            throw err;
    
        console.log('id=' + result[0]._id);
    
        var inputfieldcodes = [
            new InputFieldCodes({
                fieldId: result[0]._id,
                code: '01',
                desc: 'Visitor'
            }),
            new InputFieldCodes({
                fieldId: result[0]._id,
                code: '02',
                desc: 'VIP'
            }),
            new InputFieldCodes({
                fieldId: result[0]._id,
                code: '03',
                desc: 'Student'
            }),
        ]
    
     
    
        for(var i=0; i<inputfieldcodes.length; i++){
            inputfieldcodes[i].save(function(err, result){
                done++;
                console.log(done);
                if(done===6){
                    exit();
                }
            });
        }
    })
})




function exit(){
    console.log('disconnecting database')
    mongoose.disconnect();
}