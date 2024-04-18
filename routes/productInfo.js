var express = require('express');
const router = express.Router();
var itemacces= require("../Models/itemAccess.js")
var ProductInfoController = require("../Controllers/productInfoController.js");




router.get('/',async function(req, res, next) {
    const resource= await itemacces.getProductInfos();

    res.json(resource);
    


});

router.post('/catalog', async function(req,res,next){
    await ProductInfoController.postProductInfoCatalogue(req.body);
    res.status('201').send("The endpoint was called succesfully");
    

});

module.exports = router;