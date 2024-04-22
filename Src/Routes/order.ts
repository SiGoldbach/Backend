import express from 'express';
const router = express.Router();
import {OrderPostcontroller} from "../Controllers/orderController.js";


//For now post will just return status 201 
router.post('/',async function(req,res,next){
    console.log(req.body);

    OrderPostcontroller(req.body);



 
});
router.post('/succes', async function(req,res,next){
    res.status(201).send("Succes THIS METHOD IS ONLY USED FOR TESTING frontend a new resource has not been created")

})
export default router;
