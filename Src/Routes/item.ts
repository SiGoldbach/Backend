import express from 'express';
const router = express.Router();
import  {getItem, getItems,postItem} from"../Models/itemAccess.js";
import { Item } from './Types/Types.js';

/* This route should be used for general item requests */

/*
*GET item by id here a json object from the DB should get returned. 
*/ 
router.get('/:id', async function(req, res, next) {
    console.log("ID is: ", req.params.id)
    const idAsInteger: number = parseInt(req.params.id)
    
        const resource= await getItem(idAsInteger);
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
        const item: Item = {
            name: req.body.name,
            description: req.body.description,
            price: 10,
            currency: req.body.currency
        }
        console.log(item)
        //If this fails the client has sent an invalid body that does not meet the DB standard  
        try{
            await postItem(item.name,item.description,item.price,item.currency)
            res.status(201).end()

            

        }catch(err){
            res.status(404).send("Could not insert item into db: ")

        }

    }catch (err){
        console.log("Body does not uphold the DB standard")
        res.status(404).send("Body does not uphold the DB standard: ")

    }



});
  
export default router;