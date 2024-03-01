const { Client } = require('pg');

const client = new Client({
    user: 'sgoldbach',
    password: 'sgoldbach',
    host: 'localhost',
    port: '5432',
    database: 'webshop',
  });


function getItems(){
    let result= "NOTHING";
    client.connect()
    .then(() => {
        console.log("Connected to DB")

        var query = client.query('SELECT * FROM products', (err, result) => {
            if (err) {
              console.error('Error executing query', err);
            } else {
                // result=result.rows;
              console.log('Query result:', result.rows);
            }

        
          });

        query.on("row", function(row,result){
          result.addRow(row);
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




