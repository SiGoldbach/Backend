var express = require('express');
const router = express.Router();
var itemacces= require("../Models/itemAcces.js")

/* This route should be used for general item requests */

/*
*GET item by id here a json object from the DB should get returned. 
*/ 
router.get('/:id', async function(req, res, next) {
    console.log("ID is: ", req.params.id)
    
        const resource= await itemacces.getItem(req.params.id);
        console.log(resource)
    
        res.json(resource);
    
    
    
    
});
/*
*GET all items from DB. 
*/ 
router.get('/',async function(req, res, next) {
    const resource= await itemacces.getItems();
    console.log(resource)

    res.json(resource);
    


});

router.post('/',async function(req,res,next){
    console.log(req.body);
    //First i am making a try catch to see if the signature matches 
    try{
        item={
            name: req.body.name,
            description: req.body.description,
            weight: parseFloat(req.body.weight),
            price: parseFloat(req.body.weight),
            currency: req.body.currency
        }
        //If this fails the client has sent a bad body 
        try{

        }catch{
            
        }

    }catch (err){
        res.status(404).end()

    }



});
  
module.exports = router;