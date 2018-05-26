var express = require('express');
var router = express.Router();

router.post('/barcode', (req,res)=>{
    console.log('inserted barcode');
    console.log(req.body.barcode);
    res.send({status:'ok'});
});

module.exports=router;