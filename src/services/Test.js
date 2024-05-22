const { MssqlConnection } = require("../config/database");
const sql = require('mssql')

const GetDepartments = async () => {
    try {
        // Make sure that any items are correctly URL encoded in the connection string
        await sql.connect(MssqlConnection);
        const result = await sql.query`SELECT DISTINCT DEPARTMENT FROM dbo.JOB_HISTORY`;

        return { departments: result.recordset };
        
    } catch (err) {
        // Xử lý lỗi nếu có
        console.error(err);
        throw err;
    }
};



GetDepartments().then(data => {
    console.log(data);
}).catch(err => {
    console.error(err);
});


// module.exports= {GetDepartments}
