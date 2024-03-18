var express = require('express');
const router = express.Router();
var itemacces= require("../Models/itemAcces.js")




router.get('/',async function(req, res, next) {
    const resource= await itemacces.getProductInfos();

    res.json(resource);
    


});

module.exports = router;