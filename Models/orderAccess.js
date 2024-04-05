const { Client } = require('pg');
const myPool = require("./dbPool");

var jsonbody = require("./test.json")
postOrder(jsonbody)

async function postOrder(body){
    //try{
        const order = require("./test.json")
        console.log(order)

        const orderInfo = order.OrderInfo
        const order_return = await myPool.query("INSERT INTO orders VALUES(DEFAULT, $1,$2,$3,$4,$5,DEFAULT,DEFAULT,$6) RETURNING order_id",[
            orderInfo.email,
            orderInfo.name,
            orderInfo.address,
            orderInfo.bill_address,
            orderInfo.tlf,
            orderInfo.comment
        ])
        console.log(typeof order_return)
        const order_id = order_return.rows[0]
        console.log("ID: ")
        console.log(order_id)
        for (let index = 0; index < order.OrderItems.length; index++) {
            const orderItem = order.OrderItems[index]
            const post = await myPool.query("INSERT INTO orderitems VALUES($1,$2,$3,$4,$5)",[
                order_id,
                orderItem.product_id,
                orderItem.quantity,
                orderItem.currency,
                orderItem.price
            ])

        }

    //} catch(err) {
    //    throw new Error(err);
    //}
}










