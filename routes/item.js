var express = require('express');
const router = express.Router();
var itemacces= require("../Models/itemAcces.js")

/* This route should be used for general item requests */

/*
*GET item by id here a json object from the DB should get returned. 
*/ 
router.get('/:id', function(req, res, next) {
    res.send('you requested item: '+req.params.id);
});
/*
*GET all items from DB. 
*/ 
router.get('/',async function(req, res, next) {
    const resource= await itemacces.getItems();
    console.log(resource)

    res.json(resource);
    


});
  
module.exports = router;