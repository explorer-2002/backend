const mongoose = require("mongoose");
const {Schema} = mongoose;

const CartSchema = new Schema({
    item:{
        type:String
    },
    quantity:{
        type:Number
    },

    pricePerItem:{
        type:Number
    },

    userEmail:{
        type:String
    }
   
})

module.exports = mongoose.model('cart',CartSchema);