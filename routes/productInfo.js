import express from 'express';
const router = express.Router();
import  {getProductInfos} from "../Models/itemAccess.js"
import {postProductInfoCatalogue} from "../Controllers/productInfoController.js";




router.get('/',async function(req, res, next) {
    const resource= await getProductInfos();

    res.json(resource);
    


});

router.post('/catalog', async function(req,res,next){
    await postProductInfoCatalogue(req.body);
    res.status('201').send("The endpoint was called succesfully");
    

});

export default router;