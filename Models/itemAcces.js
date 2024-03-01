const { Client } = require('pg');

const dbconfig = new Client({
    user: 'sgoldbach',
    password: 'sgoldbach',
    host: 'localhost',
    port: '5432',
    database: 'webshop',
  });


function getItems(){
  let resource;

  const client = new Client(dbconfig);

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');

    // Execute SQL queries here

    client.query('SELECT * FROM employees', (err, result) => {
      if (err) {
        console.error('Error executing query', err);
      } else {
        resource= result.rows;
        console.log('Query result:', result.rows);
      }

      // Close the connection when done
      client.end()
        .then(() => {
          console.log('Connection to PostgreSQL closed');
        })
        .catch((err) => {
          console.error('Error closing connection', err);
        });
    });
  })
  .catch((err) => {
    
    console.error('Error connecting to PostgreSQL database', err);
  });

}

module.exports = { getItems};




