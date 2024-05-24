const Table = require('cli-table');

const Dayoffnotif = documentt.getElementById('Day-off');

//bỏ các nhân viên ở trong database vào mảng này
const employees = [
    { 
        name:  data_Item.CURRENT_FIRST_NAME + data_Item.CURRENT_MIDDLE_NAME + data_Item.CURRENT_LAST_NAME, 
        email: data_Item.CURRENT_PERSONAL_EMAIL,
        gender: data_Item.CURRENT_GENDER,
        phone: data_Item.CURRENT_PHONE_NUMBER,
        vacationDays: data_Item.Vacation Days 
    }
];

// Notification threshold
const VACATION_DAYS_THRESHOLD = 10;

function checkVacationDaysAndNotify() {
    //tạo bảng
    const detailedTable = new Table({
        head: ['Name', 'Email', 'Gender', 'Phone number', 'Over Day-off']
    });

    //đếm và lưu thông tin nhân viên nghỉ quá nhiều vào detailedTable
    let count = 0;
    
    employees.forEach(employee => {
        if (employee.vacationDays > VACATION_DAYS_THRESHOLD) {
            detailedTable.push([employee.name, employee.email, employee.gender, employee.phone, (VACATION_DAYS_THRESHOLD - employee.vacationDays)]);
            count++;
        }
    });

    //thông báo có bao nhiêu nhân viên nghỉ quá nhiều
    Dayoffnotif = `More than ${VACATION_DAYS_THRESHOLD} days vacation: ` + count;

    //in chi tiết nhân viên
    if (detailedTable.length > 0) {
        console.log('There are ' + count + ' employees has accumulated more than 10 days of vacation');
        console.log(detailedTable.toString());
    }

}
