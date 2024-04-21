import  myPool from "./dbPool.js";


export async function getItems(){
  try{
    const items= await myPool.query("SELECT * FROM products");
    return(items.rows)
  } catch (err){
    console.log("Error")
    return err;
  }
  



}
export async function getItem(id){
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

export async function postItem(body){
  try{
    console.log("INSERTING ITEM; ")
    const result = await myPool.query("INSERT INTO products VALUES(DEFAULT, $1,$2,$3,$4) RETURNING product_id",[body.name,body.description,body.price,body.currency])
    const insertedProductId = result.rows[0].product_id;
    return insertedProductId;

  }
  catch(err){
    throw new Error(err);

  }
}
export async function postDiscount(productId,rebateQuantity,rebatePercent){
  try{
    console.log("Inserting discount with: "+productId+" RebateQuantiy"+rebateQuantity+" rebatePercent: "+rebatePercent)
    const id = await myPool.query("INSERT INTO discount VALUES(DEFAULT, $1,$2,$3)",[productId,rebateQuantity,rebatePercent])
    return id;
  }
  catch(err){
    throw new Error(err);

  }

}
export async function postImageUrl(productId,imageUrl){
  try{
    const id = await myPool.query("INSERT INTO images VALUES($1,$2)",[productId,imageUrl])
    return id;
  }
  catch(err){
    throw new Error(err);

  }

}
export async function postUpsellId(productId,upsellID){
  try{
    const id = await myPool.query("INSERT INTO upsell VALUES($1,$2)",[productId,upsellID])
    return id;
  }
  catch(err){
    throw new Error(err);

  }

}

export async function getDiscounts(){
  try{
    const items= await myPool.query("SELECT * FROM discount");
    return(items.rows)
  } catch (err){
    console.log("Error")
    return err;
  }

}
export async function getProductInfos(){
  try{
    const items= await myPool.query("SELECT * FROM productInfos");
    return(items.rows)
  } catch (err){
    console.log("Error")
    return err;
  }

}







