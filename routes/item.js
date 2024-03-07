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
  
module.exports = router;