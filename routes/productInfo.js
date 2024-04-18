var express = require('express');
const router = express.Router();
var itemacces= require("../Models/itemAccess.js")
var ProductInfoController = require("../Controllers/productInfoController.js");




router.get('/',async function(req, res, next) {
    const resource= await itemacces.getProductInfos();

    res.json(resource);
    


});

router.post('/catalog', async function(req,res,next){
    ProductInfoController.postProductInfoCatalogue(req.body);
    

});

module.exports = router;