
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
    
    for(let j=0;j<productInfoList.length;j++){
        console.log("Trying to insert item: "+j+" into DB");
        id = await itemacces.postItem(productInfoList[j]);
        console.log("Item: "+productlist[i].name+" has succesfully been added to the database");
        console.log("Trying to add discount and and image for product: "+ id+ " RebateQuantity: "+productlist[j].rebateQuantity,productlist[j].rebatePercent);
        if(productlist[j].rebateQuantity!==undefined || productlist[j].rebatePercent!==undefined){
            if(!(isNaN(productlist[j].rebateQuantity)) && !(isNaN(productlist[j].rebatePercent))){
                await itemacces.postDiscount(id,productlist[j].rebateQuantity,productlist[j].rebatePercent);
            }
        }
        await itemacces.postImageUrl(id,productlist[j].imageUrl);

        dict[productlist[j].product_id]=id;


        
        
    }
    console.log("Everything butt upsell seems to work");
    for(let i=0;i<productlist.length;i++){
        await itemacces.postUpsellId(dict[productlist[i].product_id],dict[productlist[i].upsellProductId]);
    }
    console.log("Everything looks like it works");
}


module.exports = { getProductInfos,postProductInfoCatalogue};
