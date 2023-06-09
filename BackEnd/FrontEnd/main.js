
let isCreate = true;

function show() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8081/employee",

        success: function (employees) {
            console.log(employees)
            let str = '';
            for (const employee of employees) {
                str += `
                 <tr>
                    <td>${employee.code}</td>
                    <td>${employee.nameEmployee}</td>
                    <td>${employee.age}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.branch.nameBranch}</td>
                    <td><button type="button" class="btn btn-primary"  onclick="showEdit(${employee.id})" data-toggle="modal" data-target="#myModal">Edit</button></td>
                    <td><button type="button" class="btn btn-warning"  onclick="showDelete(${employee.id})">Delete</button></td>
                 </tr>
                      `
            }

            document.getElementById("show").innerHTML = str;

        },
        error: function (err) {
            console.log(err)
        }
    })
    // event.preventDefault()

}

show();


function showBranch() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8081/employee/branches",

        success: function (branches) {

            let str = '';
            for (const branch of branches) {
                str += `
                    <option value="${branch.id}">${branch.nameBranch}</option>
                       `
            }

            document.getElementById("idBranch").innerHTML = str;

        },
        error: function (err) {
            console.log(err)
        }
    })
    // event.preventDefault()
}
showBranch()

function clearEdit() {
    showBranch()
    isCreate = true;
    document.getElementById("id").value = "";
    $("#code").val("");
    $("#nameEmployee").val("");
    $("#salary").val("");
    $("#age").val("");
    $("#idBranch").val("");
}

function create() {
    let employee = {
        "code": document.getElementById("code").value,
        "nameEmployee": $("#nameEmployee").val(),
        "age": $("#age").val(),
        "salary": $("#salary").val(),
        "branch": {
            "id": $("#idBranch").val(),
        }
    }

    if (!isCreate){
        employee.id = $("#id").val();
    }

    $.ajax({
        type: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8081/employee",
        data: JSON.stringify(employee),
        //xử lý khi thành công
        success: function () {
            alert("success!");
            show();
        },
        error: function (err) {
            alert("failed!")
            console.log(err)
        }
    })
}

function showEdit(id) {
    isCreate = false;
    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8081/employee/" + id,
        //xử lý khi thành công
        success: function (employee) {
            document.getElementById("id").value = employee.id;
            $("#code").val(employee.code);
            $("#nameEmployee").val(employee.nameEmployee);
            $("#age").val(employee.age);
            $("#salary").val(employee.salary);
            $("#idBranch").val(employee.branch.id);
        },
        error: function (err) {
            console.log(err)
        }
    })
}


function showDelete(id){
    if(confirm("Are you sure??")=== false){
        return
    }
    $.ajax({
        type: "DELETE",
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
        url: "http://localhost:8081/employee/" + id,
        data: JSON.stringify(id),

        success: function () {
            alert("Delete success!");
            show();
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function searchByName() {
    let search = $("#search").val()
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8081/employee/search?search=" + search,
        data: JSON.stringify(search),
        success: function (data) {
            console.log(data)
            let str = '';
            for (const employee of data) {
                str += `
                 <tr>
                    <td>${employee.code}</td>
                    <td>${employee.nameEmployee}</td>
                    <td>${employee.age}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.branch.nameBranch}</td>
                    <td><button type="button" class="btn btn-primary"  onclick="showEdit(${employee.id})" data-toggle="modal" data-target="#myModal">Edit</button></td>
                    <td><button type="button" class="btn btn-warning"  onclick="showDelete(${employee.id})">Delete</button></td>
                 </tr>
                      `
            }
            document.getElementById("show").innerHTML = str;

        },
        error: function (err) {
            console.log(err)
        }
    })
    event.preventDefault()
    // document.getElementById("search").value = "";
    $("#search").val("");
}

