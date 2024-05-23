
const sql = require('mssql');
const { MssqlConnection, MySQLConnection } = require('../config/database');

// const getAllUsers = async (req, res) => {
//     try {
//         if (!connection) {
//             throw new Error("Database connection is not available.");
//         }
//         let [results, fields] = await connection.query("select * from Users u");
//         return results;
//     } catch (error) {
//         console.error("Error creating user:", error);
//     }
// };

// const handleCreateUser = async ({ email, name, address }) => {
//     try {
//         if (!connection) {
//             throw new Error("Database connection is not available.");
//         }
//         await connection.query(
//             `INSERT INTO Users (email, name, City)
//             VALUES (?, ?, ?);`,
//             [email, name, address]
//         );
//     } catch (error) {
//         console.error("Error creating user:", error);
//     }
// };

// const getEditUser = async (id) => {
//     try {
//         if (!connection) {
//             throw new Error("Database connection is not available.");
//         }
//         let results = await connection.query(
//             `SELECT * FROM Users WHERE id = ` + id
//         );
//         return results;
//     } catch (error) {
//         console.error("Error creating user:", error);
//     }
// };

// const handleUpdateUser = async (updateUser) => {
//     try {
//         if (!connection) {
//             throw new Error("Database connection is not available.");
//         }
//         const query = `
//             UPDATE Users
//             SET name = ?, email = ?, City= ? 
//             WHERE id = ?`;
//         await connection.query(query, [
//             updateUser.name,
//             updateUser.email,
//             updateUser.address,
//             updateUser.id,
//         ]);
//     } catch (error) {
//         console.error("Error updating user:", error);
//     }
// };

// const getDeleteUser = async (id) => {
//     try {
//         if (!connection) {
//             throw new Error("Database connection is not available.");
//         }
//         await connection.query("DELETE FROM Users WHERE id = " + id);
//     } catch (error) {
//         console.error("Error creating user:", error);
//     }
// };


// module.exports = {
//     getAllUsers,
//     handleCreateUser,
//     getEditUser,
//     getDeleteUser,
//     handleUpdateUser,
// };



const GetDataPersonal = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(MssqlConnection);
        const result = await sql.query`SELECT * FROM PERSONAL`;
        return result.recordset
    } catch (err) {
        // Xử lý lỗi nếu có
        console.error(err);
        throw err;
    }
};
const GetEmployee  = async () => {
    try {
        // For pool initialization, see above
        let [results, fields] = await MySQLConnection.query("select * from employee ");
        return results;
      } catch (err) {
        console.log(err);
      }
};

const GetJobHistory = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(MssqlConnection);
        const result = await sql.query`SELECT * FROM JOB_HISTORY `;
        return result.recordset
    } catch (err) {
        // Xử lý lỗi nếu có
        console.error(err);
        throw err;
    }
};
const GetEmployment= async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(MssqlConnection);
        const result = await sql.query`SELECT EMPLOYMENT_ID,EMPLOYMENT_CODE,PERSONAL_ID FROM EMPLOYMENT `;
        return result.recordset
    } catch (err) {
        // Xử lý lỗi nếu có
        console.error(err);
        throw err;
    }
};

function mergeAllTables(personal, employment, jobHistory, employee) {
    const mergedData = [];

    for (const personalInfo of personal) {
        // Tìm thông tin employment từ bảng employment
        const employmentInfo = employment.find(emp => emp.PERSONAL_ID === personalInfo.PERSONAL_ID);
        if (!employmentInfo) continue; // Nếu không tìm thấy thông tin employment, bỏ qua

        // Tìm thông tin job history từ bảng job history
        const jobHistoryInfo = jobHistory.find(hist => hist.EMPLOYMENT_ID === employmentInfo.EMPLOYMENT_ID);
        if (!jobHistoryInfo) continue; // Nếu không tìm thấy thông tin job history, bỏ qua

        // Tìm thông tin nhân viên từ bảng employee
        const employeeInfo = employee.find(emp => emp['Employee Number'] === employmentInfo.EMPLOYMENT_CODE);
        if (!employeeInfo) continue; // Nếu không tìm thấy thông tin nhân viên, bỏ qua

        // Tạo một đối tượng mới chứa thông tin từ bốn bảng
        const mergedItem = {
            ...personalInfo, // Tránh lặp lại các thuộc tính từ personalInfo
            ...employmentInfo, // Tránh lặp lại các thuộc tính từ employmentInfo
            ...jobHistoryInfo, // Tránh lặp lại các thuộc tính từ jobHistoryInfo
            ...employeeInfo, // Tránh lặp lại các thuộc tính từ employeeInfo
        };

        // Thêm đối tượng đã tạo vào mảng mergedData
        mergedData.push(mergedItem);
    }

    // Trả về mảng mergedData chứa dữ liệu hợp nhất từ bốn bảng
    return mergedData;
}





// Sử dụng hàm mergeData để hợp nhất dữ liệu từ 4 bảng
const mergedData = async () => {
    const history = await GetJobHistory();
    const employee = await GetEmployee();
    const personal = await GetDataPersonal();
    const employment = await GetEmployment();
    return mergeAllTables(personal, employment, history, employee);
}

// In ra kết quả
// console.log(mergedData());


mergedData().then(result => {
    console.log(result);
}).catch(error => {
    console.error(error);
});
module.exports= {
    mergedData
}