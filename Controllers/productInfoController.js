
var itemacces= require("../Models/itemAcces.js")


async function getProductInfos(){

    const items =await itemacces.getItems();
    const discount = await itemacces.getDiscounts();
    const images = await itemacces.getImages();
    const upsell = await itemacces.getUpsell();



}