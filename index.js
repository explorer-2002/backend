const express = require('express');
const app = express();

const port = 5012;

const mongoDB = require("./db")

const Product = require("./models/Products")

const User = require("./models/User")
const Cart = require("./models/Cart")

User.aggregate().lookup({ 
    from: 'Cart', 
    localField: 'email', foreignField: 'userEmail', 
    as: 'cart_data'
})

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const jwtSecret = "Myhajsedijfurhfjufhrjguvngutjrmf"; 

mongoDB()

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get("/products",(req,res)=>{
    console.log(global.products);
    res.send(global.products);
})

app.get("/products/:id",(req,res)=>{
    const id = request.params.id;

    res.send(global.products.find(item => Nunber(id) === Number(item.id)));
})

app.post("/products",(req,res) => {
    const {id, image, title, description, price} = req.body;

    try{
        Product.create({
            id,
            image,
            title,
            description,
            price
        })

        res.json({success:true})
    }

    catch(err){
        console.log(err);
        res.json({success:false})
    }
})

app.put("/products/:id",(req,res) => {
    const updations = req.body;

    try{
        Product.findOneAndUpdate({
            id:req.body.id
        }, updations)

        res.json({success:true})
    }

    catch(err){
        console.log(err);
        res.json({success:false})
    }
})

app.delete("/products/:id",(req,res) => {

    try{
        Product.deleteOne({
            id:req.body.id
        })

        res.json({success:true})
    }

    catch(err){
        console.log(err);
        res.json({success:false})
    }
})

app.get("/cart",(req,res) => {

})

app.post("/cart/:id",(req,res) => {
    
})

app.delete("/cart/:id",(req,res) => {
    
})

app.post("/login", async (req,res) => {

        let email = req.body.email;
    
        try{
            let userData = await User.findOne({email})

            if(!userData){
                return res.status(400).json({errors:"try logging with correct credentials"})
            }
    
            const data = {
                user:{
                    email:userData.email
                }
            }
    
            const authToken = jwt.sign(data,jwtSecret); 
    
           return res.json({success:true,authToken:authToken, role:userData.role, name:userData.name})
        }
    
        catch(err){
            console.log(err);
            res.json({success:false})
        }
    })

 app.post("/signup",async (req,res) => {
    
        console.log(req.body)

        try{
            await User.create({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
    
            res.json({success:true})
        }
    
        catch(err){
            console.log(err);
            res.json({success:false})
        }
    })
    

app.listen(port,() => {
    console.log(`App listening at port ${port}`);
})
