
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
        productInfoList
        product ={
            id:productInfoList[i].id,
            Name:productInfoList[i].name,
            price:productInfoList[i].price,
            currency:productInfoList[i].currency,
            rebateQuantity:productInfoList[i].rebateQuantity,
            rebatePercent:productInfoList[i].rebatePercent,
            upsellProductId:productInfoList[i].upsellProductId,
            imageUrl:productInfoList[i].imageUrl

        };
        productlist.push(product);
    
    }
    console.log(productInfoList.length);
}
module.exports = { getProductInfos,postProductInfoCatalogue};
