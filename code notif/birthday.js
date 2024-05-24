const Table = require('cli-table');
const moment = require('moment');


const Birthdaynotif = documentt.getElementById('Birthday');

//bỏ các nhân viên ở trong database vào mảng này
const employees = [
    { 
        name:  data_Item.CURRENT_FIRST_NAME + data_Item.CURRENT_MIDDLE_NAME + data_Item.CURRENT_LAST_NAME, 
        email: data_Item.CURRENT_PERSONAL_EMAIL,
        gender: data_Item.CURRENT_GENDER,
        phone: data_Item.CURRENT_PHONE_NUMBER,
        birthday: data_Item.BIRTH_DATE
    }
];


function checkBirthdaysAndNotify() {
    //tạo bảng
    const birthdayTable = new Table({
        head: ['Name', 'Email', 'Gender', 'Phone', 'Birthday']
    });

    const currentMonth = moment().month(); // Current month (0-11)

    //đếm và lưu các nhân viên có sinh nhật trong tháng
    let count = 0;
    employees.forEach(employee => {
        const employeeBirthday = moment(employee.birthday, 'DD-MM-YYYY');
        if (employeeBirthday.month() === currentMonth) {
            birthdayTable.push([employee.name, employee.email, employee.gender, employee.phone, employeeBirthday.format('DD-MM-YYYY')]);
            count++;
        }
    });

    //thông báo có bao nhiêu nhân viên nghỉ quá nhiều
    Birthdaynotif = `Birthday this month: ` + count;

    //in ra bảng
    if (birthdayTable.length > 0) {
        console.log('Employees with birthdays in the current month:');
        console.log(birthdayTable.toString());
    } else {
        console.log('No employees have birthdays in the current month.');
    }
}