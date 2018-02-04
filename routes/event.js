var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var XLSX = require('xlsx');
var moment = require('moment');



var Event = require('../models/event');
var EventData = require('../models/event-data');
var BadgeCategory = require('../models/badge-category');
var Sequence = require('../models/sequence');


router.use(function(req,res,next){
    if(!req.isAuthenticated()){
        return res.redirect('/');
    }
    next();
})

router.get('/badge-categories/:id', function(req,res){
    var messages = [];
    var eventId = req.params.id;
    req.session.eventId = eventId;

    BadgeCategory.find({event:eventId}, function(err, badgecategories){
        res.render('event/badge-categories', {messages:messages, hasErrors:messages.length>0, badgecategories:badgecategories});
    });

});

router.post('/badge-categories', function(req,res){
    var messages = [];

    var eventId=req.session.eventId;

    BadgeCategory.find({event:eventId}).count().exec(function(err, c){
        console.log(`c=${c}`);

        if(c==0){
            messages.push('Please add atleast 1 badge category');

            BadgeCategory.find({event:eventId}, function(err, badgecategories){
                res.render('event/badge-categories', {messages:messages, hasErrors:messages.length>0, badgecategories:badgecategories});
                return;
            });
        }
        else {
            res.redirect('/event/badge-layout');
        }
    });


})

router.get('/badge-layout', function(req,res){
    var messages=[];
    //var scripts = [{ script: '/library/fabric.min.js' },{script:'/javascripts/badgelayout.js'}];
    var eventId=req.session.eventId;

    Event.findById(eventId, function (err, event) {
        var fields=[];
        var showBarcode=false;
        var barcodeTop = 10;
        var barcodeLeft = 10;
        var fieldIndex = 0;

        Object.keys(event.toJSON()).forEach(function(item){
            

            if(item.indexOf('_showInPrint')>-1 && event[item]==true ){
                fieldIndex = fieldIndex + 1;

                var fieldName = item.substring(0, item.indexOf('_showInPrint') ) ;
                var fieldLabel = item.substring(0, item.indexOf('_showInPrint') ) + '_label';
                var fieldType = item.substring(0, item.indexOf('_showInPrint') ) + '_fieldType';
                var fieldValue = '';//eventData[fieldName] == undefined ? '':eventData[fieldName];
                var fieldMandatory = item.substring(0, item.indexOf('_showInPrint') ) + '_isMandatory';
                var fieldTop = item.substring(0, item.indexOf('_showInPrint') ) + '_top';
            
                var fieldLeft = item.substring(0, item.indexOf('_showInPrint') ) + '_left';
                var fieldWidth = item.substring(0, item.indexOf('_showInPrint') ) + '_width';
                var fieldFontFamily = item.substring(0, item.indexOf('_showInPrint') ) + '_fontFamily';
                var fieldFontSize = item.substring(0, item.indexOf('_showInPrint') ) + '_fontSize';
                var fieldFontWeight = item.substring(0, item.indexOf('_showInPrint') ) + '_fontWeight';
                var fieldFontStyle = item.substring(0, item.indexOf('_showInPrint') ) + '_fontStyle';
                var fieldTextAlign = item.substring(0, item.indexOf('_showInPrint') ) + '_textAlign';


                //console.log(`fieldName=${fieldName}, fieldLabel=${fieldLabel}, fieldType=${fieldType}, fieldValue=${fieldValue}`)
                var field={};
                field['fieldName']=fieldName;
                field['fieldLabel']=event[fieldLabel];
                field['fieldType']=event[fieldType];
                field['fieldValue']=fieldValue;
                field['fieldMandatory']=event[fieldMandatory];

                if(event[fieldTop]==10){
                    var fieldTopValue = fieldIndex * 20;
                    event[fieldTop] = fieldTopValue.toString();
                }
                
                field['fieldTop']=event[fieldTop];
                field['fieldLeft']=event[fieldLeft];
                field['fieldWidth']=event[fieldWidth];
                field['fieldFontFamily']=event[fieldFontFamily];
                field['fieldFontSize']=event[fieldFontSize];
                field['fieldFontWeight']=event[fieldFontWeight];
                field['fieldFontStyle']=event[fieldFontStyle];
                field['fieldTextAlign']=event[fieldTextAlign];

                if(fieldName=='barcode'){
                    showBarcode=true;
                    barcodeLeft=event[fieldLeft];
                    barcodeTop=event[fieldTop];

                } else {
                    //console.log('field=' + JSON.stringify(field));
                    fields.unshift(field);
                }
            }
        });

        var eventIdForPrint='';
        var scripts=[];
        if(req.session.eventIdForPrint){
            scripts = [{ script: '/javascripts/printbadgelayout.js' }];
            eventIdForPrint = req.session.eventIdForPrint;
            delete req.session.eventIdForPrint;
        }
      

        res.render('event/badge-layout', {eventIdForPrint:eventIdForPrint, scripts:scripts, messages:messages, hasErrors:messages.length>0, fields:fields, 
            showBarcode:showBarcode, barcodeLeft:barcodeLeft, barcodeTop:barcodeTop});

        
    });

    
});



router.get('/print-badge-layout/:id', function(req,res){
    var messages=[];
    //var scripts = [{ script: '/library/fabric.min.js' },{script:'/javascripts/badgelayout.js'}];
    var eventId=req.params.id;

    Event.findById(eventId, function (err, event) {
        var fields=[];
        var showBarcode=false;
        var barcodeTop = 10;
        var barcodeLeft = 10;
        var fieldIndex = 0;

        Object.keys(event.toJSON()).forEach(function(item){
            

            if(item.indexOf('_showInPrint')>-1 && event[item]==true ){
                fieldIndex = fieldIndex + 1;

                var fieldName = item.substring(0, item.indexOf('_showInPrint') ) ;
                var fieldLabel = item.substring(0, item.indexOf('_showInPrint') ) + '_label';
                var fieldType = item.substring(0, item.indexOf('_showInPrint') ) + '_fieldType';
                var fieldValue = '';//eventData[fieldName] == undefined ? '':eventData[fieldName];
                var fieldMandatory = item.substring(0, item.indexOf('_showInPrint') ) + '_isMandatory';
                var fieldTop = item.substring(0, item.indexOf('_showInPrint') ) + '_top';
            
                var fieldLeft = item.substring(0, item.indexOf('_showInPrint') ) + '_left';
                var fieldWidth = item.substring(0, item.indexOf('_showInPrint') ) + '_width';
                var fieldFontFamily = item.substring(0, item.indexOf('_showInPrint') ) + '_fontFamily';
                var fieldFontSize = item.substring(0, item.indexOf('_showInPrint') ) + '_fontSize';
                var fieldFontWeight = item.substring(0, item.indexOf('_showInPrint') ) + '_fontWeight';
                var fieldFontStyle = item.substring(0, item.indexOf('_showInPrint') ) + '_fontStyle';
                var fieldTextAlign = item.substring(0, item.indexOf('_showInPrint') ) + '_textAlign';


                //console.log(`fieldName=${fieldName}, fieldLabel=${fieldLabel}, fieldType=${fieldType}, fieldValue=${fieldValue}`)
                var field={};
                field['fieldName']=fieldName;
                field['fieldLabel']=event[fieldLabel];
                field['fieldType']=event[fieldType];
                field['fieldValue']=fieldValue;
                field['fieldMandatory']=event[fieldMandatory];

                if(event[fieldTop]==10){
                    var fieldTopValue = fieldIndex * 20;
                    event[fieldTop] = fieldTopValue.toString();
                }
                
                field['fieldTop']=event[fieldTop];
                field['fieldLeft']=event[fieldLeft];
                field['fieldWidth']=event[fieldWidth];
                field['fieldFontFamily']=event[fieldFontFamily];
                field['fieldFontSize']=event[fieldFontSize];
                field['fieldFontWeight']=event[fieldFontWeight];
                field['fieldFontStyle']=event[fieldFontStyle];
                field['fieldTextAlign']=event[fieldTextAlign];

                if(fieldName=='barcode'){
                    showBarcode=true;
                    barcodeLeft=event[fieldLeft];
                    barcodeTop=event[fieldTop];

                } else {
                    //console.log('field=' + JSON.stringify(field));
                    fields.unshift(field);
                }
            }
        });


        res.render('event/print-badge-layout', {layout:'print-layout', messages:messages, hasErrors:messages.length>0, fields:fields, 
            showBarcode:showBarcode, barcodeLeft:barcodeLeft, barcodeTop:barcodeTop});

        
    });

    
});

router.post('/badge-layout', function(req,res){
    var messages = [];
    var eventId=req.session.eventId;

    console.log(`top=${req.body.fullName_top},left=${req.body.fullName_left},width=${req.body.fullName_width}`);


    Event.findById(eventId, function(err,event){
        if(err) throw err;

        Object.keys(event.toJSON()).forEach(function(item){
            

            if(item.indexOf('_showInPrint')>-1 && event[item]==true ){
                var fieldName = item.substring(0, item.indexOf('_showInPrint') ) ;

                event[fieldName + '_top']=req.body[fieldName + '_top'];
                event[fieldName + '_left']=req.body[fieldName + '_left'];

                if(fieldName!='barcode'){
                    event[fieldName + '_width']=req.body[fieldName + '_width'];
                    event[fieldName + '_fontFamily']=req.body[fieldName + '_fontFamily'];
                    event[fieldName + '_fontSize']=req.body[fieldName + '_fontSize'];
                    event[fieldName + '_fontWeight']=req.body[fieldName + '_fontWeight'];
                    event[fieldName + '_fontStyle']=req.body[fieldName + '_fontStyle'];
                    event[fieldName + '_textAlign']=req.body[fieldName + '_textAlign'];
                }
                
            }
        });


        event.setupComplete = true;
        event.save(function(err, result){
            
            if(req.body.action == 'testprint'){
                req.session.eventIdForPrint = eventId;
                res.redirect('/event/badge-layout');
            }
            else if(req.body.action=='finish'){
                res.redirect('/event');
            }
        });
    });
});


router.get('/badge-category-create', function(req,res){
    var messages=[];

    res.render('event/badge-category-create', {messages:messages, hasErrors:messages.length>0});
});

router.post('/badge-category-create', function(req,res){
    var badgeCategory = new BadgeCategory();
    badgeCategory.event=req.session.eventId;
    badgeCategory.desc=req.body.badgeCategory;
    badgeCategory.code=req.body.badgeCategory;

    badgeCategory.save(function(err, result){
        if(err) throw err;

        res.redirect('/event/badge-categories/' + req.session.eventId);
    })
})

router.get('/badge-category-delete/:id', function(req,res){
    var messages=[];

    var badgeCategoryId = req.params.id;

    BadgeCategory.findById(badgeCategoryId, function(err, badgeCategory){
        res.render('event/badge-category-delete', {messages:messages, hasErrors:messages.length>0, badgeCategory:badgeCategory} );
    });

    
});

router.post('/badge-category-delete', function(req,res){
    
        var badgeCategoryId = req.body.badgeCategoryId;
    
        BadgeCategory.findByIdAndRemove(badgeCategoryId, function(err, result){
            if(err) throw err;

            console.log(`deleted category ${result.desc}`);
            
            res.redirect('/event/badge-categories/' + req.session.eventId);
        })

    
    })


router.get('/badge-category-edit/:id', function(req,res){
    var messages=[];

    var badgeCategoryId = req.params.id;

    BadgeCategory.findById(badgeCategoryId, function(err, badgeCategory){
        res.render('event/badge-category-edit', {messages:messages, hasErrors:messages.length>0, badgeCategory:badgeCategory} );
    });

    
});

router.post('/badge-category-edit', function(req,res){

    var badgeCategoryId = req.body.badgeCategoryId;

    BadgeCategory.findById(badgeCategoryId, function(err, badgeCategory){
        badgeCategory.desc=req.body.badgeCategory;
        badgeCategory.code=req.body.badgeCategory;

        badgeCategory.save(function(err, result){
            if(err) throw err;
    
            res.redirect('/event/badge-categories/' + req.session.eventId);
        })
    });



})

router.get('/import/:id', function(req,res){
    var scripts = [{ script: '/javascripts/upload.js' }];
    var messages = [];
    var eventId = req.params.id;
    req.session.eventId = eventId;

    Event.findById(eventId, function(err, event){
        res.render('event/import', { scripts: scripts, messages: messages, hasErrors: messages.length > 0, event: event });
    })

    

})

router.post('/import', function(req,res){
    var filename='';

      // create an incoming form object
      var form = new formidable.IncomingForm();
    
      // specify that we want to allow the user to upload multiple files in a single request
      form.multiples = true;
    
      // store all uploads in the /uploads directory
      form.uploadDir = path.join(__dirname, '../uploads');
    
      // every time a file has been uploaded successfully,
      // rename it to it's orignal name
      form.on('file', function(field, file) {
          console.log('form.on.file');
          filename = path.join(form.uploadDir, file.name);

        fs.rename(file.path, filename);
        
      });
    
      // log any errors that occur
      form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
      });
    
      // once all the files have been uploaded, send a response to the client
      form.on('end', function() {

        //read excel sheet and convert all rows into array of JSON objects
        console.log('reading filename ' + filename);

            var workbook = XLSX.readFile(filename);
            var sheet_name_list = workbook.SheetNames;

            var first_sheet_name = workbook.SheetNames[0];
            var sheet = workbook.Sheets[first_sheet_name];
            var dataArray = sheet2arr(sheet);
            console.log(dataArray);
            console.log('req.session.eventId=' + req.session.eventId);

            var done=0;
            var eventId = req.session.eventId;
            Event.findById(eventId, function(err,event){

                dataArray.forEach(function(data){
                    var eventData = new EventData();
                    eventData.event = req.session.eventId;
        
                    eventData.uniqueId = data[event.uniqueId_columnInExcel];
                    eventData.barcode = data[event.barcode_columnInExcel];
                    eventData.sno = data[event.sno_columnInExcel];
                    eventData.title = data[event.title_columnInExcel];
                    eventData.firstName = data[event.firstName_columnInExcel];
                    eventData.middleName = data[event.middleName_columnInExcel];
                    eventData.lastName = data[event.lastName_columnInExcel];
                    eventData.fullName = data[event.fullName_columnInExcel];
                    eventData.jobTitle = data[event.jobTitle_columnInExcel];
                    eventData.department = data[event.department_columnInExcel];
                    eventData.companyName = data[event.companyName_columnInExcel];
                    eventData.mobile1 = data[event.mobile1_columnInExcel];
                    eventData.mobile2 = data[event.mobile2_columnInExcel];
                    eventData.tel1 = data[event.tel1_columnInExcel];
                    eventData.tel2 = data[event.tel2_columnInExcel];
                    eventData.fax = data[event.fax_columnInExcel];
                    eventData.email = data[event.email_columnInExcel];
                    eventData.website = data[event.website_columnInExcel];
                    eventData.address1 = data[event.address1_columnInExcel];
                    eventData.address2 = data[event.address2_columnInExcel];
                    eventData.city = data[event.city_columnInExcel];
                    eventData.country = data[event.country_columnInExcel];
                    eventData.poBox = data[event.poBox_columnInExcel];
                    eventData.postalCode = data[event.postalCode_columnInExcel];
                    eventData.badgeCategory = data[event.badgeCategory_columnInExcel];
                    eventData.regType = data[event.regType_columnInExcel];
                    eventData.regDate = data[event.regDate_columnInExcel];
                    eventData.badgePrintDate = data[event.badgePrintDate_columnInExcel];
                    eventData.modifiedDate = data[event.modifiedDate_columnInExcel];
                    eventData.statusFlag = data[event.statusFlag_columnInExcel];
                    eventData.backoffice = data[event.backoffice_columnInExcel];
                    eventData.comment1 = data[event.comment1_columnInExcel];
                    eventData.comment2 = data[event.comment2_columnInExcel];
                    eventData.comment3 = data[event.comment3_columnInExcel];
                    eventData.comment4 = data[event.comment4_columnInExcel];
                    eventData.comment5 = data[event.comment5_columnInExcel];
                    eventData.comment6 = data[event.comment6_columnInExcel];
                    eventData.comment7 = data[event.comment7_columnInExcel];
                    eventData.comment8 = data[event.comment8_columnInExcel];
                    eventData.comment9 = data[event.comment9_columnInExcel];
                    eventData.comment10 = data[event.comment10_columnInExcel];
        
                    eventData.save(function(err, result){
                        if(err)
                            throw err;
                            done++;
                            if(done==dataArray.length){
                                console.log('done');
                                res.setHeader('Content-Type', 'application/json');
                                res.send(JSON.stringify({ result:'success' }));
                            }
                            
                    })
                })
            });//Event.findById

           
            


        
      });
    
      // parse the incoming request containing the form data
      form.parse(req);
    
    });

    var insertData = function(filename, req, res){
        
        //read excel sheet and convert all rows into array of JSON objects
        console.log('reading filename ' + filename);
    
        var workbook = XLSX.readFile(filename);
        var sheet_name_list = workbook.SheetNames;
    
        var first_sheet_name = workbook.SheetNames[0];
        var sheet = workbook.Sheets[first_sheet_name];
        var data = sheet2arr(sheet);
        console.log(data);
    
        var eventData = new EventData();
        eventData.event = req.session.eventId;

        eventData.uniqueId = data.uniqueId;
        eventData.barcode = data.barcode;
        eventData.sno = data.sno;
        eventData.title = data.title;
        eventData.firstName = data.firstName;
        eventData.middleName = data.middleName;
        eventData.lastName = data.lastName;
        eventData.fullName = data.fullName;
        eventData.jobTitle = data.jobTitle;
        eventData.department = data.department;
        eventData.companyName = data.companyName;
        eventData.mobile1 = data.mobile1;
        eventData.mobile2 = data.mobile2;
        eventData.tel1 = data.tel1;
        eventData.tel2 = data.tel2;
        eventData.fax = data.fax;
        eventData.email = data.email;
        eventData.website = data.website;
        eventData.address1 = data.address1;
        eventData.address2 = data.address2;
        eventData.city = data.city;
        eventData.country = data.country;
        eventData.poBox = data.poBox;
        eventData.postalCode = data.postalCode;
        eventData.badgeCategory = data.badgeCategory;
        eventData.regType = data.regType;
        eventData.regDate = data.regDate;
        eventData.badgePrintDate = data.badgePrintDate;
        eventData.modifiedDate = data.modifiedDate;
        eventData.statusFlag = data.statusFlag;
        eventData.backoffice = data.backoffice;
        eventData.comment1 = data.comment1;
        eventData.comment2 = data.comment2;
        eventData.comment3 = data.comment3;
        eventData.comment4 = data.comment4;
        eventData.comment5 = data.comment5;
        eventData.comment6 = data.comment6;
        eventData.comment7 = data.comment7;
        eventData.comment8 = data.comment8;
        eventData.comment9 = data.comment9;
        eventData.comment10 = data.comment10;

        eventData.save(function(err, result){
            if(err)
                throw err;

            res.redirect('/');
        })
        //insert into mongodb database
        /*
        mongodb.connect(config.mongo_url, function(err, db){
            var collection = db.collection('visitors');
            collection.insertMany(data, function(err, results){
                if(err) throw err;
                console.log('Number of documents inserted: ' + results.insertedCount);
                db.close();
            });
    
        });
        */
    }

    var sheet2arr = function(sheet){
        var headers = ['A','B','C','D','E','F','G','H','I',
            'J','K','L','M','N','O','P','Q','R','S','T',
            'U','V','W','X','Y','Z','AA','AB','AC',
            'AD','AE','AF','AG','AH','AI','AJ','AK','AL',
            'AM','AN','AO'
        ];
    
    
        var result = [];
       
        var rowNum;
        var colNum;
        var range = XLSX.utils.decode_range(sheet['!ref']);
        for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
           
           result[rowNum]={};
    
            for(colNum=range.s.c; colNum<=range.e.c; colNum++){
               var nextCell = sheet[
                  XLSX.utils.encode_cell({r: rowNum, c: colNum})
               ];
    
                //skip first row which contains header
                if(rowNum>0 && colNum < 41){
                    if( typeof nextCell === 'undefined' ){
                        result[rowNum][headers[colNum]] = '';
                    } else {
                        result[rowNum][headers[colNum]] = nextCell.v;
                    }
                }
            }
         
        }
        result.shift();//remove first item from array which is empty row
        return result;
     };






//express validation
/*
req.checkBody('fullName','Full Name should be alphanumeric').isAlpha();
req.checkBody('fullName','Full Name is required').notEmpty()
 
var errors = req.validationErrors();

if(errors){
    
    errors.forEach(function(error){
        messages.push(error.msg);
    });
    return res.render('event/register', {messages:messages, hasErrors: messages.length>0, eventData:eventData, countries: countries, badgeCategories:badgeCategories });
    
}
*/

//model validation
/*
var error = eventData.validateSync();
 
if(error && error.errors){
    for(field in error.errors){
        messages.push(error.errors[field].message);
    }

    return res.render('event/register', {messages:messages, hasErrors: messages.length>0, eventData:eventData, countries: countries, badgeCategories:badgeCategories });

}
*/
//end model validation

router.get('/register', function (req, res) {

    var messages = [];
    var eventId = req.session.eventId;


    Event.findById(eventId, function (err, event) {
        var fields=[];

        Object.keys(event.toJSON()).forEach(function(item){
            

            if(item.indexOf('_showInRegister')>-1 && event[item]==true ){
                var fieldName = item.substring(0, item.indexOf('_showInRegister') ) ;
                var fieldLabel = item.substring(0, item.indexOf('_showInRegister') ) + '_label';
                var fieldType = item.substring(0, item.indexOf('_showInRegister') ) + '_fieldType';
                var fieldValue = '';//eventData[fieldName] == undefined ? '':eventData[fieldName];
                var fieldMandatory = item.substring(0, item.indexOf('_showInRegister') ) + '_isMandatory';

                //console.log(`fieldName=${fieldName}, fieldLabel=${fieldLabel}, fieldType=${fieldType}, fieldValue=${fieldValue}`)
                var field={};
                field['fieldName']=fieldName;
                field['fieldLabel']=event[fieldLabel];
                field['fieldType']=event[fieldType];
                field['fieldValue']=fieldValue;
                field['fieldMandatory']=event[fieldMandatory];

                //console.log('field=' + JSON.stringify(field));
                fields.unshift(field);
            }
        });

        var fieldChunks=[];
        var chunkSize = 2;
        for(var i=0; i<fields.length; i+=chunkSize){
            fieldChunks.push(fields.slice(i,i+chunkSize));
        }
       
        BadgeCategory.find({event:eventId}, function(err, badgeCategories){

            //console.log('badgecategories = ' + badgeCategories);
            res.render('event/register', { messages: messages, hasErrors: messages.length > 0, fields:fieldChunks, badgeCategories:badgeCategories });
        });

        
    });



});

router.get('/print-badge/:id', function(req,res){
    var messages = [];
    var eventId = req.session.eventId;
    var eventDataId = req.params.id;

    //var scripts = [{script:'/javascripts/badgeprint.js'}];
    Event.findById(eventId, function(err,event){

        var fields=[];
        var showBarcode=false;
        var barcodeTop = 10;
        var barcodeLeft = 10;
       
        EventData.findById(eventDataId, function(err,result){
            if(err) throw err;
    
            Object.keys(event.toJSON()).forEach(function(item){
            

                if(item.indexOf('_showInPrint')>-1 && event[item]==true ){
                    var fieldName = item.substring(0, item.indexOf('_showInPrint') ) ;
                    var fieldLabel = item.substring(0, item.indexOf('_showInPrint') ) + '_label';
                    var fieldType = item.substring(0, item.indexOf('_showInPrint') ) + '_fieldType';
                    var fieldValue = result[fieldName] == undefined ? '':result[fieldName];
                    var fieldMandatory = item.substring(0, item.indexOf('_showInPrint') ) + '_isMandatory';
                    var fieldTop = item.substring(0, item.indexOf('_showInPrint') ) + '_top';
                    var fieldLeft = item.substring(0, item.indexOf('_showInPrint') ) + '_left';
                    var fieldWidth = item.substring(0, item.indexOf('_showInPrint') ) + '_width';
                    var fieldFontFamily = item.substring(0, item.indexOf('_showInPrint') ) + '_fontFamily';
                    var fieldFontSize = item.substring(0, item.indexOf('_showInPrint') ) + '_fontSize';
                    var fieldFontWeight = item.substring(0, item.indexOf('_showInPrint') ) + '_fontWeight';
                    var fieldFontStyle = item.substring(0, item.indexOf('_showInPrint') ) + '_fontStyle';
                    var fieldTextAlign = item.substring(0, item.indexOf('_showInPrint') ) + '_textAlign';

    
                    //console.log(`fieldName=${fieldName}, fieldLabel=${fieldLabel}, fieldType=${fieldType}, fieldValue=${fieldValue}`)
                    var field={};
                    field['fieldName']=fieldName;
                    field['fieldLabel']=event[fieldLabel];
                    field['fieldType']=event[fieldType];
                    field['fieldValue']=fieldValue;
                    field['fieldMandatory']=event[fieldMandatory];
                    field['fieldTop']=event[fieldTop];
                    field['fieldLeft']=event[fieldLeft];
                    field['fieldWidth']=event[fieldWidth];
                    field['fieldFontFamily']=event[fieldFontFamily];
                    field['fieldFontSize']=event[fieldFontSize];
                    field['fieldFontWeight']=event[fieldFontWeight];
                    field['fieldFontStyle']=event[fieldFontStyle];
                    field['fieldTextAlign']=event[fieldTextAlign];
    
                    if(fieldName=='barcode'){
                        showBarcode=true;
                        barcodeLeft=event[fieldLeft];
                        barcodeTop=event[fieldTop];
    
                    } else {
                        //console.log('field=' + JSON.stringify(field));
                        fields.unshift(field);
                    }
                }
            });


            if(result.barcode==''){
                Sequence.findOneAndUpdate({name:'barcode'}, {$inc:{value:1}}, {new:true}, function(err, seq){
                    if(!seq){
                        seq = new Sequence ({name:'barcode', value:'19299259221626'});
                    }
    
                    var query = {_id:eventDataId};
                    var currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    var update = {badgePrintDate:currentDate, statusFlag:'Attended', barcode:seq.value};
                    var options = {new:true};
                
                    EventData.findOneAndUpdate(query, update, options, function(err, eventData){
                        if(err) throw err;
                        
                        res.render('event/print-badge', {layout:'print-layout', messages: messages, hasErrors: messages.length > 0,  
                            fields:fields, showBarcode:showBarcode, barcodeLeft:barcodeLeft, barcodeTop:barcodeTop, barcode:eventData.barcode});
                    });
                });
            }
            else {
                var query = {_id:eventDataId};
                var currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
                var update = {badgePrintDate:currentDate, statusFlag:'Attended'};
                var options = {new:true};
            
                EventData.findOneAndUpdate(query, update, options, function(err, eventData){
                    if(err) throw err;
                    
                    res.render('event/print-badge', {layout:'print-layout', messages: messages, hasErrors: messages.length > 0,  
                        fields:fields, showBarcode:showBarcode, barcodeLeft:barcodeLeft, barcodeTop:barcodeTop, barcode:eventData.barcode});
                });
            }
        });
    });







  
});

router.get('/edit-registration/:id', function (req, res) {
    
        var messages = [];
        var eventId = req.session.eventId;
        var eventDataId = req.params.id;
    

    
        EventData.findById(eventDataId, function(err, eventData){
            if(err) throw err;

            Event.findById(eventId, function (err, event) {
                var fields=[];
        
                Object.keys(event.toJSON()).forEach(function(item){
                    
        
                    if(item.indexOf('_showInRegister')>-1 && event[item]==true ){
                        var fieldName = item.substring(0, item.indexOf('_showInRegister') ) ;
                        var fieldLabel = item.substring(0, item.indexOf('_showInRegister') ) + '_label';
                        var fieldType = item.substring(0, item.indexOf('_showInRegister') ) + '_fieldType';
                        var fieldValue = eventData[fieldName] == undefined ? '':eventData[fieldName];
                        var fieldMandatory = item.substring(0, item.indexOf('_showInRegister') ) + '_isMandatory';
        
                        //console.log(`fieldName=${fieldName}, fieldLabel=${fieldLabel}, fieldType=${fieldType}, fieldValue=${fieldValue}`)
                        var field={};
                        field['fieldName']=fieldName;
                        field['fieldLabel']=event[fieldLabel];
                        field['fieldType']=event[fieldType];
                        field['fieldValue']=fieldValue;
                        field['fieldMandatory']=event[fieldMandatory];
        
                        //console.log('field=' + JSON.stringify(field));
                        fields.unshift(field);
                    }
                })

                var fieldChunks=[];
                var chunkSize = 2;
                for(var i=0; i<fields.length; i+=chunkSize){
                    fieldChunks.push(fields.slice(i,i+chunkSize));
                }
               
                BadgeCategory.find({event:eventId}, function(err, badgeCategories){
                    
              
                    res.render('event/edit-registration', { messages: messages, hasErrors: messages.length > 0, fields:fieldChunks, badgeCategories:badgeCategories, eventDataId:eventDataId });
                });

        
                
            });
        })

    });

router.post('/register', function (req, res) {
    var messages = [];
    var eventId = req.session.eventId;

    var eventData = new EventData();
    eventData.event = eventId;

    Event.findById(eventId, function (err, event) {
        Object.keys(event.toJSON()).forEach(function(item){
            if(item.indexOf('_showInRegister')>-1 && event[item]==true ){
                var fieldName = item.substring(0, item.indexOf('_showInRegister') ) ;
                var fieldLabel = item.substring(0, item.indexOf('_showInRegister') ) + '_label';
                var fieldType = item.substring(0, item.indexOf('_showInRegister') ) + '_fieldType';
                var fieldValue = eventData[fieldName] == undefined ? '':eventData[fieldName];

                eventData[fieldName]=req.body[fieldName];


            }
        })
       
        eventData.regDate=moment().format('YYYY-MM-DD HH:mm:ss');
        eventData.regType='Onsite';

        if(req.body.save){
            eventData.statusFlag='Did Not Attend';
        }
        else if(req.body.printAndSave){ 
            eventData.badgePrintDate = moment().format('YYYY-MM-DD HH:mm:ss');
            eventData.statusFlag = 'Attended';
        }

        eventData.save(function(err, result){
            if(err) throw err;

            if(req.body.save){
                res.redirect('/event/registration/' + eventId);
            }
            else if(req.body.printAndSave){    
                req.session.eventDataIdForPrint = result._id;

                res.redirect('/event/registration/' + eventId);
            }
        });

    });

    /*
    Event.findById(eventId, function(err, event){
        var eventData = new EventData();
        eventData.event = eventId;
        eventData.fullName = req.body.fullName;
        eventData.country = req.body.country;
        eventData.badgeCategory = req.body.badgeCategory;
    
        //express validation
        req.checkBody('fullName', 'Full Name should be alphanumeric').isAlpha();
        req.checkBody('fullName', 'Full Name is required').notEmpty()
    
        var errors = req.validationErrors();
    
        if (errors) {
    
            errors.forEach(function (error) {
                messages.push(error.msg);
            });
            return res.render('event/register', { messages: messages, hasErrors: messages.length > 0, eventData: eventData, event:event });
    
        }
    
        eventData.save(function (err, result) {
            res.redirect('/event/registration/' + eventId);
        })
    })
    */



});



router.post('/edit-registration', function (req, res) {
    var messages = [];
    var eventId = req.session.eventId;
    var eventDataId = req.body.eventDataId;


    EventData.findById(eventDataId, function(err, eventData){
        Event.findById(eventId, function (err, event) {
            Object.keys(event.toJSON()).forEach(function(item){
                if(item.indexOf('_showInRegister')>-1 && event[item]==true ){
                    var fieldName = item.substring(0, item.indexOf('_showInRegister') ) ;
                    var fieldLabel = item.substring(0, item.indexOf('_showInRegister') ) + '_label';
                    var fieldType = item.substring(0, item.indexOf('_showInRegister') ) + '_fieldType';
                    var fieldValue = eventData[fieldName] == undefined ? '':eventData[fieldName];
    
                    eventData[fieldName]=req.body[fieldName];
    
    
                }
            });

            eventData.modifiedDate=moment().format('YYYY-MM-DD HH:mm:ss');
           
            if(req.body.printAndSave){ 
                eventData.badgePrintDate = moment().format('YYYY-MM-DD HH:mm:ss');
                eventData.statusFlag = 'Attended';
            }
           
            eventData.save(function(err, result){
                if(err) throw err;
    
                if(req.body.save){
                    res.redirect('/event/registration/' + eventId);
                }
                else if(req.body.printAndSave){    
                    req.session.eventDataIdForPrint = result._id;
    
                    res.redirect('/event/registration/' + eventId);
                }


            });
    
        });
    });






});

router.get('/download/:id', function(req,res){
    var messages = [];
    
        var eventId = req.params.id;
        req.session.eventId = eventId;

    
        EventData.find({event:eventId}, function(err, eventData){
            if(err) throw err;
    
            var rows=[];
            eventData.forEach(function(eventData){
    
                var row={};
                var keys = Object.keys(eventData.toJSON());
                for(var i=keys.length-1; i>0; i--){
                    if(keys[i]!='__v' && keys[i]!='_id' && keys[i]!='event')
                    row[keys[i]]=eventData[keys[i]];
                }

                rows.push(row);
                
            });
            
            
            res.xls('data.xlsx', rows);
           
        });
});

router.get('/upload/:id', function (req, res) {
    
    var messages = [];

    var eventId = req.params.id;
    req.session.eventId = eventId;

    res.render('event/upload', { messages: messages, hasErrors: messages.length > 0});
    

    
})

router.post('/upload', function (req, res) {
    
        var messages = [];
    
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if(files.filetoupload.name==''){
                messages.push('Please select the file to import');
                res.render('event/upload', { messages: messages, hasErrors: messages.length > 0});
                return;
            }


            var oldpath = files.filetoupload.path;
            var newpath = path.join(__dirname, '../uploads/') + files.filetoupload.name;


            // Read the file
            //fs.rename(oldpath, newpath, function (err) { //doesn't work on Heroku

            fs.readFile(oldpath, function (err, data) {
                if (err) throw err;
                console.log('File read!');

                // Write the file
                fs.writeFile(newpath, data, function (err) {
                    if (err) throw err;
                    var workbook = XLSX.readFile(newpath);
                    var sheet_name_list = workbook.SheetNames;
                
                    var first_sheet_name = workbook.SheetNames[0];
                    var sheet = workbook.Sheets[first_sheet_name];
                    var dataArray = sheet2arr(sheet);
                    console.log(dataArray);
                    console.log('req.session.eventId=' + req.session.eventId);
        
                    var done=0;
                    var eventId = req.session.eventId;
                    Event.findById(eventId, function(err,event){
        
                        dataArray.forEach(function(data){
                            var eventData = new EventData();
                            eventData.event = req.session.eventId;
                
                            eventData.uniqueId = data[event.uniqueId_columnInExcel];
                            eventData.barcode = data[event.barcode_columnInExcel];
                            eventData.sno = data[event.sno_columnInExcel];
                            eventData.title = data[event.title_columnInExcel];
                            eventData.firstName = data[event.firstName_columnInExcel];
                            eventData.middleName = data[event.middleName_columnInExcel];
                            eventData.lastName = data[event.lastName_columnInExcel];
                            eventData.fullName = data[event.fullName_columnInExcel];
                            eventData.jobTitle = data[event.jobTitle_columnInExcel];
                            eventData.department = data[event.department_columnInExcel];
                            eventData.companyName = data[event.companyName_columnInExcel];
                            eventData.mobile1 = data[event.mobile1_columnInExcel];
                            eventData.mobile2 = data[event.mobile2_columnInExcel];
                            eventData.tel1 = data[event.tel1_columnInExcel];
                            eventData.tel2 = data[event.tel2_columnInExcel];
                            eventData.fax = data[event.fax_columnInExcel];
                            eventData.email = data[event.email_columnInExcel];
                            eventData.website = data[event.website_columnInExcel];
                             eventData.address1 = data[event.address1_columnInExcel];
                            eventData.address2 = data[event.address2_columnInExcel];
                            eventData.city = data[event.city_columnInExcel];
                            eventData.country = data[event.country_columnInExcel];
                            eventData.poBox = data[event.poBox_columnInExcel];
                            eventData.postalCode = data[event.postalCode_columnInExcel];
                            eventData.badgeCategory = data[event.badgeCategory_columnInExcel];
                            eventData.regType = 'Online';//data[event.regType_columnInExcel];
                            eventData.regDate = moment().format('YYYY-MM-DD HH:mm:ss');//data[event.regDate_columnInExcel];
                            eventData.badgePrintDate = data[event.badgePrintDate_columnInExcel];
                            eventData.modifiedDate = data[event.modifiedDate_columnInExcel];
                            eventData.statusFlag = 'Did Not Attend';//data[event.statusFlag_columnInExcel];
                            eventData.backoffice = data[event.backoffice_columnInExcel];
                            eventData.comment1 = data[event.comment1_columnInExcel];
                            eventData.comment2 = data[event.comment2_columnInExcel];
                            eventData.comment3 = data[event.comment3_columnInExcel];
                            eventData.comment4 = data[event.comment4_columnInExcel];
                            eventData.comment5 = data[event.comment5_columnInExcel];
                            eventData.comment6 = data[event.comment6_columnInExcel];
                            eventData.comment7 = data[event.comment7_columnInExcel];
                            eventData.comment8 = data[event.comment8_columnInExcel];
                            eventData.comment9 = data[event.comment9_columnInExcel];
                            eventData.comment10 = data[event.comment10_columnInExcel];
                
                            eventData.save(function(err, result){
                                if(err)
                                    throw err;
                                    done++;
                                    if(done==dataArray.length){
                                        console.log('done');
                                        res.redirect('/event');
                                    }
                                    
                            })
                        })
                    });//Event.findById
                    console.log('File written!');
                });

                // Delete the file
                fs.unlink(oldpath, function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                });
            });

        });//form.parse
    
    
    
    
    
    
    
    });




router.get('/edit/:id', function (req, res) {
    var scripts = [{ script: '/javascripts/datepicker.js' }];
    var messages = [];
    var eventId = req.params.id;

    Event.findById(eventId, function(err, event){
        res.render('event/edit', { scripts: scripts, messages: messages, hasErrors: messages.length > 0, event: event });
    })

    
});




router.post('/edit', function (req, res) {
    
        var messages = [];
    
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var eventId = fields.eventId;

            Event.findById(eventId, function(err, event){
                event.eventName = fields.eventName;
                
                if(files.filetoupload.name!=""){
                    event.eventLogo = files.filetoupload.name.replace(' ','_');
                }
                
                event.fromDate = moment(fields.fromDate,'DD/MM/YYYY').toISOString();
                event.toDate = moment(fields.toDate,'DD/MM/YYYY').toISOString();

                event.save(function(err, result){
                    if(files.filetoupload.name!=""){
                        var oldpath = files.filetoupload.path;
                        var newpath = path.join(__dirname, '../public/images/') + files.filetoupload.name.replace(' ','_');


                        // Read the file
                        fs.readFile(oldpath, function (err, data) {
                            if (err) throw err;
                            console.log('File read!');

                            // Write the file
                            fs.writeFile(newpath, data, function (err) {
                                if (err) throw err;
                                res.redirect('/event/event-fields/' + eventId);
                                console.log('File written!');
                            });

                            // Delete the file
                            fs.unlink(oldpath, function (err) {
                                if (err) throw err;
                                console.log('File deleted!');
                            });
                        });


                    }
                    else {
                        res.redirect('/event/event-fields/' + eventId);
                    }//files.filetoupload.name!=""
                })
            })


        });//form.parse
    });

router.get('/delete/:id', function (req, res) {
    
        var messages = [];
        var eventId = req.params.id;
    
        Event.findById(eventId, function(err, event){
            res.render('event/delete', { messages: messages, hasErrors: messages.length > 0, event: event });
        })
    
        
    });

router.get('/delete-data/:id', function(req,res){
    var eventId = req.params.id;

    EventData.remove({event:eventId}, function(err, eventData){
        if(err) throw err;

        res.redirect('/event');
    });
});

router.get('/delete-event/:id', function(req,res){
    var eventId = req.params.id;

    EventData.remove({event:eventId}, function(err, eventData){
        if(err) throw err;
        Event.remove({_id:eventId}, function(err, event){
            if(err) throw err;
            
            res.redirect('/event');
        });

        
    });
});

router.get('/create', function (req, res) {
    var scripts = [{ script: '/javascripts/datepicker.js' }];
    var messages = [];
    var event = new Event();


    res.render('event/create', { scripts: scripts, messages: messages, hasErrors: messages.length > 0, event: event });
});

router.post('/create', function (req, res) {

    var scripts = [{ script: '/javascripts/datepicker.js' }];
    var messages = [];
    var event = new Event();

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        
        if(files.filetoupload.name==''){
            messages.push('Please select a logo for the event');
            res.render('event/create', { scripts: scripts, messages: messages, hasErrors: messages.length > 0, event: event });
            return;
        }

        var oldpath = files.filetoupload.path;
        var newpath = path.join(__dirname, '../public/images/') + files.filetoupload.name.replace(' ','_');



        /*
        req.checkBody('eventName','Event Name is required').notEmpty();
        req.checkBody('fromDate','From Date is required').notEmpty();
        req.checkBody('toDate','To Date is required').notEmpty();
        
        var errors = req.validationErrors();
      
        if(errors){
            
            errors.forEach(function(error){
                messages.push(error.msg);
            });
            var scripts = [{ script: '/javascripts/datepicker.js' }];
            return res.render('event/create', {scripts: scripts, messages:messages, hasErrors: messages.length>0, event:event});
            
        }
        */
        // Read the file
        fs.readFile(oldpath, function (err, data) {
            if (err) throw err;
            console.log('File read!');

            // Write the file
            fs.writeFile(newpath, data, function (err) {
                if (err) throw err;

                //file uploaded, now save form fields data
                            
                event.eventName = fields.eventName;
                event.eventLogo = files.filetoupload.name;
                event.fromDate = moment(fields.fromDate,'DD/MM/YYYY').toISOString();
                event.toDate = moment(fields.toDate,'DD/MM/YYYY').toISOString();

                event.save(function (err, result) {
                    if (err)
                        throw err;

                    //event is created, now add default badge categories using the newly generated event id
                    var categories = [
                        new BadgeCategory({
                            code:'Visitor',
                            desc:'Visitor',
                            event: result._id
                        }),
                        new BadgeCategory({
                            code:'Delegate',
                            desc:'Delegate',
                            event: result._id
                        }),
                        new BadgeCategory({
                            code:'Participant',
                            desc:'Participant',
                            event: result._id
                        }),
                        new BadgeCategory({
                            code:'Media',
                            desc:'Media',
                            event: result._id
                        }),
                        new BadgeCategory({
                            code:'Press',
                            desc:'Press',
                            event: result._id
                        }),
                        new BadgeCategory({
                            code:'Vip',
                            desc:'Vip',
                            event: result._id
                        }),
                        new BadgeCategory({
                            code:'Vvip',
                            desc:'Vvip',
                            event: result._id
                        }),
                        new BadgeCategory({
                            code:'Exhibitor',
                            desc:'Exhibitor',
                            event: result._id
                        }),
                        new BadgeCategory({
                            code:'Sponsor',
                            desc:'Sponsor',
                            event: result._id
                        }),
                        new BadgeCategory({
                            code:'Buyer',
                            desc:'Buyer',
                            event: result._id
                        }),
                        new BadgeCategory({
                            code:'Host',
                            desc:'Host',
                            event: result._id
                        }),
                        new BadgeCategory({
                            code:'Organizer',
                            desc:'Organizer',
                            event: result._id
                        }),

                        new BadgeCategory({
                            code:'Speaker',
                            desc:'Speaker',
                            event: result._id
                        }),
                        new BadgeCategory({
                            code:'Student',
                            desc:'Student',
                            event: result._id
                        }),
                        new BadgeCategory({
                            code:'Member',
                            desc:'Member',
                            event: result._id
                        }),
                    ];
                    var eventId = result._id;
                 
                    var done=0;
                    for(var i=0; i<categories.length; i++){
                        categories[i].save(function(err, result){
                            done++;
                            if(done===categories.length){
                                //exit();
                                res.redirect('/event/event-fields/' + eventId);
                            }
                        });
                    }
               
                    //end badge categories


                    
                })//event.save

                console.log('File written!');
            });

            // Delete the file
            fs.unlink(oldpath, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
        });


        //fs.rename(oldpath, newpath, function (err) {
        //    if (err) throw err;


            //start
            //end

        //});//fs.rename
    });//form.parse







});

router.get('/event-fields/:id', function (req, res) {
    var messages = [];

    var eventId = req.params.id;


    Event.findById(eventId, function (err, event) {
        /*
        Event.schema.eachPath(function(path) {
            console.log(path);
        });
        */

        eventJSON = event.toJSON();
        var eventFields = [];
        Object.keys(eventJSON).forEach(function(item){
            
            var eventField={};
            eventField['key']=item;
            eventField['value']=eventJSON[item];
            eventFields.push(eventField);

            console.log(`${eventField.key} - ${eventField.value}`);
        });
        

    

        res.render('event/event-fields', { messages: messages, hasErrors: messages.length > 0, event: event });
    })

    /*
    InputField.find({}, function(err,result){
        if(err)
            throw err;

        res.render('event/event-fields', {messages:messages, hasErrors: messages.length>0, inputFields:result})
    })
    */



})


router.post('/event-fields', function (req, res) {
    var messages = [];

    var eventId = req.body['eventId'];

    Event.findById(eventId, function (err, event) {

        event.uniqueId_label = req.body['uniqueId_label'];
        event.uniqueId_isMandatory = req.body['uniqueId_isMandatory'] ? true : false;
        event.uniqueId_showInSearch = req.body['uniqueId_showInSearch'] ? true : false;
        event.uniqueId_showInRegister = req.body['uniqueId_showInRegister'] ? true : false;
        event.uniqueId_showInPrint = req.body['uniqueId_showInPrint'] ? true : false;
        event.uniqueId_columnInExcel = req.body['uniqueId_columnInExcel'];

        event.barcode_label = req.body['barcode_label'];
        event.barcode_isMandatory = req.body['barcode_isMandatory'] ? true : false;
        event.barcode_showInSearch = req.body['barcode_showInSearch'] ? true : false;
        event.barcode_showInRegister = req.body['barcode_showInRegister'] ? true : false;
        event.barcode_showInPrint = req.body['barcode_showInPrint'] ? true : false;
        event.barcode_columnInExcel = req.body['barcode_columnInExcel'];
      
        event.sno_label = req.body['sno_label'];
        event.sno_isMandatory = req.body['sno_isMandatory'] ? true : false;
        event.sno_showInSearch = req.body['sno_showInSearch'] ? true : false;
        event.sno_showInRegister = req.body['sno_showInRegister'] ? true : false;
        event.sno_showInPrint = req.body['sno_showInPrint'] ? true : false;
        event.sno_columnInExcel = req.body['sno_columnInExcel'];

        event.title_label = req.body['title_label'];
        event.title_isMandatory = req.body['title_isMandatory'] ? true : false;
        event.title_showInSearch = req.body['title_showInSearch'] ? true : false;
        event.title_showInRegister = req.body['title_showInRegister'] ? true : false;
        event.title_showInPrint = req.body['title_showInPrint'] ? true : false;
        event.title_columnInExcel = req.body['title_columnInExcel'];


        event.firstName_label = req.body['firstName_label'];
        event.firstName_isMandatory = req.body['firstName_isMandatory'] ? true : false;
        event.firstName_showInSearch = req.body['firstName_showInSearch'] ? true : false;
        event.firstName_showInRegister = req.body['firstName_showInRegister'] ? true : false;
        event.firstName_showInPrint = req.body['firstName_showInPrint'] ? true : false;
        event.firstName_columnInExcel = req.body['firstName_columnInExcel'];

        event.middleName_label = req.body['middleName_label'];
        event.middleName_isMandatory = req.body['middleName_isMandatory'] ? true : false;
        event.middleName_showInSearch = req.body['middleName_showInSearch'] ? true : false;
        event.middleName_showInRegister = req.body['middleName_showInRegister'] ? true : false;
        event.middleName_showInPrint = req.body['middleName_showInPrint'] ? true : false;
        event.middleName_columnInExcel = req.body['middleName_columnInExcel'];

        event.lastName_label = req.body['lastName_label'];
        event.lastName_isMandatory = req.body['lastName_isMandatory'] ? true : false;
        event.lastName_showInSearch = req.body['lastName_showInSearch'] ? true : false;
        event.lastName_showInRegister = req.body['lastName_showInRegister'] ? true : false;
        event.lastName_showInPrint = req.body['lastName_showInPrint'] ? true : false;
        event.lastName_columnInExcel = req.body['lastName_columnInExcel'];

        event.fullName_label = req.body['fullName_label'];
        event.fullName_isMandatory = req.body['fullName_isMandatory'] ? true : false;
        event.fullName_showInSearch = req.body['fullName_showInSearch'] ? true : false;
        event.fullName_showInRegister = req.body['fullName_showInRegister'] ? true : false;
        event.fullName_showInPrint = req.body['fullName_showInPrint'] ? true : false;
        event.fullName_columnInExcel = req.body['fullName_columnInExcel'];

        event.jobTitle_label = req.body['jobTitle_label'];
        event.jobTitle_isMandatory = req.body['jobTitle_isMandatory'] ? true : false;
        event.jobTitle_showInSearch = req.body['jobTitle_showInSearch'] ? true : false;
        event.jobTitle_showInRegister = req.body['jobTitle_showInRegister'] ? true : false;
        event.jobTitle_showInPrint = req.body['jobTitle_showInPrint'] ? true : false;
        event.jobTitle_columnInExcel = req.body['jobTitle_columnInExcel'];

        event.department_label = req.body['department_label'];
        event.department_isMandatory = req.body['department_isMandatory'] ? true : false;
        event.department_showInSearch = req.body['department_showInSearch'] ? true : false;
        event.department_showInRegister = req.body['department_showInRegister'] ? true : false;
        event.department_showInPrint = req.body['department_showInPrint'] ? true : false;
        event.department_columnInExcel = req.body['department_columnInExcel'];


        event.companyName_label = req.body['companyName_label'];
        event.companyName_isMandatory = req.body['companyName_isMandatory'] ? true : false;
        event.companyName_showInSearch = req.body['companyName_showInSearch'] ? true : false;
        event.companyName_showInRegister = req.body['companyName_showInRegister'] ? true : false;
        event.companyName_showInPrint = req.body['companyName_showInPrint'] ? true : false;
        event.companyName_columnInExcel = req.body['companyName_columnInExcel'];


        event.mobile1_label = req.body['mobile1_label'];
        event.mobile1_isMandatory = req.body['mobile1_isMandatory'] ? true : false;
        event.mobile1_showInSearch = req.body['mobile1_showInSearch'] ? true : false;
        event.mobile1_showInRegister = req.body['mobile1_showInRegister'] ? true : false;
        event.mobile1_showInPrint = req.body['mobile1_showInPrint'] ? true : false;
        event.mobile1_columnInExcel = req.body['mobile1_columnInExcel'];

        event.mobile2_label = req.body['mobile2_label'];
        event.mobile2_isMandatory = req.body['mobile2_isMandatory'] ? true : false;
        event.mobile2_showInSearch = req.body['mobile2_showInSearch'] ? true : false;
        event.mobile2_showInRegister = req.body['mobile2_showInRegister'] ? true : false;
        event.mobile2_showInPrint = req.body['mobile2_showInPrint'] ? true : false;
        event.mobile2_columnInExcel = req.body['mobile2_columnInExcel'];

        event.tel1_label = req.body['tel1_label'];
        event.tel1_isMandatory = req.body['tel1_isMandatory'] ? true : false;
        event.tel1_showInSearch = req.body['tel1_showInSearch'] ? true : false;
        event.tel1_showInRegister = req.body['tel1_showInRegister'] ? true : false;
        event.tel1_showInPrint = req.body['tel1_showInPrint'] ? true : false;
        event.tel1_columnInExcel = req.body['tel1_columnInExcel'];

        event.tel2_label = req.body['tel2_label'];
        event.tel2_isMandatory = req.body['tel2_isMandatory'] ? true : false;
        event.tel2_showInSearch = req.body['tel2_showInSearch'] ? true : false;
        event.tel2_showInRegister = req.body['tel2_showInRegister'] ? true : false;
        event.tel2_showInPrint = req.body['tel2_showInPrint'] ? true : false;
        event.tel2_columnInExcel = req.body['tel2_columnInExcel'];

        event.fax_label = req.body['fax_label'];
        event.fax_isMandatory = req.body['fax_isMandatory'] ? true : false;
        event.fax_showInSearch = req.body['fax_showInSearch'] ? true : false;
        event.fax_showInRegister = req.body['fax_showInRegister'] ? true : false;
        event.fax_showInPrint = req.body['fax_showInPrint'] ? true : false;
        event.fax_columnInExcel = req.body['fax_columnInExcel'];

        event.email_label = req.body['email_label'];
        event.email_isMandatory = req.body['email_isMandatory'] ? true : false;
        event.email_showInSearch = req.body['email_showInSearch'] ? true : false;
        event.email_showInRegister = req.body['email_showInRegister'] ? true : false;
        event.email_showInPrint = req.body['email_showInPrint'] ? true : false;
        event.email_columnInExcel = req.body['email_columnInExcel'];

        event.website_label = req.body['website_label'];
        event.website_isMandatory = req.body['website_isMandatory'] ? true : false;
        event.website_showInSearch = req.body['website_showInSearch'] ? true : false;
        event.website_showInRegister = req.body['website_showInRegister'] ? true : false;
        event.website_showInPrint = req.body['website_showInPrint'] ? true : false;
        event.website_columnInExcel = req.body['website_columnInExcel'];

        event.address1_label = req.body['address1_label'];
        event.address1_isMandatory = req.body['address1_isMandatory'] ? true : false;
        event.address1_showInSearch = req.body['address1_showInSearch'] ? true : false;
        event.address1_showInRegister = req.body['address1_showInRegister'] ? true : false;
        event.address1_showInPrint = req.body['address1_showInPrint'] ? true : false;
        event.address1_columnInExcel = req.body['address1_columnInExcel'];

        event.address2_label = req.body['address2_label'];
        event.address2_isMandatory = req.body['address2_isMandatory'] ? true : false;
        event.address2_showInSearch = req.body['address2_showInSearch'] ? true : false;
        event.address2_showInRegister = req.body['address2_showInRegister'] ? true : false;
        event.address2_showInPrint = req.body['address2_showInPrint'] ? true : false;
        event.address2_columnInExcel = req.body['address2_columnInExcel'];

        event.city_label = req.body['city_label'];
        event.city_isMandatory = req.body['city_isMandatory'] ? true : false;
        event.city_showInSearch = req.body['city_showInSearch'] ? true : false;
        event.city_showInRegister = req.body['city_showInRegister'] ? true : false;
        event.city_showInPrint = req.body['city_showInPrint'] ? true : false;
        event.city_columnInExcel = req.body['city_columnInExcel'];

        event.country_label = req.body['country_label'];
        event.country_isMandatory = req.body['country_isMandatory'] ? true : false;
        event.country_showInSearch = req.body['country_showInSearch'] ? true : false;
        event.country_showInRegister = req.body['country_showInRegister'] ? true : false;
        event.country_showInPrint = req.body['country_showInPrint'] ? true : false;
        event.country_columnInExcel = req.body['country_columnInExcel'];

        event.poBox_label = req.body['poBox_label'];
        event.poBox_isMandatory = req.body['poBox_isMandatory'] ? true : false;
        event.poBox_showInSearch = req.body['poBox_showInSearch'] ? true : false;
        event.poBox_showInRegister = req.body['poBox_showInRegister'] ? true : false;
        event.poBox_showInPrint = req.body['poBox_showInPrint'] ? true : false;
        event.poBox_columnInExcel = req.body['poBox_columnInExcel'];

        event.postalCode_label = req.body['postalCode_label'];
        event.postalCode_isMandatory = req.body['postalCode_isMandatory'] ? true : false;
        event.postalCode_showInSearch = req.body['postalCode_showInSearch'] ? true : false;
        event.postalCode_showInRegister = req.body['postalCode_showInRegister'] ? true : false;
        event.postalCode_showInPrint = req.body['postalCode_showInPrint'] ? true : false;
        event.postalCode_columnInExcel = req.body['postalCode_columnInExcel'];

        event.badgeCategory_label = req.body['badgeCategory_label'];
        event.badgeCategory_isMandatory = req.body['badgeCategory_isMandatory'] ? true : false;
        event.badgeCategory_showInSearch = req.body['badgeCategory_showInSearch'] ? true : false;
        event.badgeCategory_showInRegister = req.body['badgeCategory_showInRegister'] ? true : false;
        event.badgeCategory_showInPrint = req.body['badgeCategory_showInPrint'] ? true : false;
        event.badgeCategory_columnInExcel = req.body['badgeCategory_columnInExcel'];


        event.regType_label = req.body['regType_label'];
        event.regType_isMandatory = req.body['regType_isMandatory'] ? true : false;
        event.regType_showInSearch = req.body['regType_showInSearch'] ? true : false;
        event.regType_showInRegister = req.body['regType_showInRegister'] ? true : false;
        event.regType_showInPrint = req.body['regType_showInPrint'] ? true : false;
        event.regType_columnInExcel = req.body['regType_columnInExcel'];

        event.regDate_label = req.body['regDate_label'];
        event.regDate_isMandatory = req.body['regDate_isMandatory'] ? true : false;
        event.regDate_showInSearch = req.body['regDate_showInSearch'] ? true : false;
        event.regDate_showInRegister = req.body['regDate_showInRegister'] ? true : false;
        event.regDate_showInPrint = req.body['regDate_showInPrint'] ? true : false;
        event.regDate_columnInExcel = req.body['regDate_columnInExcel'];

        event.badgePrintDate_label = req.body['badgePrintDate_label'];
        event.badgePrintDate_isMandatory = req.body['badgePrintDate_isMandatory'] ? true : false;
        event.badgePrintDate_showInSearch = req.body['badgePrintDate_showInSearch'] ? true : false;
        event.badgePrintDate_showInRegister = req.body['badgePrintDate_showInRegister'] ? true : false;
        event.badgePrintDate_showInPrint = req.body['badgePrintDate_showInPrint'] ? true : false;
        event.badgePrintDate_columnInExcel = req.body['badgePrintDate_columnInExcel'];

        event.modifiedDate_label = req.body['modifiedDate_label'];
        event.modifiedDate_isMandatory = req.body['modifiedDate_isMandatory'] ? true : false;
        event.modifiedDate_showInSearch = req.body['modifiedDate_showInSearch'] ? true : false;
        event.modifiedDate_showInRegister = req.body['modifiedDate_showInRegister'] ? true : false;
        event.modifiedDate_showInPrint = req.body['modifiedDate_showInPrint'] ? true : false;
        event.modifiedDate_columnInExcel = req.body['modifiedDate_columnInExcel'];

        event.statusFlag_label = req.body['statusFlag_label'];
        event.statusFlag_isMandatory = req.body['statusFlag_isMandatory'] ? true : false;
        event.statusFlag_showInSearch = req.body['statusFlag_showInSearch'] ? true : false;
        event.statusFlag_showInRegister = req.body['statusFlag_showInRegister'] ? true : false;
        event.statusFlag_showInPrint = req.body['statusFlag_showInPrint'] ? true : false;
        event.statusFlag_columnInExcel = req.body['statusFlag_columnInExcel'];


        event.backoffice_label = req.body['backoffice_label'];
        event.backoffice_isMandatory = req.body['backoffice_isMandatory'] ? true : false;
        event.backoffice_showInSearch = req.body['backoffice_showInSearch'] ? true : false;
        event.backoffice_showInRegister = req.body['backoffice_showInRegister'] ? true : false;
        event.backoffice_showInPrint = req.body['backoffice_showInPrint'] ? true : false;
        event.backoffice_columnInExcel = req.body['backoffice_columnInExcel'];


        event.comment1_label = req.body['comment1_label'];
        event.comment1_isMandatory = req.body['comment1_isMandatory'] ? true : false;
        event.comment1_showInSearch = req.body['comment1_showInSearch'] ? true : false;
        event.comment1_showInRegister = req.body['comment1_showInRegister'] ? true : false;
        event.comment1_showInPrint = req.body['comment1_showInPrint'] ? true : false;
        event.comment1_columnInExcel = req.body['comment1_columnInExcel'];

        event.comment2_label = req.body['comment2_label'];
        event.comment2_isMandatory = req.body['comment2_isMandatory'] ? true : false;
        event.comment2_showInSearch = req.body['comment2_showInSearch'] ? true : false;
        event.comment2_showInRegister = req.body['comment2_showInRegister'] ? true : false;
        event.comment2_showInPrint = req.body['comment2_showInPrint'] ? true : false;
        event.comment2_columnInExcel = req.body['comment2_columnInExcel'];

        event.comment3_label = req.body['comment3_label'];
        event.comment3_isMandatory = req.body['comment3_isMandatory'] ? true : false;
        event.comment3_showInSearch = req.body['comment3_showInSearch'] ? true : false;
        event.comment3_showInRegister = req.body['comment3_showInRegister'] ? true : false;
        event.comment3_showInPrint = req.body['comment3_showInPrint'] ? true : false;
        event.comment3_columnInExcel = req.body['comment3_columnInExcel'];

        event.comment4_label = req.body['comment4_label'];
        event.comment4_isMandatory = req.body['comment4_isMandatory'] ? true : false;
        event.comment4_showInSearch = req.body['comment4_showInSearch'] ? true : false;
        event.comment4_showInRegister = req.body['comment4_showInRegister'] ? true : false;
        event.comment4_showInPrint = req.body['comment4_showInPrint'] ? true : false;
        event.comment4_columnInExcel = req.body['comment4_columnInExcel'];


        event.comment5_label = req.body['comment5_label'];
        event.comment5_isMandatory = req.body['comment5_isMandatory'] ? true : false;
        event.comment5_showInSearch = req.body['comment5_showInSearch'] ? true : false;
        event.comment5_showInRegister = req.body['comment5_showInRegister'] ? true : false;
        event.comment5_showInPrint = req.body['comment5_showInPrint'] ? true : false;
        event.comment5_columnInExcel = req.body['comment5_columnInExcel'];

        event.comment6_label = req.body['comment6_label'];
        event.comment6_isMandatory = req.body['comment6_isMandatory'] ? true : false;
        event.comment6_showInSearch = req.body['comment6_showInSearch'] ? true : false;
        event.comment6_showInRegister = req.body['comment6_showInRegister'] ? true : false;
        event.comment6_showInPrint = req.body['comment6_showInPrint'] ? true : false;
        event.comment6_columnInExcel = req.body['comment6_columnInExcel'];

        event.comment7_label = req.body['comment7_label'];
        event.comment7_isMandatory = req.body['comment7_isMandatory'] ? true : false;
        event.comment7_showInSearch = req.body['comment7_showInSearch'] ? true : false;
        event.comment7_showInRegister = req.body['comment7_showInRegister'] ? true : false;
        event.comment7_showInPrint = req.body['comment7_showInPrint'] ? true : false;
        event.comment7_columnInExcel = req.body['comment7_columnInExcel'];

        event.comment8_label = req.body['comment8_label'];
        event.comment8_isMandatory = req.body['comment8_isMandatory'] ? true : false;
        event.comment8_showInSearch = req.body['comment8_showInSearch'] ? true : false;
        event.comment8_showInRegister = req.body['comment8_showInRegister'] ? true : false;
        event.comment8_showInPrint = req.body['comment8_showInPrint'] ? true : false;
        event.comment8_columnInExcel = req.body['comment8_columnInExcel'];

        event.comment9_label = req.body['comment9_label'];
        event.comment9_isMandatory = req.body['comment9_isMandatory'] ? true : false;
        event.comment9_showInSearch = req.body['comment9_showInSearch'] ? true : false;
        event.comment9_showInRegister = req.body['comment9_showInRegister'] ? true : false;
        event.comment9_showInPrint = req.body['comment9_showInPrint'] ? true : false;
        event.comment9_columnInExcel = req.body['comment9_columnInExcel'];

        event.comment10_label = req.body['comment10_label'];
        event.comment10_isMandatory = req.body['comment10_isMandatory'] ? true : false;
        event.comment10_showInSearch = req.body['comment10_showInSearch'] ? true : false;
        event.comment10_showInRegister = req.body['comment10_showInRegister'] ? true : false;
        event.comment10_showInPrint = req.body['comment10_showInPrint'] ? true : false;
        event.comment10_columnInExcel = req.body['comment10_columnInExcel'];

        event.save(function (err, result) {
            //res.render('event/event-fields', {messages:messages, hasErrors: messages.length>0,  event:event})
            res.redirect('/event/badge-categories/' + eventId);
        });
    })



    /*
    InputField.find({}, function(err,inputFields){
        if(err)
            throw err;

            var done=0;
            var newInputFields = [];

            inputFields.forEach(function(field){
                console.log(field.fieldName + ': ' + req.body[field._id + '-label']);

                var eventField = new EventField();
                eventField.eventId = eventId;
                eventField.fieldId = field._id;
                eventField.fieldLabel = req.body[field._id + '-label'];
                eventField.isMandatory = req.body[field._id + '-isMandatory'] ? true: false;
                eventField.showInSearch = req.body[field._id + '-showInSearch'] ? true: false;
                eventField.showInRegister = req.body[field._id + '-showInRegister'] ? true: false;
                eventField.showInPrint = req.body[field._id + '-showInPrint'] ? true: false;

                field.fieldLabel = req.body[field._id + '-label'];
                field.isMandatory = req.body[field._id + '-isMandatory'] ? true: false;
                field.showInSearch = req.body[field._id + '-showInSearch'] ? true: false;
                field.showInRegister = req.body[field._id + '-showInRegister'] ? true: false;
                field.showInPrint = req.body[field._id + '-showInPrint'] ? true: false;

                newInputFields.push(field);

                eventField.save(function(err,result){
                    if(err)
                        throw err;
                    done++;

                    if(done===3){
                        res.render('event/event-fields', {messages:messages, hasErrors: messages.length>0,  inputFields:newInputFields})
                    }
                    
                });
            });//inputFields.forEach
    });//InputField.find
    */


})

router.get('/', function (req, res) {
    var messages = [];

    if(req.user.role=='user')
        return res.redirect('/event/registration/' + req.user.event);


    Event.find({}, function (err, result) {
        if (err)
            throw err;

        res.render('event/index', { messages: messages, events: result });

    })
})

router.get('/getregistration', function(req,res){
    var messages = [];
    
        var scripts = [{ script: '/javascripts/registration.js' }];
    
        var eventId = req.session.eventId;
        var startIndex = parseInt(req.query.start);
        var pageSize = parseInt(req.query.length);
        var draw = req.query.draw;
        var search = req.query.search.value;
        var searchArray = search.split(' ');

        if(search==''){
            var result= {
                "draw": draw,
                "recordsTotal": 0,
                "recordsFiltered": 0,
                "data": [],
                };
            
                return res.json(result);
        }

        //console.log(`search=${search}`);

        Event.findById(eventId, function (err, event) {
    
            var searchColumns=[];
            
            
            Object.keys(event.toJSON()).forEach(function(item){
                if(item.indexOf('_includeInSearch')>-1 && event[item]==true ){
                    var key = item.substring(0, item.indexOf('_includeInSearch') );

                        var regexObj = {};
                        regexObj[key] = {};
                        regexObj[key]['$regex']='.*' + searchArray[0] + '.*';
                        regexObj[key]['$options']='i';
                        searchColumns.push(regexObj);

                }
            });
            //console.log(`search columns = ${searchColumns}`);


    
            EventData
                .find({ event: eventId, 
                    /*
                    $or:[  
                        {fullName: { $regex: '.*' + search + '.*', $options:'i' }},
                        {email: { $regex: '.*' + search + '.*', $options:'i' }},
                    ] })
                    */
                    $or:searchColumns
                 })
                .skip(startIndex)
                .limit(pageSize)
                //.populate('event')
                //.populate('country').populate('badgeCategory')
                .exec(function (err, eventData) {
                    if (err)
                        throw err;
    
                        var rows=[];

                        eventData.forEach(function(data){
                            var columns=[];


                            Object.keys(event.toJSON()).forEach(function(item){
                                if(item.indexOf('_showInSearch')>-1 && event[item]==true ){
                                    var key = item.substring(0, item.indexOf('_showInSearch') );
                               
                                    columns.unshift(data[key]);
                                    //console.log(`key=${key};event=${data[key]}`)
                                }
                            });
                            columns.unshift(data._id);

                            //if search coloumns more than 1
                            var includeRow=false;
                            
                            console.log(`search array len=${searchArray.length}`);
                            if(searchArray.length>1){
                                

                                Object.keys(event.toJSON()).forEach(function(item){
                                    if(item.indexOf('_includeInSearch')>-1 && event[item]==true ){
                                        var key = item.substring(0, item.indexOf('_includeInSearch') );
                                            console.log(`searchArray=${searchArray[1]}, datakey=${data[key]}`);
                                            if(data[key] && searchArray[1] &&  data[key].toUpperCase().indexOf(searchArray[1].toUpperCase())>-1){
                                                includeRow=true;
                                            }
                                    }
                                });
                            }
                            else {
                                includeRow=true;
                            }
                            //end if search columns more than 1
                            if(includeRow)
                                rows.push(columns);
                        });




                        EventData.find({ event: eventId, 
                            $or:searchColumns
                        }).count().exec(function(err, count){
                        var result= {
                            "draw": draw,
                            "recordsTotal": count,
                            "recordsFiltered": count,
                            "data": rows,
                            };

                            //console.log(result);
                            res.json(result);

                        })

                        
                   
    
                })
        })
})

router.get('/registration/:id', function (req, res) {
    var messages = [];
    var eventId = req.params.id;
    req.session.eventId = eventId;

    var scripts = [{ script: '/javascripts/registration.js' }];

    Event.findById(eventId, function (err, event) {
        var columns=[];

        Object.keys(event.toJSON()).forEach(function(item){
            

            if(item.indexOf('_showInSearch')>-1 && event[item]==true ){
                var key = item.substring(0, item.indexOf('_showInSearch') ) + '_label';
           
                columns.unshift(event[key]);
            }
        })

        columns.unshift('Key');
        var eventDataIdForPrint='';

        if(req.session.eventDataIdForPrint){
            scripts = [{ script: '/javascripts/printbadge.js' }];
            eventDataIdForPrint = req.session.eventDataIdForPrint;
            delete req.session.eventDataIdForPrint;
        }
      

        res.render('event/registration', { eventDataIdForPrint:eventDataIdForPrint, scripts:scripts, messages: messages, event: event, columns:columns });

    });
    



})

module.exports = router;
