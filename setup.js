const { Database } = require("./DB/Database")
const {db} = require("./config.json")
//
const conn = new Database(db.host, db.user, db.password, db.database);
//economy
const{Economy} =require("./utils/classes/Economy"); 
const economy = new Economy(conn.getPool());
// member
const{Member} =require("./utils/classes/Member");
const member = new Member(conn.getPool());
//
module.exports = {
    economy: economy,
    member: member
};