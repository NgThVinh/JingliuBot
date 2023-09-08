class Member{
    constructor(pool)
    {
        this.pool = pool;
    }

    //insert a new member
    insertMember(MemberID){
        return new Promise((resolve, reject) => {
            this.pool.query(`INSERT INTO member (MemberID)
            SELECT * FROM (SELECT ${MemberID} as MemberID) AS tmp
            WHERE NOT EXISTS (
                SELECT * FROM member WHERE MemberID = ${MemberID}
            ) LIMIT 1;`, (err, result) => {
                if(err) return reject(err);
                resolve();
            });
        });
    }

    //get member info
    getMember(MemberID){
        return new Promise((resolve, reject) => {
            this.pool.query(`SELECT * FROM member WHERE MemberID = ${MemberID};`, (err, result) => {
                if(err) return reject(err);
                if (result.length === 0) {
                    resolve(null);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }
}

module.exports = {Member};