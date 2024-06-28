const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://sam:sanyam123@cluster0.s6q4gpa.mongodb.net/ecommerce?retryWrites=true&w=majority";


const mongoDB = () => {
    mongoose.connect(mongoURI)
        .then(() => {
            console.log("connected");
            console.log(mongoose.connection.readyState);
            const fetched_data = mongoose.connection.collection("products").find({})
                                            .toArray().then(result => global.products = result)
            ;

        })
        .catch(err => console.log(err))
    }

module.exports = mongoDB;