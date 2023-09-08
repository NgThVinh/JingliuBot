const mysql = require('mysql');

class Database{
    constructor(host, user, password, database){
        this.pool = mysql.createPool({
            host: host,
            user: user,
            password: password,
            database: database,
            waitForConnections: true,
            connectionLimit: 10,
        })
    }

    getPool(){
        return this.pool;
    }
}

module.exports = {Database};