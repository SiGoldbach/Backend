import {Order,OrderItems,User } from "../Routes/Types/Types.js"
import pkg from 'pg';
const { Client } = pkg;
import myPool from "./dbPool";
//postOrder(jsontest)


export async function postOrder(order: Order, orderItems: OrderItems,user: User){
    const client = new Client({
        user: 'sgoldbach',
        password: 'sgoldbach',
        host: 'localhost',
        port: 5432,
        database: 'webshop',
      });

    await client.connect();
    await client.query("SELECT * FROM submitOrder($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)", [
         order.email,
         order.name,
         order.adress,
         order.comment, 
         order.tlf, 
         order.comment, 
         false,
         user.marketing,
         orderItems.productIds, 
         orderItems.quantity, 
         orderItems.price,
         orderItems.currency,
         orderItems.currency.length]);
    await client.end();




}











