//This is a pool good for doing standard queries DO NOT MAKE TRANSACTIONS WITH THIS
import pkg from "pg";
const { Pool } = pkg;
const myPool= new Pool({
    user: 'sgoldbach',
    password: 'sgoldbach',
    host: "webshop_db_db_1",
    port: 5432,
    database: 'webshop',
});

export default myPool;