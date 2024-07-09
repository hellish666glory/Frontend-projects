const studentsList = [
    {name: 'Иван', surname: 'Иванович', lastname: 'Иванов', birthday: '2004-12-17', studyStart: 2020, faculty: 'Иностранных языков'},
    {name: 'Александр', surname: 'Александрович', lastname: 'Александров', birthday: '2003-05-13', studyStart: 2019, faculty: 'Компьютерных наук'},
    {name: 'Алексей', surname: 'Алексеевич', lastname: 'Алексеев', birthday: '2003-03-11', studyStart: 2022, faculty: 'Юриспруденции'},
    {name: 'Владимир', surname: 'Владимирович', lastname: 'Владимиров', birthday: '2003-09-22', studyStart: 2021, faculty: 'Международных отношений'},
    {name: 'Борис', surname: 'Борисович', lastname: 'Борисов', birthday: '2005-06-21', studyStart: 2023, faculty: 'Компьютерных наук'},
]

async function getStudentsList(){
    const response = await fetch('http://localhost:3000/api/students');
    const studentsArr = await response.json();
    return studentsArr;
}

async function fillDataFromArray(){
    studentsList.forEach(async (student) => {
        await fetch('http://localhost:3000/api/students',{
            method: 'POST',
            body: JSON.stringify({
                name: student.name,
                surname: student.surname,
                lastname: student.lastname,
                birthday: student.birthday,
                studyStart: student.studyStart,
                faculty: student.faculty,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    })
}



async function filterName(wordInput){
    const studentsArr = await getStudentsList();
    let filteredArr = [];
    for (let student of studentsArr) {
        let fio = student.lastname+' '+student.name+' '+student.surname; 
        if (fio.includes(wordInput)){
            filteredArr.push(student);
        }
    }
    return filteredArr
}

async function filterFaculty(facultyInput){
    const studentsArr = await getStudentsList();
    let filteredArr = [];
    for (let student of studentsArr) { 
        if (student.faculty === facultyInput){
            filteredArr.push(student);
        }
    }
    return filteredArr
}

async function filterBirth(birthInput){
    const studentsArr = await getStudentsList();
    let filteredArr = [];
    for (let student of studentsArr) { 
        if (student.birthday === birthInput){
            filteredArr.push(student);
        }
    }
    return filteredArr
}

async function filterStart(startInput){
    const studentsArr = await getStudentsList();
    let filteredArr = [];
    for (let student of studentsArr) { 
        if (student.studyStart == startInput){
            filteredArr.push(student);
        }
    }
    return filteredArr
}

const sortList = (studentsArr, prop, dir=false) => {
    let sortedArr = studentsArr.sort((a,b) => {
        let sortDir = a[prop]<b[prop]; 

        if(dir === true) sortDir = a[prop]>b[prop]; 

        if (sortDir === true) return -1;
    });
    return sortedArr;
}

document.addEventListener('DOMContentLoaded', async () => {
    await fillDataFromArray();
    const students = await getStudentsList();
    await renderStudentsTable(students);
    const datebirthInput = document.querySelector('.datebirth-input');
    datebirthInput.max = standartDate(new Date());
    const nameHead = document.querySelector('.name-head-cell');
    const facultyHead = document.querySelector('.faculty-head-cell');
    const birthDateHead = document.querySelector('.birth-head-cell');
    const startHead = document.querySelector('.start-head-cell');
    nameHead.addEventListener('click', () => {
        document.querySelector('.table-body').remove();
        renderStudentsTable(sortList(students, 'lastname', false))
    });
    facultyHead.addEventListener('click', () => {
        document.querySelector('.table-body').remove();
        renderStudentsTable(sortList(students, 'faculty', false))
    });
    birthDateHead.addEventListener('click', () => {
        document.querySelector('.table-body').remove();
        renderStudentsTable(sortList(students, 'birthday', true))
    });
    startHead.addEventListener('click', () => {
        document.querySelector('.table-body').remove();
        renderStudentsTable(sortList(students, 'studyStart', true))
    }); 
    const nameFilter = document.querySelector('.name-filter');
    const facultyFilter = document.querySelector('.faculty-filter');
    const birthFilter = document.querySelector('.birth-filter');
    const startFilter = document.querySelector('.start-filter'); 
    const filterBtn = document.querySelector('.cancel-filters');

    nameFilter.addEventListener('input', async () => {
        document.querySelector('.table-body').remove();
        renderStudentsTable(await filterName(nameFilter.value))
    });
    facultyFilter.addEventListener('input',async () => {
        document.querySelector('.table-body').remove();
        renderStudentsTable(await filterFaculty(facultyFilter.value))
    });
    birthFilter.addEventListener('input',async () => {
        document.querySelector('.table-body').remove();
        renderStudentsTable(await filterBirth(birthFilter.value))
    });
    startFilter.addEventListener('input',async () => {
        document.querySelector('.table-body').remove();
        renderStudentsTable(await filterStart(startFilter.value))
    });

    filterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.table-body').remove();
        renderStudentsTable(students);

        nameFilter.value = '';
        birthFilter.value = null;
        startFilter.value = '';
        facultyFilter.value = '';

    })

    const addStudentForm = document.querySelector('.add-student-form');

    addStudentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fullNameInput = document.querySelector('.full-name-input');
        const dateInput = document.querySelector('.datebirth-input');
        const startDateInput = document.querySelector('.start-date-input');
        const facultySelect = document.querySelector('.faculty-select');

        let splitedFullName = splitFullName(fullNameInput.value);
        const validationAlertBlock = document.querySelector('.alert-block');
        const validationAlert = document.createElement('span')
        validationAlert.classList.add('validation-alert')

        if (fullNameInput.value.trim().length === 0 || splitedFullName[0].name === undefined || splitedFullName[0].fathersName === undefined || splitedFullName[0].secondName === undefined){
            removeAlert();
            validationAlertBlock.append(validationAlert);
            validationAlert.textContent += ' Введите полное Ф.И.О.!'
            return
        }
        else if (dateInput.value === ''){
            removeAlert();
            validationAlertBlock.append(validationAlert);
            validationAlert.textContent += ' Введите дату!';
            return
        }
        else if (startDateInput.value === '' || startDateInput.value < 2000){
            removeAlert();
            validationAlertBlock.append(validationAlert);
            validationAlert.textContent += ' Введите год начала обучения (не раньше 2000-ого)!';
            return
        }
        else if (startDateInput.value >= new Date().getFullYear() && new Date().getMonth() < 8){
            removeAlert();
            validationAlertBlock.append(validationAlert);
            validationAlert.textContent += ' Этот учебный год еще не начался';
            return
        }
        else if (facultySelect.value === ''){
            removeAlert();
            validationAlertBlock.append(validationAlert);
            validationAlert.textContent += ' Выберите факультет!';
            return
        } else {
            removeAlert();
            document.querySelector('.table-body').remove();

            await fetch('http://localhost:3000/api/students',{
                method: 'POST',
                body: JSON.stringify({
                    name: splitedFullName[0].name,
                    surname: splitedFullName[0].fathersName,
                    lastname: splitedFullName[0].secondName,
                    birthday: dateInput.value,
                    studyStart: startDateInput.value,
                    faculty: facultySelect.value,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const studentsLocalList = await getStudentsList();

            fullNameInput.value = '';
            dateInput.value = null;
            startDateInput.value = '';
            facultySelect.value = '';

            renderStudentsTable(studentsLocalList);
        }
    });
});

function splitFullName(fullNameString){
    return fullNameString
        .split('\n') 
        .filter(fullName => fullName.trim().length > 0)
        .map(fullName => {
            const [secondName, name, fathersName] = fullName
            .split(' ')
            .filter(text => text.length > 0)
        return {
            secondName, 
            name,
            fathersName
        }
        })
}

function getAge(birth){
    let today = new Date();
    let birthDate = new Date(birth);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    if ([0, 5, 6, 7, 8, 9].indexOf(age%10) > -1 || [11, 12, 13, 14].indexOf(age) > -1){
        return age + ' лет'
    } else if (age%10 === 1){
        return age + ' год'
    } else {
        return age + ' года'
    }
}

function standartDate(date){
    let birthDate = new Date(date).getDate();
    let birthMonth = new Date(date).getMonth() + 1;
    let birthYear = new Date(date).getFullYear();

    if (birthMonth % 100 < 10 ) {
        birthMonth =  '0'+birthMonth.toString();
    }
    if (birthDate % 100 < 10) {
        birthDate = '0'+birthDate.toString();
    }
    return birthYear+'-'+birthMonth+'-'+birthDate
}

function correctBirthDate(birth){   
    let birthDate = new Date(birth).getDate();
    let birthMonth = new Date(birth).getMonth() + 1;
    let birthYear = new Date(birth).getFullYear();

    if (birthMonth % 100 < 10 ) {
        birthMonth =  '0'+birthMonth.toString();
    }
    if (birthDate % 100 < 10) {
        birthDate = '0'+birthDate.toString();
    }
    return birthDate+'.'+birthMonth+'.'+birthYear
}

function getCourse(startDate){
    let course = new Date().getFullYear() - startDate;
    let dateNow = new Date();
    if (course > 4 ||  (course === 4 && dateNow.getMonth() >= 8)){
        return 'закончил';
    } else {
        return course + ' курс';
    }
}

function getStudentItem(studentObj) {
    const studentRow = document.createElement('tr');
    studentRow.classList.add('student-row');
    const nameCell = studentRow.insertCell(0);
    nameCell.classList.add('name-cell', 'flex');
    const facultyCell = studentRow.insertCell(1);
    const birthCell = studentRow.insertCell(2);
    const startCell = studentRow.insertCell(3);
    const deleteIcon = document.createElement('img')
    deleteIcon.classList.add('delete-icon')
    deleteIcon.setAttribute('src', 'cross-svg-black.svg')

    deleteIcon.addEventListener('mouseover', () => {
        deleteIcon.src = 'cross-svg-red.svg'
    });
    deleteIcon.addEventListener('mouseout', () => {
        deleteIcon.src = 'cross-svg-black.svg'
    });
    deleteIcon.addEventListener('click', async () => {
        if (!confirm('Вы уверены?')){
            return
        }
        studentRow.remove();
        await fetch (`http://localhost:3000/api/students/${studentObj.id}`, {
            method: 'DELETE'
        });
    })

    let studentAge = getAge(studentObj.birthday);
    let course = getCourse(studentObj.studyStart);
    let birthDate = correctBirthDate(studentObj.birthday);


    const nameTextSpan = document.createElement('span');
    const nameText = document.createTextNode(`${studentObj.lastname} ` + `${studentObj.name} ` + `${studentObj.surname}`);
    nameTextSpan.classList.add('name-text');
    const birthText = document.createTextNode(`${birthDate}` + ` (${studentAge})`);
    const facultyText = document.createTextNode(`${studentObj.faculty}`);
    const startText = document.createTextNode(`${studentObj.studyStart}-${Number(studentObj.studyStart)+4} (${course})`)

    nameTextSpan.append(nameText);
    nameCell.append(deleteIcon);
    nameCell.append(nameTextSpan);
    facultyCell.append(facultyText);
    birthCell.append(birthText);
    startCell.append(startText);

    return studentRow;
}

function removeAlert() {
    let valid = document.querySelector('.validation-alert')
    if (valid !== null){
        valid.remove();
    } 
}

async function renderStudentsTable(studentsArray) {
    const tableBody = document.createElement('tbody');
    tableBody.classList.add('table-body');
    const table = document.querySelector('.students-table');
    table.append(tableBody);
    studentsArray.forEach((student) => {
        studentData = getStudentItem(student);
        tableBody.append(studentData);
    })
}
