const { Client } = require('pg');

const myPool = require("./dbPool");


async function getItems(){
  try{
    const items= await myPool.query("SELECT * FROM products");
    return(items.rows)
  } catch (err){
    console.log("Error")
    return err;
  }
  



}
async function getItem(id){
  try{
    const idAsNumber=parseInt(id)
    const items= await myPool.query("SELECT * FROM products WHERE product_id = $1",[idAsNumber]);
    return(items.rows)
  } catch (err){
    if (err instanceof TypeError){
      throw new TypeError();

    }
    console.log("Error")
    return err;
  } 
}

async function postItem(body){
  try{
    console.log("INSERTING ITEM; ")
    const id = await myPool.query("INSERT INTO products VALUES(DEFAULT, $1,$2,$3,$4)",[body.name,body.description,body.price,body.currency])
    return id;

  }
  catch(err){
    throw new Error(err);

  }
}
async function postDiscount(productId,rebateQuantity,rebatePercent){
  try{
    const id = await myPool.query("INSERT INTO discount VALUES(DEFAULT, $1,$2,$3)",[productId,rebateQuantity,rebatePercent])
    return id;
  }
  catch(err){
    throw new Error(err);

  }

}
async function postImageUrl(productId,imageUrl){
  try{
    const id = await myPool.query("INSERT INTO discount VALUES($1,$2)",[productId,imageUrl])
    return id;
  }
  catch(err){
    throw new Error(err);

  }

}
async function postUpsellId(productId,upsellID){
  try{
    const id = await myPool.query("INSERT INTO discount VALUES($1,$2)",[productId,upsellID])
    return id;
  }
  catch(err){
    throw new Error(err);

  }

}

async function getDiscounts(){
  try{
    const items= await myPool.query("SELECT * FROM discount");
    return(items.rows)
  } catch (err){
    console.log("Error")
    return err;
  }

}
async function getProductInfos(){
  try{
    const items= await myPool.query("SELECT * FROM productInfos");
    return(items.rows)
  } catch (err){
    console.log("Error")
    return err;
  }

}



module.exports = { getItems, getItem,postItem,getProductInfos,postDiscount,postImageUrl,postUpsellId};




