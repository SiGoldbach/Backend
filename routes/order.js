var express = require('express');
const router = express.Router();
var orderaccess= require("../Models/orderAccess");

//For now post will just return status 201 
router.post('/',async function(req,res,next){

    //For now until this endpoint is implemented to some extent it just waits 200 ms and returns succes. 

    res.status(501).send("Not implemented succesfully yet")
    //console.log(req.body);
    //First i am making a try catch to see if the signature matches 
    try{
        if(isNaN(parseFloat(req.order.price))){
            throw new Error("Price is not a number")
        }

        orderinfo={
            mail: req.order.mail,
            comment: req.order.comment,
            name: req.order.price,
            address: req.order.address,
            bill_address: req.order.bill_address,
            tlf: req.order.tlf
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
            await orderaccess.postOrder(order)
            res.status(201).end()

            

        }catch(err){
            res.status(404).send("Could not insert item into db: "+err.message)

        }

    }catch (err){
        console.log("Body does not uphold the DB standard")
        res.status(404).send("Body does not uphold the DB standard: "+err.message)

    }
});
router.post('/succes', async function(req,res,next){
    res.status(201).send("Succes THIS METHOD IS ONLY USED FOR TESTING frontend a new resource has not been created")

})
module.exports = router;

