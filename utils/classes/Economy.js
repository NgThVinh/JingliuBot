class Economy{
    constructor(pool){
        this.pool = pool;
    }
    
    //get user cash and return it
    getMemberCash(userid){
        return new Promise((resolve, reject) => {
            this.pool.query(`SELECT Quantity FROM inventory WHERE MemberID =${userid} and ItemID='0001';`, (err, result) => {
                if(err) return reject(err);
                if (result.length === 0) {
                    resolve(null);
                } else {
                    resolve(result[0].Quantity);
                }
            });
        });
    }

    //add cash to user
    addMemberCash(userid, amount){
        return new Promise((resolve, reject) => {
            this.pool.query(`UPDATE inventory SET Quantity = Quantity + ${amount} WHERE MemberID = ${userid} and ItemID='0001';`, (err, result) => {
                if(err) return reject(err);
                resolve();
            });
        });
    }

    //remove cash from user
    removeMemberCash(userid, amount){
        return new Promise((resolve, reject) => {
            this.pool.query(`UPDATE inventory SET Quantity = Quantity - ${amount} WHERE MemberID = ${userid} and ItemID='0001';`, (err, result) => {
                if(err) return reject(err);
                resolve();
            });
        });
    }

    //set cash for user
    setMemberCash(userid, amount){
        return new Promise((resolve, reject) => {
            this.pool.query(`UPDATE inventory SET Quantity = ${amount} WHERE MemberID = ${userid} and ItemID='0001';`, (err, result) => {
                if(err) return reject(err);
                resolve();
            });
        });
    }
    //add a new user cash inventory
    insertMemberCash(userid){
        return new Promise((resolve, reject) => {
            this.pool.query(`INSERT INTO inventory (MemberID,ItemID,Quantity) VALUES (${userid},'0001',0);`, (err, result) => {
                if(err) return reject(err);
                resolve();
            });
        });
    }
    
}

module.exports = {Economy};




