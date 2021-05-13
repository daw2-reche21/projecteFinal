const mysql = require ('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'bikelive_v1'
}
const pool = mysql.createPool(config);
module.exports = pool;