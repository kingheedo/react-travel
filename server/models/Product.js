const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
            title: {
                type:String,
                maxWidth:50
            },
            description:{
                type: String,
            },
            price: {
                type: Number,
                default: 0
            },
            images: {
                type: Array,
                default: []
            },
            area: {
                type: Number,
                default: 1
            }
},{timestamps: true})



const Product = mongoose.model('User', productSchema);

module.exports = { Product }