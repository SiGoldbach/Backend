import express from 'express';
const router = express.Router();
import  {getItem, getItems,postItem} from"../Models/itemAccess.js";

/* This route should be used for general item requests */

/*
*GET item by id here a json object from the DB should get returned. 
*/ 
router.get('/:id', async function(req, res, next) {
    console.log("ID is: ", req.params.id)
    
        const resource= await getItem(req.params.id);
        console.log(resource)
    
        res.json(resource);
    
    
    
    
});
/*
*GET all items from DB. 
*/ 
router.get('/',async function(req, res, next) {
    const resource= await getItems();
    console.log(resource)

    res.json(resource);
    


});

router.post('/',async function(req,res,next){
    //console.log(req.body);
    //First i am making a try catch to see if the signature matches 
    try{
        if(isNaN(parseFloat(req.body.price))){
            throw new Error("Price is not a number")
        }
        item={
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price),
            currency: req.body.currency
        }
        console.log(item)
        //If this fails the client has sent an invalid body that does not meet the DB standard  
        try{
            await postItem(item)
            res.status(201).end()

            

        }catch(err){
            res.status(404).send("Could not insert item into db: "+err.message)

        }

    }catch (err){
        console.log("Body does not uphold the DB standard")
        res.status(404).send("Body does not uphold the DB standard: "+err.message)

    }



});
  
export default router;