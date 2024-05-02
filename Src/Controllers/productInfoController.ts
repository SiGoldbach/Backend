import {postItem,postImageUrl,postDiscount,postUpsellId} from "../Models/itemAccess.js";
import { ProductInfo,DictionaryelementStringNumber } from "../Routes/Types/Types.js";

export async function postProductInfoCatalogue(productInfoList: any){
    const productlist: ProductInfo[]=[]
    for(let i=0;i<productInfoList.length;i++){
        console.log(i);
        const product: ProductInfo ={
            product_id: productInfoList[i].id,
            name: productInfoList[i].name,
            price: productInfoList[i].price,
            currency: productInfoList[i].currency,
            discount_amount: productInfoList[i].rebateQuantity,
            discount_percent: productInfoList[i].rebatePercent,
            upsellProductId: productInfoList[i].upsellProductId,
            image_url: productInfoList[i].imageUrl
        }
        productlist.push(product);

        };
    
        console.log(productlist.length);



        var dict: DictionaryelementStringNumber[]= [];
    
    for(let j=0;j<productlist.length;j++){
        console.log("Trying to insert item: "+j+" into DB");
        const id = await postItem(productlist[j].name,"",productInfoList[j].price,productInfoList[j].currency);
        console.log("Item: "+productlist[j].name+" has succesfully been added to the database");
        console.log("Trying to add discount and and image for product: "+ id+ " RebateQuantity: "+productlist[j].discount_amount,productlist[j].discount_percent);
            if(productlist[j].discount_amount!==null && productlist[j].discount_percent!== null){
                await postDiscount(id,productlist[j].discount_amount as number,productlist[j].discount_percent as number);
            }
        
        await postImageUrl(id,productlist[j].image_url);

        const dictItem: DictionaryelementStringNumber={
            name: productlist[j].product_id,
            id: id

        };
        dict.push(dictItem);        
    }
    console.log("Everything butt upsell seems to work");
    for(let i=0;i<productlist.length;i++){
        if(productlist[i].upsellProductId!==null){
            const baseId: number= dict.filter((item)=>productlist[i].name===item.name)[0].id;
            const upsselId: number= dict.filter((item)=>productlist[i].upsellProductId===item.name)[0].id;
            await postUpsellId(baseId,upsselId);
        }
    }
    console.log("Everything looks like it works");
}