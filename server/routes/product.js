const express = require('express');
const router = express.Router();
// const { Product } = require("../models/Product");
var multer  = require('multer')
const { auth } = require("../middleware/auth");
const { Product } = require('../models/Product');

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

router.post('/',(req,res) =>{
    const product = new Product(req.body);

    product.save((err) => {
      if(err) return res.status(400).json({success:false, err})
      return res.status(200).json({success:true})
    })
})

router.post('/products',(req,res) =>{

  let limit = req.body.limit ? parseInt(req.body.limit) : 50
  let skip = req.body.skip ? parseInt(req.body.skip) : 0
  let term = req.body.searchTerm

  let findArgs = {};

  for (let key in req.body.filters){
    if(req.body.filters[key].length > 0){

    if(key === 'price'){
      findArgs[key] = {
        // Greater than equal
        $gte: req.body.filters[key][0],
        // less than equal
        $lte: req.body.filters[key][1]
      }
    }else{
    findArgs[key] = req.body.filters[key];
    }

    }
  }
  console.log('findArgs', findArgs)

  if(term){
      Product.find(findArgs)
      .find({$text:{$search: term}})
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productsInfo) => {
        if (err) return res.status(400).json({success: false, err})
        return res.status(200).json({success: true, productsInfo, postSize: productsInfo.length})
  })
  }else{
    Product.find(findArgs)
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err, productsInfo) => {
      if (err) return res.status(400).json({success: false, err})
      return res.status(200).json({success: true, productsInfo, postSize: productsInfo.length})
    })
  }

  
})


router.get('/products_by_id',(req,res) =>{
    let type = req.query.type
    let productId = req.query.id


    Product.find({_id: productId})
    .populate('writer')
    .exec((err, product) => {
      if(err) return res.status(400).json({success: false ,err})
      return res.status(200).json({success: true, product})
    })
})
module.exports = router;
