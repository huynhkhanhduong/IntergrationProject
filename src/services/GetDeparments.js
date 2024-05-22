const { MssqlConnection } = require("../config/database");
const sql = require('mssql')

const GetDeparments = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(MssqlConnection);
        const result = await sql.query`SELECT DISTINCT DEPARTMENT FROM dbo.JOB_HISTORY`;
        return result.recordset
    } catch (err) {
        // Xử lý lỗi nếu có
        console.error(err);
        throw err;
    }
};


module.exports= {GetDeparments}
