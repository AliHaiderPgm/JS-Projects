showTask();
let title = document.getElementById('title');
let lctn = document.getElementById('location');
let txtArea = document.getElementById('txtArea');
let btn = document.getElementById('btn');
let time = document.getElementById('time');

// Swal success
function customSuccess(msg) {
    Swal.fire(
        'Sucess!',
        `${msg}`,
        'success'
    )
}
// Swal error
function customError(msg) {
    Swal.fire(
        'Error!',
        `${msg}`,
        'error'
    )
}
// Error msg from swal
function showError() {
    if (title.value == '' && lctn.value == '' && txtArea.value == '') {
        customError('All fields are required!')
        return
    }
    else if (title.value == '') {
        customError('Title is required!')
        return
    }
    else if (lctn.value == '') {
        customError('Location is required!')
        return
    }
    else if (txtArea.value == '') {
        customError('Description is required!')
        return
    }
}

// Get OBJ from local storage
function getData() {
    let Ltask = localStorage.getItem('tasks');
    if (Ltask == null) {
        taskObj = [];
    }
    else {
        taskObj = JSON.parse(Ltask)
    }
    return taskObj;
}

// Clear input values
function clrInput() {
    title.value = '';
    lctn.value = '';
    txtArea.value = '';
}


// JQuery table
$(document).ready(function () {
    $('#myTable').DataTable();
});


// Add Task
function addTask() {
    showError();
    if (title.value != '' && lctn.value != '' && txtArea.value != '') {
        getData();
        let task = {
            title: title.value,
            lctn: lctn.value,
            desc: txtArea.value,
        }
        taskObj.push(task);
        localStorage.setItem('tasks', JSON.stringify(taskObj))
        customSuccess('Task added successfully!');
        showTask();
        clrInput();
        // setTimeout(() => {
        //     location.reload();
        // }, 5000);
    }
}

// Show task
function showTask() {
    getData();
    let html = '';
    taskObj.forEach(function (element, index) {
        html += `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${element.title}</td>
                    <td>${element.lctn}</td>
                    <td>${element.desc}</td>
                    <td>
                        <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                            <button type="button" class="btn btn-primary" onclick="editTask(${index})"><i class="bi bi-pencil-square"></i></button>
                            <button type="button" class="btn btn-danger" onclick="delTask(${index})"><i class="bi bi-trash"></i></button>
                        </div>
                    </td>
                </tr>`
    });
    let tableData = document.getElementById('tableData');
    tableData.innerHTML = html;
}

// Delete tasks
function delTask(index) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            getData();
            taskObj.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(taskObj))
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
    showTask();

        }
    })

}

// Edit tasks
function editTask(index) {
    getData();
    title.value = taskObj[index].title;
    lctn.value = taskObj[index].lctn;
    txtArea.value = taskObj[index].desc;
    btn.innerText = 'Update Task';
    if (btn.innerText == 'Update Task') {
        btn.setAttribute('onclick', `updateTask(${index})`);
    }
}

// Update tasks
function updateTask(index) {
    showError();
    if (title.value != '' && lctn.value != '' && txtArea.value != '') {
        getData();
        let task1 = {
            title: title.value,
            lctn: lctn.value,
            desc: txtArea.value,
        }
        taskObj[index] = task1;
        localStorage.setItem('tasks', JSON.stringify(taskObj))
        customSuccess('Task updated successfully!');
        btn.innerText = 'Add Task';
        if (btn.innerText == 'Add Task') {
            btn.setAttribute('onclick', `addTask()`);
        }
        showTask();
        clrInput();
        // setTimeout(() => {
        //     location.reload();
        // }, 5000);
    }
}


// Time function
function newTime(){
    let now = new Date();
    let days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
    let nowDay = now.getDay();
    nowDay = days[nowDay];

    let nowHr = now.getHours();
    let amPm;
    if(nowHr >= 13){
        nowHr = nowHr - 12;
        amPm = 'pm'
    }
    else{
        amPm = 'am'
    }
    let nowMin = now.getMinutes();
    if(nowMin < 10){
        nowMin = '0'+nowMin;
    }
    else{
        nowMin = nowMin;
    }
    
    let nowSec = now.getSeconds();
    if(nowSec < 10){
        nowSec = '0'+nowSec;
    }
    else{
        nowSec = nowSec;
    }
    let nowTotal = `${nowDay}` + ' ' + `${nowHr}`  + ':' + `${nowMin}` + ':' + `${nowSec}` + ' ' + amPm;
    time.innerText = nowTotal;
}
setInterval(() => {
    newTime();
}, 1000);