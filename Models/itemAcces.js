const { Client } = require('pg');

const client = new Client({
    user: 'sgoldbach',
    password: 'sgoldbach',
    host: 'localhost',
    port: '5432',
    database: 'webshop',
  });


async function getItems(){
  await client.connect()

  let result = client.query('SELECT * FROM products');

 
  console.log(await client.query('SELECT NOW()'))
   
  await client.end()
  return result;
}

module.exports = { getItems};




