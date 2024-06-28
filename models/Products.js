const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProductSchema = new Schema({

    id:{
        type:Number,
        required:true,
        unique:true
    },

    image:{
        type:String,
        required:true
    },

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    price:{
        type:String,
        required:true
    },

})

module.exports = mongoose.model('products',ProductSchema);