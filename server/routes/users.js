const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
const { Product } = require('../models/Product');

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/addToCart", auth, (req, res) => {

    // User에서 모든 정보 가져오기
    User.findOne({_id: req.user._id},
    (err,userInfo) => {
        let duplicate = false
        userInfo.cart.forEach(item => {
            if(item.id === req.body.productId){
                duplicate = true
            }
        })

            //카트에 내가 이미 상품을 추가했다면? -> 상품 개수 1 올리기
        if(duplicate) {
            User.findOneAndUpdate(
                {_id: req.user._id, "cart.id" : req.body.productId},
                {$inc: {"cart.$.quantity" : 1}},
                {new: true},
                (err,userInfo) => {
                    if(err) return res.status(400).json({success:false, err})
                    return res.status(200).send(userInfo.cart)
                }
                )
            }else{
                //카트에 상품이 이미 있지 않다면 필요한 상품정보
                // 상품 ID, 개수 1, 날짜 정보 다 넣어줘야 한다.
                User.findOneAndUpdate(
                {_id: req.user._id},
                {$push: {cart: {id: req.body.productId, quantity: 1, data: Date.now() }}},
                {new:true},
                (err, userInfo) => {
                    if(err) return res.status(400).json({success:false, err})
                    return res.status(200).send(userInfo.cart)
                }
            )
        }
    })
})
    

router.get('/removeFromCart', auth, (req,res) => {
    //먼저 cart 안에 내가 지우려고 한 상품을 지워주기
    User.findOneAndUpdate(
        {_id : req.user._id},
        {
            "$pull":
            {"cart" :{"id" : req.query.id}}
        },
        {new: true},
        (err, userInfo) => {
            let cart = userInfo.cart
            let array = cart.map(item => {
                return item.id
            })
             // Product collection에서 현재 남아있는 상품들의 정보를 가져오기

            // productIds = ['1234', '1243'] 이런 식으로 바꿔주기 
            Product.find({_id: {$in: array}})
            .populate('writer')
            .exec((err, productInfo) => {
                return res.status(200).json({
                    productInfo,
                    cart
                })
            })
        }
    )


});

module.exports = router;
