
var itemacces= require("../Models/itemAccess.js")


async function getProductInfos(){

    const items =await itemacces.getItems();
    const discount = await itemacces.getDiscounts();
    const images = await itemacces.getImages();
    const upsell = await itemacces.getUpsell();



}

async function postProductInfoCatalogue(productInfoList){
    const productlist=[]
    for(let i=0;i<productInfoList.length;i++){
        product ={
            product_id:productInfoList[i].id,
            name:productInfoList[i].name,
            price:productInfoList[i].price,
            currency:productInfoList[i].currency,
            rebateQuantity:productInfoList[i].rebateQuantity,
            rebatePercent:productInfoList[i].rebatePercent,
            upsellProductId:productInfoList[i].upsellProductId,
            imageUrl:productInfoList[i].imageUrl,
            description: ""

        };
    }
        console.log(productInfoList.length);



        productlist.push(product);
        var dict = {};
    
    for(let i=0;i<productInfoList.length;i++){
        console.log("Trying to insert item: "+i+" into DB");
        id = await itemacces.postItem(productInfoList[i]);
        console.log("Item has succesfully been added to the database");
        console.log("Trying to add discount and and image for product: "+ id+ " RebateQuantity: "+productlist[i].rebateQuantity,productlist[i]);
        await itemacces.postDiscount(id,productlist[i].rebateQuantity,productlist[i].rebatePercent);
        await itemacces.postImageUrl(id,productlist[i].imageUrl);

        dict[productlist[i].product_id]=id;


        
        
    }
    console.log("Everything butt upsell seems to work");
    for(let i=0;i<productlist.length;i++){
        await itemacces.postUpsellId(dict[productlist[i].product_id],dict[productlist[i].upsellProductId]);
    }
    console.log("Everything looks like it works");
}


module.exports = { getProductInfos,postProductInfoCatalogue};
