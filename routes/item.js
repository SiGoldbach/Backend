var express = require('express');
const router = express.Router();

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
router.get('/', function(req, res, next) {
    res.send('Should be method for getting all items.');
});
  
module.exports = router;