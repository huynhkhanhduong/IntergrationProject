const { MssqlConnection } = require("../config/database");
const sql = require('mssql')

const Filtering = async(department,date,shareholder,gender,type_of_work,ethnicity) => {
    try {
        if (!connection) {
            throw new Error("Database connection is not available.");
        }
        let results = await connection.query(
            `SELECT * FROM Users WHERE id = ` + id
        );
        return results;
    } catch (error) {
        console.error("Error creating user:", error);
    }
}

module.exports={
    Filtering
}
