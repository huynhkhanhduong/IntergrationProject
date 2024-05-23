const { MssqlConnection } = require("../config/database");
const sql = require('mssql');
const { mergedData } = require("./CRUDServices");

const Filtering = async(req) => {
    try {
        // Lấy dữ liệu từ form
        // const GetAllData = await mergedData();
        // const department = req.body.department;
        // const date = req.body.date;
        // const shareholder = req.body.shareholder;
        // const gender = req.body.gender;
        // const type_of_work = req.body.type_of_work;
        // const ethnicity = req.body.ethnicity;

        const GetAllData = await mergedData();
        const department = "Finance Department";
        const date = "Paid To Date";
        const shareholder = 1;
        const gender = "Male";
        const type_of_work = 0;
        const ethnicity = "Kinh";

        // Tạo một biến để lưu kết quả lọc
        let filteredData = GetAllData;

        // Nếu ethnicity không được xác định
        if (ethnicity === '') {
            filteredData = filteredData.filter(item =>
                department === item.DEPARTMENT ||
                date === item['Paid To Date'] ||
                shareholder === item.SHAREHOLDER_STATUS ||
                gender === item.CURRENT_GENDER ||
                type_of_work === item.TYPE_OF_WORK
            );
        } else {
            // Nếu ethnicity được xác định
            filteredData = filteredData.filter(item =>
                ethnicity === item.ETHNICITY ||
                department === item.DEPARTMENT ||
                date === item['Paid To Date'] ||
                shareholder === item.SHAREHOLDER_STATUS ||
                gender === item.CURRENT_GENDER ||
                type_of_work === item.TYPE_OF_WORK
            );
        }

        return filteredData;
    } catch (error) {
        console.error("Error filtering data:", error);
        throw error;
    }
}


module.exports={
    Filtering
}
