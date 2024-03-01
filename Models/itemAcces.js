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

    
  await client.end()
  return result;
}

module.exports = { getItems};




