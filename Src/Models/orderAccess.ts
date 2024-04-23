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
      try{
        await client.connect();
        await client.query('BEGIN');
        const order_id: number= (await client.query('INSERT INTO orders VALUES (DEFAULT,$1,$2,DEFAULT,DEFAULT,$3,$4,$5,$6) RETURNING order_id ',[order.email,order.tlf,order.name,order.adress,order.adress,order.comment])).rows[0].order_id;
        const userAlreadyExists: boolean = (await client.query('SELECT EXISTS (SELECT 1 FROM users WHERE email=$1)',[order.email])).rows[0].exists;
        if(userAlreadyExists){
          await client.query('UPDATE users SET marketing = $1 WHERE email = $2',[user.marketing,user.email])
        }else{
          await client.query('INSERT INTO users VALUES ($1,$2) ',[user.email,user.marketing])
        }
        await client.query('SELECT postOrderItems($1,$2,$3,$4,$5,$6)',[order_id,orderItems.productIds,orderItems.quantity,orderItems.price,orderItems.currency,orderItems.productIds.length]);
        await client.query('COMMIT');
        console.log("order has been commited");
      }catch(error: any){
        await client.query('ROLLBACK');
        console.error('Error in transaction rollback succesfull:', error.message);
      }finally{
        await client.end();

      }
}











