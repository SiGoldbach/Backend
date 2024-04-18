var express = require('express');
const router = express.Router();
var itemacces= require("../Models/itemAccess.js")




router.get('/',async function(req, res, next) {
    const resource= await itemacces.getProductInfos();

    res.json(resource);
    


});

router.post('/catalog', async function(req,res,next){
    

});

module.exports = router;