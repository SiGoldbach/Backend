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
        const userAlreadyExists: boolean = (await client.query('SELECT EXISTS (SELECT 1 FROM orders WHERE email=$1',[order.email])).rows[0].exists;
        if(userAlreadyExists){
          await client.query('UPDATE users SET marketing = $1 WHERE email = $2',[user.marketing,user.email])
        }else{
          await client.query('INSERT INTO users VALUES($1,$2) ',[order.email])
        }
        await client.query('COMMIT');
      }catch(error: any){
        await client.query('ROLLBACK');
        console.error('Error:', error.message);
      }finally{
        await client.end();

      }
}











