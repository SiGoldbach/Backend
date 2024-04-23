import { CustomerInfo,OrderInformation,Order,OrderItems,User, Basket } from "../Routes/Types/Types.js"; 
import {postOrder} from "../Models/orderAccess.js"


export async function OrderPostcontroller(orderBody: any){
    const orderInformation: OrderInformation= orderBody;
    const customerInfo: CustomerInfo = orderInformation.customerInfo;
    const basket: Basket = orderInformation.basket;
    //Logging basket.BasketItems
    console.log("Logging basket.basketItems");
    console.log(basket.basketItems);
    const order: Order ={
        email: customerInfo.email,
        tlf: customerInfo.phoneNumber,
        proccesed: false,
        name: customerInfo.firstName+" "+customerInfo.lastName,
        adress: customerInfo.addressLine1+" "+customerInfo.addressLine2,
        billAdress: customerInfo.addressLine1+" "+customerInfo.addressLine2,
        comment: customerInfo.optionalComment
    }
    const user: User ={
        email: customerInfo.email,
        marketing: customerInfo.acceptMarketingEmail
    };
    const orderItems: OrderItems ={
        productIds: basket.basketItems.map((item)=>parseInt(item.product_id)),
        quantity : basket.basketItems.map((item)=>item.quantity),
        price: basket.basketItems.map((item)=>item.price),
        currency: basket.basketItems.map((item)=>item.currency)
        
    }
    await postOrder(order,orderItems,user);
    






}


