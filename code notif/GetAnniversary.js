const schedule = require('node-schedule');
const { MssqlConnection } = require("../config/database");
const sql = require('mssql');
const moment = require('moment');

// Dữ liệu của nhân viên
const employees  = results.map(row => ({
    name: data_Item.CURRENT_FIRST_NAME + data_Item.CURRENT_MIDDLE_NAME + data_Item.CURRENT_LAST_NAME,
    hireDate: data_Item.CURRENT_HIRE_DATE
  }));

// Hàm kiểm tra kỷ niệm trong cùng tháng
function checkAnniversaries() {
  const currentMonth = moment().month();
  
  employees.forEach(employee => {
    const hireDate = moment(employee.hireDate);
    const hireMonth = hireDate.month();
    
    
    if (hireMonth === currentMonth) {
      console.log(`Cảnh báo: Kỷ niệm tuyển dụng của ${employee.name} là trong tháng này.`);
    }
  });
}

// Lên lịch công việc chạy hàng ngày vào lúc nửa đêm
const job = schedule.scheduleJob('0 0 * * *', function() {
  checkAnniversaries();
});

console.log('Hệ thống cảnh báo kỷ niệm tuyển dụng đang chạy...');