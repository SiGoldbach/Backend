const { Client } = require('pg');

const client = new Client({
    user: 'username',
    password: 'password',
    host: 'host',
    port: 'port_number',
    database: 'database_name',
  });


function getItems(){
    let result= "NOTHING";
    client.connect()
    .then(() => {
        console.log("Connected to DB")
    
        client.query('SELECT * FROM products', (err, result) => {
            if (err) {
              console.error('Error executing query', err);
            } else {
                result=result.rows;
              console.log('Query result:', result.rows);
            }
          });

        client.end()
            .then(() => {
            console.log('Connection to PostgreSQL closed');
            })
            .catch((err) => {
            console.error('Error closing connection', err);
            });
    
    }).catch((err) => {
        console.log("Error connecting to DB err: "+err)
    
    });
    return result;
}

module.exports = { getItems};




