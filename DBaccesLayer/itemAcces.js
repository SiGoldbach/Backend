const { Client } = require('pg');

const client = new Client({
    user: 'username',
    password: 'password',
    host: 'host',
    port: 'port_number',
    database: 'database_name',
  });


function getItems{
    client.connect()
    .then(() => {
        console.log("Connected to DB")
    
        client.query('SELECT * FROM products', (err, result) => {
            if (err) {
              console.error('Error executing query', err);
            } else {
              console.log('Query result:', result.rows);
            }
          });
    
    }).catch((err) => {
        console.log("Error connecting to DB err: "+err)
    
    });
}  

