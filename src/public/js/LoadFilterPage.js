let department;
let date;
let shareholder;
let gender;
let type_of_work;
let ethnicity;

const inputData = () => {
    department = document.querySelector('#Department').innerText;
    date = document.querySelector('#date').innerText;
    shareholder = document.querySelector('#shareholder').innerText;
    gender = document.querySelector('#gender').innerText;
    type_of_work = document.querySelector('#type_of_work').innerText;
    ethnicity = document.querySelector('#ethnicity').value;
}

// const pre_process_data = () => {
//     if (choice_value == 'Shareholder') {
//         choice_value = 1;
//     }
//     if (choice_value == 'Non-shareholder') {
//         choice_value = 0;
//     }
//     if (choice_value == 'Full-time') {
//         choice_value = 1;
//     }
//     if (choice_value == 'Part-time') {
//         choice_value = 0;
//     }

//     if (choice == 'Shareholder') {
//         choice = 'SHAREHOLDER_STATUS'
//     } else if (choice == 'Gender') {
//         choice = 'CURRENT_GENDER'
//     } else if (choice == 'Employee Status') {
//         choice = 'TYPE_OF_WORK'
//     } else if (choice == 'Ethnicity') {
//         choice = 'ETHNICITY'
//     }
// }



const getData = async () => {
    inputData();

    const formData = new URLSearchParams({
        'department': department,
        'year': date,
        'shareholder': shareholder,
        'gender': gender,
        'type_of_work': type_of_work,
        'ethnicity': ethnicity
    });
    const url = 'http://localhost:8080/api/filtering';
    const urlWithParams = `${url}?${formData.toString()}`;

    try {
        const response = await fetch(urlWithParams);
        if (!response.ok) {
            throw new Error('Network fail');
        }
        const data = await response.json();
        renderEarningtable(data);
    } catch (error) {
        console.error('There was some problems', error);
    }
}

const renderEarningtable = (dataTable) => {
    const tabledata = document.querySelector('.dataTable');
    tabledata.innerHTML = '';
    // if (dataTable.result.length === 0) {
    //     tabledata.innerHTML = `
    //     <tr>
    //         <td>None</td>
    //         <th>None</th>
    //         <th>None</th>
    //         <th>None</th>
    //         <th>None</th>
    //         <th>None</th>
    //         <th>None</th>
    //     </tr>`;
    // } else {
        
        dataTable.data.forEach((data_Item) => {
            // const { CURRENT_FIRST_NAME, CURRENT_PERSONAL_EMAIL, CURRENT_PHONE_NUMBER, BIRTH_DATE, CURRENT_GENDER, CURRENT_ADDRESS_1, ETHNICITY } = data_Item;
            const name = data_Item.CURRENT_FIRST_NAME;
            const email = data_Item.CURRENT_PERSONAL_EMAIL;
            const phoneNumber = data_Item.CURRENT_PHONE_NUMBER;
            const birthdate = data_Item.BIRTH_DATE;
            const gender = data_Item.CURRENT_GENDER;
            const address = data_Item.CURRENT_ADDRESS_1;
            const ethnicity = data_Item.ETHNICITY;
            tabledata.innerHTML += `
            
        <tr>
            <td>${name}</td>
            <td>${email}</td>
            <td>${phoneNumber}</td>
            <td>${birthdate}</td>
            <td>${gender}</td>
            <td>${address}</td>
            <td>${ethnicity}</td>
        </tr>`;
        });
    // }
}