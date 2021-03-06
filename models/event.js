var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    eventName: {type:String, required:[true, 'Event Name is required']},
    eventLogo: {type:String},
    fromDate: {type: Date, required:[true, 'From Date is required'] },
    toDate: {type: Date, required:[true, 'To Date is required'] },
    setupComplete: {type:Boolean, default:false},

    uniqueId_fieldType: {type:String, default:'text'},
    uniqueId_label: {type:String, default:'Unique ID'},
    uniqueId_isMandatory: {type:Boolean, default:false}, 
    uniqueId_showInSearch: {type:Boolean, default:true},
    uniqueId_includeInSearch: {type:Boolean, default:true},
    uniqueId_showInRegister: {type:Boolean, default:false},
    uniqueId_showInPrint: {type:Boolean, default:false},
    uniqueId_columnInExcel: {type:String, default:'A'},
    uniqueId_top: {type: Number, default: 10},
    uniqueId_left: {type: Number, default: 10},
    uniqueId_width: {type: Number, default: 100},
    uniqueId_fontFamily: {type: String, default: 'Calibri'},
    uniqueId_fontSize: {type: Number, default: 11},
    uniqueId_fontWeight: {type: String, default: 'normal'},
    uniqueId_fontStyle: {type: String, default: 'normal'},
    uniqueId_textAlign: {type: String, default: 'left'},

    barcode_fieldType: {type:String, default:'text'},
    barcode_label: {type:String, default:'Barcode'},
    barcode_isMandatory: {type:Boolean, default:false}, 
    barcode_showInSearch: {type:Boolean, default:false},
    barcode_includeInSearch: {type:Boolean, default:false},
    barcode_showInRegister: {type:Boolean, default:false},
    barcode_showInPrint: {type:Boolean, default:true},
    barcode_columnInExcel: {type:String, default:'B'},
    barcode_top: {type:Number, default:10},
    barcode_left: {type:Number, default:10},


    sno_fieldType: {type:String, default:'text'},
    sno_label: {type:String, default:'SNo'},
    sno_isMandatory: {type:Boolean, default:false}, 
    sno_showInSearch: {type:Boolean, default:false},
    sno_includeInSearch: {type:Boolean, default:false},
    sno_showInRegister: {type:Boolean, default:false},
    sno_showInPrint: {type:Boolean, default:false},
    sno_columnInExcel: {type:String, default:'C'},
    sno_top: {type: Number, default: 10},
    sno_left: {type: Number, default: 10},
    sno_width: {type: Number, default: 100},
    sno_fontFamily: {type: String, default: 'Calibri'},
    sno_fontSize: {type: Number, default: 11},
    sno_fontWeight: {type: String, default: 'normal'},
    sno_fontStyle: {type: String, default: 'normal'},
    sno_textAlign: {type: String, default: 'left'},

    title_fieldType: {type:String, default:'titles'},
    title_label: {type:String, default:'Title'},
    title_isMandatory: {type:Boolean, default:false}, 
    title_showInSearch: {type:Boolean, default:false},
    title_includeInSearch: {type:Boolean, default:false},
    title_showInRegister: {type:Boolean, default:false},
    title_showInPrint: {type:Boolean, default:false},
    title_columnInExcel: {type:String, default:'D'},
    title_top: {type: Number, default: 10},
    title_left: {type: Number, default: 10},
    title_width: {type: Number, default: 100},
    title_fontFamily: {type: String, default: 'Calibri'},
    title_fontSize: {type: Number, default: 11},
    title_fontWeight: {type: String, default: 'normal'},
    title_fontStyle: {type: String, default: 'normal'},
    title_textAlign: {type: String, default: 'left'},

    firstName_fieldType: {type:String, default:'text'},
    firstName_label: {type:String, default:'First Name'},
    firstName_isMandatory: {type:Boolean, default:false}, 
    firstName_showInSearch: {type:Boolean, default:false},
    firstName_includeInSearch: {type:Boolean, default:false},
    firstName_showInRegister: {type:Boolean, default:false},
    firstName_showInPrint: {type:Boolean,default:false},
    firstName_columnInExcel: {type:String, default:'E'},
    firstName_top: {type: Number, default: 10},
    firstName_left: {type: Number, default: 10},
    firstName_width: {type: Number, default: 100},
    firstName_fontFamily: {type: String, default: 'Calibri'},
    firstName_fontSize: {type: Number, default: 11},
    firstName_fontWeight: {type: String, default: 'normal'},
    firstName_fontStyle: {type: String, default: 'normal'},
    firstName_textAlign: {type: String, default: 'left'},

    middleName_fieldType: {type:String, default:'text'},
    middleName_label: {type:String, default:'Middle Name'},
    middleName_isMandatory: {type:Boolean, default:false}, 
    middleName_showInSearch: {type:Boolean, default: false},
    middleName_includeInSearch: {type:Boolean, default:false},
    middleName_showInRegister: {type:Boolean, default:false},
    middleName_showInPrint: {type:Boolean, default:false},
    middleName_columnInExcel: {type:String, default:'F'},
    middleName_top: {type: Number, default: 10},
    middleName_left: {type: Number, default: 10},
    middleName_width: {type: Number, default: 100},
    middleName_fontFamily: {type: String, default: 'Calibri'},
    middleName_fontSize: {type: Number, default: 11},
    middleName_fontWeight: {type: String, default: 'normal'},
    middleName_fontStyle: {type: String, default: 'normal'},
    middleName_textAlign: {type: String, default: 'left'},

    lastName_fieldType: {type:String, default:'text'},
    lastName_label: {type:String, default:'Last Name'},
    lastName_isMandatory: {type:Boolean, default:false }, 
    lastName_showInSearch: {type:Boolean, default:false},
    lastName_includeInSearch: {type:Boolean, default:false},
    lastName_showInRegister: {type:Boolean, default:false},
    lastName_showInPrint: {type:Boolean, default:false},
    lastName_columnInExcel: {type:String, default:'G'},
    lastName_top: {type: Number, default: 10},
    lastName_left: {type: Number, default: 10},
    lastName_width: {type: Number, default: 100},
    lastName_fontFamily: {type: String, default: 'Calibri'},
    lastName_fontSize: {type: Number, default: 11},
    lastName_fontWeight: {type: String, default: 'normal'},
    lastName_fontStyle: {type: String, default: 'normal'},
    lastName_textAlign: {type: String, default: 'left'},


    fullName_fieldType: {type:String, default:'text'},
    fullName_label: {type:String, default:'Full Name'},
    fullName_isMandatory: {type:Boolean, default:true}, 
    fullName_showInSearch: {type:Boolean, default:true},
    fullName_includeInSearch: {type:Boolean, default:true},
    fullName_showInRegister: {type:Boolean, default:true},
    fullName_showInPrint: {type:Boolean, default:true},
    fullName_columnInExcel: {type:String, default:'H'},
    fullName_top: {type:Number, default:0},
    fullName_left: {type:Number, default:0},
    fullName_top: {type: Number, default: 10},
    fullName_left: {type: Number, default: 10},
    fullName_width: {type: Number, default: 100},
    fullName_fontFamily: {type: String, default: 'Calibri'},
    fullName_fontSize: {type: Number, default: 11},
    fullName_fontWeight: {type: String, default: 'normal'},
    fullName_fontStyle: {type: String, default: 'normal'},
    fullName_textAlign: {type: String, default: 'left'},


    jobTitle_fieldType: {type:String, default:'text'},
    jobTitle_label: {type:String, default:'Job Title'},
    jobTitle_isMandatory: {type:Boolean, default:true}, 
    jobTitle_showInSearch: {type:Boolean, default:true},
    jobTitle_includeInSearch: {type:Boolean, default:true},
    jobTitle_showInRegister: {type:Boolean, default:true},
    jobTitle_showInPrint: {type:Boolean, default:false},
    jobTitle_columnInExcel: {type:String, default:'I'},
    jobTitle_top: {type: Number, default: 10},
    jobTitle_left: {type: Number, default: 10},
    jobTitle_width: {type: Number, default: 100},
    jobTitle_fontFamily: {type: String, default: 'Calibri'},
    jobTitle_fontSize: {type: Number, default: 11},
    jobTitle_fontWeight: {type: String, default: 'normal'},
    jobTitle_fontStyle: {type: String, default: 'normal'},
    jobTitle_textAlign: {type: String, default: 'left'},


    department_fieldType: {type:String, default:'text'},
    department_label: {type:String, default:'Department'},
    department_isMandatory: {type:Boolean, default:false}, 
    department_showInSearch: {type:Boolean, default:false},
    department_includeInSearch: {type:Boolean, default:false},
    department_showInRegister: {type:Boolean, default:false},
    department_showInPrint: {type:Boolean, default:false},
    department_columnInExcel: {type:String, default:'J'},
    department_top: {type: Number, default: 10},
    department_left: {type: Number, default: 10},
    department_width: {type: Number, default: 100},
    department_fontFamily: {type: String, default: 'Calibri'},
    department_fontSize: {type: Number, default: 11},
    department_fontWeight: {type: String, default: 'normal'},
    department_fontStyle: {type: String, default: 'normal'},
    department_textAlign: {type: String, default: 'left'},


    companyName_fieldType: {type:String, default:'text'},
    companyName_label: {type:String, default:'Company Name'},
    companyName_isMandatory: {type:Boolean, default:true}, 
    companyName_showInSearch: {type:Boolean, default:true},
    companyName_includeInSearch: {type:Boolean, default:true},
    companyName_showInRegister: {type:Boolean, default:true},
    companyName_showInPrint: {type:Boolean, default:true},
    companyName_columnInExcel: {type:String, default:'K'},
    companyName_top: {type:Number, default:0},
    companyName_left: {type:Number, default:0},
    companyName_top: {type: Number, default: 10},
    companyName_left: {type: Number, default: 10},
    companyName_width: {type: Number, default: 100},
    companyName_fontFamily: {type: String, default: 'Calibri'},
    companyName_fontSize: {type: Number, default: 11},
    companyName_fontWeight: {type: String, default: 'normal'},
    companyName_fontStyle: {type: String, default: 'normal'},
    companyName_textAlign: {type: String, default: 'left'},


    mobile1_fieldType: {type:String, default:'text'},
    mobile1_label: {type:String, default:'Mobile'},
    mobile1_isMandatory: {type:Boolean, default:true}, 
    mobile1_showInSearch: {type:Boolean, default:true},
    mobile1_includeInSearch: {type:Boolean, default:true},
    mobile1_showInRegister: {type:Boolean, default:true},
    mobile1_showInPrint: {type:Boolean, default:false},
    mobile1_columnInExcel: {type:String, default:'L'},
    mobile1_top: {type: Number, default: 10},
    mobile1_left: {type: Number, default: 10},
    mobile1_width: {type: Number, default: 100},
    mobile1_fontFamily: {type: String, default: 'Calibri'},
    mobile1_fontSize: {type: Number, default: 11},
    mobile1_fontWeight: {type: String, default: 'normal'},
    mobile1_fontStyle: {type: String, default: 'normal'},
    mobile1_textAlign: {type: String, default: 'left'},

    mobile2_fieldType: {type:String, default:'text'},
    mobile2_label: {type:String, default:'Mobile 2'},
    mobile2_isMandatory: {type:Boolean, default:false}, 
    mobile2_showInSearch: {type:Boolean, default:false},
    mobile2_includeInSearch: {type:Boolean, default:false},
    mobile2_showInRegister: {type:Boolean, default:false},
    mobile2_showInPrint: {type:Boolean, default:false},
    mobile2_columnInExcel: {type:String, default:'M'},
    mobile2_top: {type: Number, default: 10},
    mobile2_left: {type: Number, default: 10},
    mobile2_width: {type: Number, default: 100},
    mobile2_fontFamily: {type: String, default: 'Calibri'},
    mobile2_fontSize: {type: Number, default: 11},
    mobile2_fontWeight: {type: String, default: 'normal'},
    mobile2_fontStyle: {type: String, default: 'normal'},
    mobile2_textAlign: {type: String, default: 'left'},

    tel1_fieldType: {type:String, default:'text'},
    tel1_label: {type:String, default:'Tel 1'},
    tel1_isMandatory: {type:Boolean, default:false}, 
    tel1_showInSearch: {type:Boolean, default:false},
    tel1_includeInSearch: {type:Boolean, default:false},
    tel1_showInRegister: {type:Boolean, default:false},
    tel1_showInPrint: {type:Boolean, default:false},
    tel1_columnInExcel: {type:String, default:'N'},
    tel1_top: {type: Number, default: 10},
    tel1_left: {type: Number, default: 10},
    tel1_width: {type: Number, default: 100},
    tel1_fontFamily: {type: String, default: 'Calibri'},
    tel1_fontSize: {type: Number, default: 11},
    tel1_fontWeight: {type: String, default: 'normal'},
    tel1_fontStyle: {type: String, default: 'normal'},
    tel1_textAlign: {type: String, default: 'left'},

    tel2_fieldType: {type:String, default:'text'},
    tel2_label: {type:String, default:'Tel 2'},
    tel2_isMandatory: {type:Boolean, default:false}, 
    tel2_showInSearch: {type:Boolean, default:false},
    tel2_includeInSearch: {type:Boolean, default:false},
    tel2_showInRegister: {type:Boolean, default:false},
    tel2_showInPrint: {type:Boolean, default:false},
    tel2_columnInExcel: {type:String, default:'O'},
    tel2_top: {type: Number, default: 10},
    tel2_left: {type: Number, default: 10},
    tel2_width: {type: Number, default: 100},
    tel2_fontFamily: {type: String, default: 'Calibri'},
    tel2_fontSize: {type: Number, default: 11},
    tel2_fontWeight: {type: String, default: 'normal'},
    tel2_fontStyle: {type: String, default: 'normal'},
    tel2_textAlign: {type: String, default: 'left'},

    fax_fieldType: {type:String, default:'text'},
    fax_label: {type:String, default:'Fax'},
    fax_isMandatory: {type:Boolean, default:false}, 
    fax_showInSearch: {type:Boolean, default:false},
    fax_includeInSearch: {type:Boolean, default:false},
    fax_showInRegister: {type:Boolean, default:false},
    fax_showInPrint: {type:Boolean, default:false},
    fax_columnInExcel: {type:String, default:'P'},
    fax_top: {type: Number, default: 10},
    fax_left: {type: Number, default: 10},
    fax_width: {type: Number, default: 100},
    fax_fontFamily: {type: String, default: 'Calibri'},
    fax_fontSize: {type: Number, default: 11},
    fax_fontWeight: {type: String, default: 'normal'},
    fax_fontStyle: {type: String, default: 'normal'},
    fax_textAlign: {type: String, default: 'left'},

    email_fieldType: {type:String, default:'text'},
    email_label: {type:String, default:'Email'},
    email_isMandatory: {type:Boolean, default:true}, 
    email_showInSearch: {type:Boolean, default:true},
    email_includeInSearch: {type:Boolean, default:true},
    email_showInRegister: {type:Boolean, default:true},
    email_showInPrint: {type:Boolean, default:false},
    email_columnInExcel: {type:String, default:'Q'},
    email_top: {type: Number, default: 10},
    email_left: {type: Number, default: 10},
    email_width: {type: Number, default: 100},
    email_fontFamily: {type: String, default: 'Calibri'},
    email_fontSize: {type: Number, default: 11},
    email_fontWeight: {type: String, default: 'normal'},
    email_fontStyle: {type: String, default: 'normal'},
    email_textAlign: {type: String, default: 'left'},

    website_fieldType: {type:String, default:'text'},
    website_label: {type:String, default:'Website'},
    website_isMandatory: {type:Boolean, default:false}, 
    website_showInSearch: {type:Boolean, default:false},
    website_includeInSearch: {type:Boolean, default:false},
    website_showInRegister: {type:Boolean, default:false},
    website_showInPrint: {type:Boolean, default:false},
    website_columnInExcel: {type:String, default:'R'},
    website_top: {type: Number, default: 10},
    website_left: {type: Number, default: 10},
    website_width: {type: Number, default: 100},
    website_fontFamily: {type: String, default: 'Calibri'},
    website_fontSize: {type: Number, default: 11},
    website_fontWeight: {type: String, default: 'normal'},
    website_fontStyle: {type: String, default: 'normal'},
    website_textAlign: {type: String, default: 'left'},

    address1_fieldType: {type:String, default:'text'},
    address1_label: {type:String, default:'Address 1'},
    address1_isMandatory: {type:Boolean, default:false}, 
    address1_showInSearch: {type:Boolean, default:false},
    address1_includeInSearch: {type:Boolean, default:false},
    address1_showInRegister: {type:Boolean, default:false},
    address1_showInPrint: {type:Boolean, default:false},
    address1_columnInExcel: {type:String, default:'S'},
    address1_top: {type: Number, default: 10},
    address1_left: {type: Number, default: 10},
    address1_width: {type: Number, default: 100},
    address1_fontFamily: {type: String, default: 'Calibri'},
    address1_fontSize: {type: Number, default: 11},
    address1_fontWeight: {type: String, default: 'normal'},
    address1_fontStyle: {type: String, default: 'normal'},
    address1_textAlign: {type: String, default: 'left'},

    address2_fieldType: {type:String, default:'text'},
    address2_label: {type:String, default:'Address 2'},
    address2_isMandatory: {type:Boolean, default:false}, 
    address2_showInSearch: {type:Boolean, default:false},
    address2_includeInSearch: {type:Boolean, default:false},
    address2_showInRegister: {type:Boolean, default:false},
    address2_showInPrint: {type:Boolean, default:false},
    address2_columnInExcel: {type:String, default:'T'},
    address2_top: {type: Number, default: 10},
    address2_left: {type: Number, default: 10},
    address2_width: {type: Number, default: 100},
    address2_fontFamily: {type: String, default: 'Calibri'},
    address2_fontSize: {type: Number, default: 11},
    address2_fontWeight: {type: String, default: 'normal'},
    address2_fontStyle: {type: String, default: 'normal'},
    address2_textAlign: {type: String, default: 'left'},
  
    city_fieldType: {type:String, default:'text'},
    city_label: {type:String, default:'City'},
    city_isMandatory: {type:Boolean, default:false}, 
    city_showInSearch: {type:Boolean, default:false},
    city_includeInSearch: {type:Boolean, default:false},
    city_showInRegister: {type:Boolean, default:false},
    city_showInPrint: {type:Boolean, default:false},
    city_columnInExcel: {type:String, default:'U'},
    city_top: {type: Number, default: 10},
    city_left: {type: Number, default: 10},
    city_width: {type: Number, default: 100},
    city_fontFamily: {type: String, default: 'Calibri'},
    city_fontSize: {type: Number, default: 11},
    city_fontWeight: {type: String, default: 'normal'},
    city_fontStyle: {type: String, default: 'normal'},
    city_textAlign: {type: String, default: 'left'},

    country_fieldType: {type:String, default:'countries'},
    country_label: {type:String, default:'Country'},
    country_isMandatory: {type:Boolean, default:true}, 
    country_showInSearch: {type:Boolean, default:true},
    country_includeInSearch: {type:Boolean, default:true},
    country_showInRegister: {type:Boolean,default:true},
    country_showInPrint: {type:Boolean, default:false},
    country_columnInExcel: {type:String, default:'V'},
    country_top: {type: Number, default: 10},
    country_left: {type: Number, default: 10},
    country_width: {type: Number, default: 100},
    country_fontFamily: {type: String, default: 'Calibri'},
    country_fontSize: {type: Number, default: 11},
    country_fontWeight: {type: String, default: 'normal'},
    country_fontStyle: {type: String, default: 'normal'},
    country_textAlign: {type: String, default: 'left'},

    poBox_fieldType: {type:String, default:'text'},
    poBox_label: {type:String, default:'P.O.Box'},
    poBox_isMandatory: {type:Boolean, default:false}, 
    poBox_showInSearch: {type:Boolean, default:false},
    poBox_includeInSearch: {type:Boolean, default:false},
    poBox_showInRegister: {type:Boolean, default:false},
    poBox_showInPrint: {type:Boolean, default:false},
    poBox_columnInExcel: {type:String, default:'W'},
    poBox_top: {type: Number, default: 10},
    poBox_left: {type: Number, default: 10},
    poBox_width: {type: Number, default: 100},
    poBox_fontFamily: {type: String, default: 'Calibri'},
    poBox_fontSize: {type: Number, default: 11},
    poBox_fontWeight: {type: String, default: 'normal'},
    poBox_fontStyle: {type: String, default: 'normal'},
    poBox_textAlign: {type: String, default: 'left'},

    postalCode_fieldType: {type:String, default:'text'},
    postalCode_label: {type:String, default:'Postal Code'},
    postalCode_isMandatory: {type:Boolean, default:false}, 
    postalCode_showInSearch: {type:Boolean, default:false},
    postalCode_includeInSearch: {type:Boolean, default:false},
    postalCode_showInRegister: {type:Boolean, default:false},
    postalCode_showInPrint: {type:Boolean, default:false},
    postalCode_columnInExcel: {type:String, default:'X'},
    postalCode_top: {type: Number, default: 10},
    postalCode_left: {type: Number, default: 10},
    postalCode_width: {type: Number, default: 100},
    postalCode_fontFamily: {type: String, default: 'Calibri'},
    postalCode_fontSize: {type: Number, default: 11},
    postalCode_fontWeight: {type: String, default: 'normal'},
    postalCode_fontStyle: {type: String, default: 'normal'},
    postalCode_textAlign: {type: String, default: 'left'},

    badgeCategory_fieldType: {type:String, default:'badgeCategories'},
    badgeCategory_label: {type:String, default:'Badge Category'},
    badgeCategory_isMandatory: {type:Boolean, default:true}, 
    badgeCategory_showInSearch: {type:Boolean, default:true},
    badgeCategory_includeInSearch: {type:Boolean, default:false},
    badgeCategory_showInRegister: {type:Boolean, default:true},
    badgeCategory_showInPrint: {type:Boolean, default:false},
    badgeCategory_columnInExcel: {type:String, default:'Y'},
    badgeCategory_top: {type: Number, default: 10},
    badgeCategory_left: {type: Number, default: 10},
    badgeCategory_width: {type: Number, default: 100},
    badgeCategory_fontFamily: {type: String, default: 'Calibri'},
    badgeCategory_fontSize: {type: Number, default: 11},
    badgeCategory_fontWeight: {type: String, default: 'normal'},
    badgeCategory_fontStyle: {type: String, default: 'normal'},
    badgeCategory_textAlign: {type: String, default: 'left'},

    regType_fieldType: {type:String, default:'list'},
    regType_label: {type:String, default:'Reg Type'},
    regType_isMandatory: {type:Boolean, default:false}, 
    regType_showInSearch: {type:Boolean, default:false},
    regType_includeInSearch: {type:Boolean, default:false},
    regType_showInRegister: {type:Boolean, default:false},
    regType_showInPrint: {type:Boolean, default:false},
    regType_columnInExcel: {type:String, default:'Z'},
    regType_top: {type: Number, default: 10},
    regType_left: {type: Number, default: 10},
    regType_width: {type: Number, default: 100},
    regType_fontFamily: {type: String, default: 'Calibri'},
    regType_fontSize: {type: Number, default: 11},
    regType_fontWeight: {type: String, default: 'normal'},
    regType_fontStyle: {type: String, default: 'normal'},
    regType_textAlign: {type: String, default: 'left'},

    regDate_fieldType: {type:String, default:'date'},
    regDate_label: {type:String, default:'Reg Date'},
    regDate_isMandatory: {type:Boolean, default:false}, 
    regDate_showInSearch: {type:Boolean, default:false},
    regDate_includeInSearch: {type:Boolean, default:false},
    regDate_showInRegister: {type:Boolean, default:false},
    regDate_showInPrint: {type:Boolean, default:false},
    regDate_columnInExcel: {type:String, default:'AA'},
    regDate_top: {type: Number, default: 10},
    regDate_left: {type: Number, default: 10},
    regDate_width: {type: Number, default: 100},
    regDate_fontFamily: {type: String, default: 'Calibri'},
    regDate_fontSize: {type: Number, default: 11},
    regDate_fontWeight: {type: String, default: 'normal'},
    regDate_fontStyle: {type: String, default: 'normal'},
    regDate_textAlign: {type: String, default: 'left'},
 
    badgePrintDate_fieldType: {type:String, default:'date'},
    badgePrintDate_label: {type:String, default:'Badge Print Date'},
    badgePrintDate_isMandatory: {type:Boolean, default:false}, 
    badgePrintDate_showInSearch: {type:Boolean, default:false},
    badgePrintDate_includeInSearch: {type:Boolean, default:false},
    badgePrintDate_showInRegister: {type:Boolean, default:false},
    badgePrintDate_showInPrint: {type:Boolean, default:false},
    badgePrintDate_columnInExcel: {type:String, default:'AB'},
    badgePrintDate_top: {type: Number, default: 10},
    badgePrintDate_left: {type: Number, default: 10},
    badgePrintDate_width: {type: Number, default: 100},
    badgePrintDate_fontFamily: {type: String, default: 'Calibri'},
    badgePrintDate_fontSize: {type: Number, default: 11},
    badgePrintDate_fontWeight: {type: String, default: 'normal'},
    badgePrintDate_fontStyle: {type: String, default: 'normal'},
    badgePrintDate_textAlign: {type: String, default: 'left'},

    modifiedDate_fieldType: {type:String, default:'date'},
    modifiedDate_label: {type:String, default:'Modified Date'},
    modifiedDate_isMandatory: {type:Boolean, default:false}, 
    modifiedDate_showInSearch: {type:Boolean, default:false},
    modifiedDate_includeInSearch: {type:Boolean, default:false},
    modifiedDate_showInRegister: {type:Boolean, default:false},
    modifiedDate_showInPrint: {type:Boolean, default:false},
    modifiedDate_columnInExcel: {type:String, default:'AC'},
    modifiedDate_top: {type: Number, default: 10},
    modifiedDate_left: {type: Number, default: 10},
    modifiedDate_width: {type: Number, default: 100},
    modifiedDate_fontFamily: {type: String, default: 'Calibri'},
    modifiedDate_fontSize: {type: Number, default: 11},
    modifiedDate_fontWeight: {type: String, default: 'normal'},
    modifiedDate_fontStyle: {type: String, default: 'normal'},
    modifiedDate_textAlign: {type: String, default: 'left'},


    statusFlag_fieldType: {type:String, default:'text'},
    statusFlag_label: {type:String, default:'Status Flag'},
    statusFlag_isMandatory: {type:Boolean, default:false}, 
    statusFlag_showInSearch: {type:Boolean, default:true},
    statusFlag_includeInSearch: {type:Boolean, default:false},
    statusFlag_showInRegister: {type:Boolean, default:false},
    statusFlag_showInPrint: {type:Boolean, default:false},
    statusFlag_columnInExcel: {type:String, default:'AD'},
    statusFlag_top: {type: Number, default: 10},
    statusFlag_left: {type: Number, default: 10},
    statusFlag_width: {type: Number, default: 100},
    statusFlag_fontFamily: {type: String, default: 'Calibri'},
    statusFlag_fontSize: {type: Number, default: 11},
    statusFlag_fontWeight: {type: String, default: 'normal'},
    statusFlag_fontStyle: {type: String, default: 'normal'},
    statusFlag_textAlign: {type: String, default: 'left'},


    backoffice_fieldType: {type:String, default:'text'},
    backoffice_label: {type:String, default:'Backoffice'},
    backoffice_isMandatory: {type:Boolean, default:false}, 
    backoffice_showInSearch: {type:Boolean, default:false},
    backoffice_includeInSearch: {type:Boolean, default:false},
    backoffice_showInRegister: {type:Boolean, default:false},
    backoffice_showInPrint: {type:Boolean}, default:false,
    backoffice_columnInExcel: {type:String, default:'AE'},
    backoffice_top: {type: Number, default: 10},
    backoffice_left: {type: Number, default: 10},
    backoffice_width: {type: Number, default: 100},
    backoffice_fontFamily: {type: String, default: 'Calibri'},
    backoffice_fontSize: {type: Number, default: 11},
    backoffice_fontWeight: {type: String, default: 'normal'},
    backoffice_fontStyle: {type: String, default: 'normal'},
    backoffice_textAlign: {type: String, default: 'left'},


    comment1_fieldType: {type:String, default:'text'},
    comment1_label: {type:String, default:'Comment 1'},
    comment1_isMandatory: {type:Boolean, default:false}, 
    comment1_showInSearch: {type:Boolean, default:false},
    comment1_includeInSearch: {type:Boolean, default:false},
    comment1_showInRegister: {type:Boolean, default:false},
    comment1_showInPrint: {type:Boolean, default:false},
    comment1_columnInExcel: {type:String, default:'AF'},
    comment1_top: {type: Number, default: 10},
    comment1_left: {type: Number, default: 10},
    comment1_width: {type: Number, default: 100},
    comment1_fontFamily: {type: String, default: 'Calibri'},
    comment1_fontSize: {type: Number, default: 11},
    comment1_fontWeight: {type: String, default: 'normal'},
    comment1_fontStyle: {type: String, default: 'normal'},
    comment1_textAlign: {type: String, default: 'left'},

    comment2_fieldType: {type:String, default:'text'},
    comment2_label: {type:String, default:'Comment 2'},
    comment2_isMandatory: {type:Boolean, default:false}, 
    comment2_showInSearch: {type:Boolean, default:false},
    comment2_includeInSearch: {type:Boolean, default:false},
    comment2_showInRegister: {type:Boolean, default:false},
    comment2_showInPrint: {type:Boolean, default:false},
    comment2_columnInExcel: {type:String, default:'AG'},
    comment2_top: {type: Number, default: 10},
    comment2_left: {type: Number, default: 10},
    comment2_width: {type: Number, default: 100},
    comment2_fontFamily: {type: String, default: 'Calibri'},
    comment2_fontSize: {type: Number, default: 11},
    comment2_fontWeight: {type: String, default: 'normal'},
    comment2_fontStyle: {type: String, default: 'normal'},
    comment2_textAlign: {type: String, default: 'left'},
  
    comment3_fieldType: {type:String, default:'text'},
    comment3_label: {type:String, default:'Comment 3'},
    comment3_isMandatory: {type:Boolean, default:false}, 
    comment3_showInSearch: {type:Boolean, default:false},
    comment3_includeInSearch: {type:Boolean, default:false},
    comment3_showInRegister: {type:Boolean, default:false},
    comment3_showInPrint: {type:Boolean, default:false},
    comment3_columnInExcel: {type:String, default:'AH'},
    comment3_top: {type: Number, default: 10},
    comment3_left: {type: Number, default: 10},
    comment3_width: {type: Number, default: 100},
    comment3_fontFamily: {type: String, default: 'Calibri'},
    comment3_fontSize: {type: Number, default: 11},
    comment3_fontWeight: {type: String, default: 'normal'},
    comment3_fontStyle: {type: String, default: 'normal'},
    comment3_textAlign: {type: String, default: 'left'},

    comment4_fieldType: {type:String, default:'text'},
    comment4_label: {type:String, default:'Comment 4'},
    comment4_isMandatory: {type:Boolean, default:false}, 
    comment4_showInSearch: {type:Boolean, default:false},
    comment4_includeInSearch: {type:Boolean, default:false},
    comment4_showInRegister: {type:Boolean, default:false},
    comment4_showInPrint: {type:Boolean, default:false},
    comment4_columnInExcel: {type:String, default:'AI'},
    comment4_top: {type: Number, default: 10},
    comment4_left: {type: Number, default: 10},
    comment4_width: {type: Number, default: 100},
    comment4_fontFamily: {type: String, default: 'Calibri'},
    comment4_fontSize: {type: Number, default: 11},
    comment4_fontWeight: {type: String, default: 'normal'},
    comment4_fontStyle: {type: String, default: 'normal'},
    comment4_textAlign: {type: String, default: 'left'},

    comment5_fieldType: {type:String, default:'text'},
    comment5_label: {type:String, default:'Comment 5'},
    comment5_isMandatory: {type:Boolean, default:false}, 
    comment5_showInSearch: {type:Boolean, default:false},
    comment5_includeInSearch: {type:Boolean, default:false},
    comment5_showInRegister: {type:Boolean, default:false},
    comment5_showInPrint: {type:Boolean, default:false},
    comment5_columnInExcel: {type:String, default:'AJ'},
    comment5_top: {type: Number, default: 10},
    comment5_left: {type: Number, default: 10},
    comment5_width: {type: Number, default: 100},
    comment5_fontFamily: {type: String, default: 'Calibri'},
    comment5_fontSize: {type: Number, default: 11},
    comment5_fontWeight: {type: String, default: 'normal'},
    comment5_fontStyle: {type: String, default: 'normal'},
    comment5_textAlign: {type: String, default: 'left'},

    comment6_fieldType: {type:String, default:'text'},
    comment6_label: {type:String, default:'Comment 6'},
    comment6_isMandatory: {type:Boolean, default:false}, 
    comment6_showInSearch: {type:Boolean, default:false},
    comment6_includeInSearch: {type:Boolean, default:false},
    comment6_showInRegister: {type:Boolean, default:false},
    comment6_showInPrint: {type:Boolean, default:false},
    comment6_columnInExcel: {type:String, default:'AK'},
    comment6_top: {type: Number, default: 10},
    comment6_left: {type: Number, default: 10},
    comment6_width: {type: Number, default: 100},
    comment6_fontFamily: {type: String, default: 'Calibri'},
    comment6_fontSize: {type: Number, default: 11},
    comment6_fontWeight: {type: String, default: 'normal'},
    comment6_fontStyle: {type: String, default: 'normal'},
    comment6_textAlign: {type: String, default: 'left'},

    comment7_fieldType: {type:String, default:'text'},
    comment7_label: {type:String, default:'Comment 7'},
    comment7_isMandatory: {type:Boolean, default:false}, 
    comment7_showInSearch: {type:Boolean, default:false},
    comment7_includeInSearch: {type:Boolean, default:false},
    comment7_showInRegister: {type:Boolean, default:false},
    comment7_showInPrint: {type:Boolean, default:false},
    comment7_columnInExcel: {type:String, default:'AL'},
    comment7_top: {type: Number, default: 10},
    comment7_left: {type: Number, default: 10},
    comment7_width: {type: Number, default: 100},
    comment7_fontFamily: {type: String, default: 'Calibri'},
    comment7_fontSize: {type: Number, default: 11},
    comment7_fontWeight: {type: String, default: 'normal'},
    comment7_fontStyle: {type: String, default: 'normal'},
    comment7_textAlign: {type: String, default: 'left'},

    comment8_fieldType: {type:String, default:'text'},
    comment8_label: {type:String, default:'Comment 8'},
    comment8_isMandatory: {type:Boolean, default:false}, 
    comment8_showInSearch: {type:Boolean, default:false},
    comment8_includeInSearch: {type:Boolean, default:false},
    comment8_showInRegister: {type:Boolean, default:false},
    comment8_showInPrint: {type:Boolean, default:false},
    comment8_columnInExcel: {type:String, default:'AM'},
    comment8_top: {type: Number, default: 10},
    comment8_left: {type: Number, default: 10},
    comment8_width: {type: Number, default: 100},
    comment8_fontFamily: {type: String, default: 'Calibri'},
    comment8_fontSize: {type: Number, default: 11},
    comment8_fontWeight: {type: String, default: 'normal'},
    comment8_fontStyle: {type: String, default: 'normal'},
    comment8_textAlign: {type: String, default: 'left'},

    comment9_fieldType: {type:String, default:'text'},
    comment9_label: {type:String, default:'Comment 9'},
    comment9_isMandatory: {type:Boolean, default:false}, 
    comment9_showInSearch: {type:Boolean, default:false},
    comment9_includeInSearch: {type:Boolean, default:false},
    comment9_showInRegister: {type:Boolean, default:false},
    comment9_showInPrint: {type:Boolean, default:false},
    comment9_columnInExcel: {type:String, default:'AN'},
    comment9_top: {type: Number, default: 10},
    comment9_left: {type: Number, default: 10},
    comment9_width: {type: Number, default: 100},
    comment9_fontFamily: {type: String, default: 'Calibri'},
    comment9_fontSize: {type: Number, default: 11},
    comment9_fontWeight: {type: String, default: 'normal'},
    comment9_fontStyle: {type: String, default: 'normal'},
    comment9_textAlign: {type: String, default: 'left'},

    comment10_fieldType: {type:String, default:'text'},
    comment10_label: {type:String, default:'Comment 10'},
    comment10_isMandatory: {type:Boolean, default:false}, 
    comment10_showInSearch: {type:Boolean, default:false},
    comment10_includeInSearch: {type:Boolean, default:false},
    comment10_showInRegister: {type:Boolean, default:false},
    comment10_showInPrint: {type:Boolean, default:false},
    comment10_columnInExcel: {type:String, default:'AO'},
    comment10_top: {type: Number, default: 10},
    comment10_left: {type: Number, default: 10},
    comment10_width: {type: Number, default: 100},
    comment10_fontFamily: {type: String, default: 'Calibri'},
    comment10_fontSize: {type: Number, default: 11},
    comment10_fontWeight: {type: String, default: 'normal'},
    comment10_fontStyle: {type: String, default: 'normal'},
    comment10_textAlign: {type: String, default: 'left'},


});

module.exports = mongoose.model('Event', schema);