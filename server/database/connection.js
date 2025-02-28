const mysql2 = require("mysql2");
require('dotenv').config();

let connectionParams;
const useLocalhost = process.env.USE_LOCALHOST === 'true';

if (useLocalhost) {
    console.log("Inside local");
    connectionParams = {
        user: "root",
        host: "localhost",
        password: "",
        database: "e_commerce",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };
} else {
    connectionParams = {
        user: process.env.DB_SERVER_USER,
        host: process.env.DB_SERVER_HOST,
        password: process.env.DB_SERVER_PASSWORD,
        database: process.env.DB_SERVER_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };
}

const pool = mysql2.createPool(connectionParams);

// ทดสอบการเชื่อมต่อ
pool.getConnection((err, connection) => {
    if (err) console.log("DB Connection Error:", err.message);
    else {
        console.log("DB Connection Done");
        connection.release(); // ปล่อย connection กลับ pool
    }
});

module.exports = pool;
