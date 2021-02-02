const express = require('express');
const router = express.Router();
// const { Product } = require("../models/Product");
var multer  = require('multer')
const { auth } = require("../middleware/auth");

//=================================
//             Product
//=================================
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})
 
var upload = multer({ storage: storage }).single("file")

router.post('/image',(req,res) =>{
    //가져온 이미지를 저장
    upload(req,res,err =>{
        if(err){
        return res.json({success:false, err})
    }
    return res.json({success:true, filePath: res.req.file.path, fileName: res.req.file.name})
    })
})

router.post('/product',(req,res) =>{
    
})
module.exports = router;
