var express = require('express');
const router = express.Router();
var orderaccess= require("../Models/orderAcces.js")


router.post('/',async function(req,res,next){
    //console.log(req.body);
    //First i am making a try catch to see if the signature matches 
    try{
        if(isNaN(parseFloat(req.order.price))){
            throw new Error("Price is not a number")
        }

        orderinfo={
            mail: req.order.main,
            comment: req.order.comment,
            name: req.order.price,
            address: req.order.address,
            bill_address: req.order.bill_address,
            processed: req.order.processed,
            tlf: req.order.tlf,
            date: req.order.date
        }

        orderitems={
            product_id: req.order.product_id,
            quantity: req.order.quantity,
            price: parseFloat(req.order.price),
            currency: req.order.currency
        }

        order={
            orderinfo,
            orderitem
        }



        console.log(order)
        //If this fails the client has sent an invalid body that does not meet the DB standard  
        try{
            await itemacces.postOrder(order)
            res.status(201).end()

            

        }catch(err){
            res.status(404).send("Could not insert item into db: "+err.message)

        }

    }catch (err){
        console.log("Body does not uphold the DB standard")
        res.status(404).send("Body does not uphold the DB standard: "+err.message)

    }



});














