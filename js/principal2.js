document.getElementById("dateNewTask").valueAsDate = new Date();

let newTask = document.querySelector(".newTaskDescription");
let addTaskBtn = document.querySelector("#addNewTask");
let toDoUl = document.querySelector(".conjuntoItens");
let dateTask = document.querySelector("#dateNewTask");
let deleteBtn = document.querySelectorAll(".delete");
let editBtn = document.querySelectorAll(".edit");
let  editField = document.querySelectorAll(".TaskNameEdit");

let createNewTask = function(task, inputDate,id) {
    let listItem = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    let date = document.createElement("input");
    let editButton = document.createElement("button");
    let editInput = document.createElement("input");
    let editDate = document.createElement("input");
    let deleteButton = document.createElement("button");
    let idItem = document.createElement("input");

    deleteButton.addEventListener('click', deleteTaskAjax);

    label.innerText = task;
    label.className = "taskName";
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.className = "edit";
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.className = "delete iconDelete";
    editInput.type = "text";
    editInput.className = "TaskNameEdit";
    // editInput.style.display = "none";
    checkBox.type = "checkbox";
    checkBox.className = "checkbox";
    date.type = "date";
    date.className = "taskDate";
    date.value = inputDate;
    date.readOnly = 'true';
    editDate.type = "date";
    editDate.className = "dataInputEdit";
    editDate.id = "newDate";
    editDate.style.display = "none";
    idItem.type = "hidden";
    idItem.value = id;

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(date);
    listItem.appendChild(editDate);
    listItem.appendChild(idItem);

    return listItem;
};

let addTaskAjax = function() {
    let task = { nome: newTask.value, data: dateTask.valueAsDate };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/todo/tarefas-criar-post-json.php');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {

            let resultado =  JSON.parse(xhr.responseText);
            let d = new Date(resultado['data']);
            let year = d.getFullYear();
            let month = d.getMonth()+1;
            let dt = d.getDate();

            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }

            let dataFormatada = year +'-' + month + '-'+ dt;
            let itemnovo = createNewTask(resultado['descricao'], dataFormatada, resultado['id']);

            toDoUl.appendChild(itemnovo);
            newTask.value = "";
            document.getElementById("dateNewTask").valueAsDate = new Date();
        }
    };

    xhr.send(JSON.stringify(task));
};

let editTaskAjax = function() {
    console.log("Realizando requisição para o PHP - editar");

    let listItem = this.parentNode;
    let editInput = listItem.querySelector(".TaskNameEdit");
    let editDate = listItem.querySelector("#newDate");
    let checkboxStatus = listItem.querySelector("input[type=checkbox");
    let tarefaId = listItem.querySelector("input[type=hidden]").value; //mudar pra esse nome em deletar tbm
    let statusTarefa;
    let label = listItem.querySelector("label");
    let date = listItem.querySelector(".taskDate");
    // date.readOnly = 'false';

    if (checkboxStatus.checked === false){
        statusTarefa = 0;
    } else {
        statusTarefa = 1;
    }

    let task = { nome: editInput.value, data: editDate.valueAsDate, status: statusTarefa, id: tarefaId};

    if (editInput.style.display === "none") {

        editInput.style.display = "inline-block";
        editInput.value = label.innerText;
        label.style.display = "none";

    } else {
        editInput.style.display = "none";
        label.innerText = editInput.value;
        label.style.display = "inline-block";
    }

    if (editDate.style.display === "none"){
        date.readOnly = false;
        editDate.style.display = "inline-block";
        editDate.valueAsDate = date.valueAsDate;
        date.style.display  = "none";

    } else {
        editDate.style.display = "none";
        date.valueAsDate = editDate.valueAsDate;
        date.style.display = "inline-block";
        date.readOnly = "false";
    }

    editInput.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            listItem.querySelector(".edit").click();
        }
    });

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/tarefas-editar-post-json.php');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            let resultado = JSON.parse(xhr.responseText);


        }
    };
    // xhr.send(JSON.stringify(task));
}

// let editTask = function() {
//     // let listItem = this.parentNode;
//     // let editInput = listItem.querySelector(".TaskNameEdit");
//     // let label = listItem.querySelector("label");
//     // let editDate = listItem.querySelector("#newDate");
//     // let date = listItem.querySelector(".taskDate");
//
//     if (editInput.style.display === "none") {
//
//         editInput.style.display = "inline-block";
//         editInput.value = label.innerText;
//         label.style.display = "none";
//
//
//     } else {
//         editInput.style.display = "none";
//         label.innerText = editInput.value;
//         label.style.display = "inline-block";
//     }
//
//     if (editDate.style.display === "none"){
//         date.readOnly = false;
//         editDate.style.display = "inline-block";
//         editDate.valueAsDate = date.valueAsDate;
//         date.style.display  = "none";
//
//     } else {
//         editDate.style.display = "none";
//         date.valueAsDate = editDate.valueAsDate;
//         date.style.display = "inline-block";
//         date.readOnly = "false";
//     }
//
//     editInput.addEventListener("keyup", function(event) {
//         if (event.keyCode === 13) {
//             listItem.querySelector(".edit").click();
//         }
//     });
// };

// let completeTask = function() {
//
//     let listItem = this.parentNode;
//     let checkBox = listItem.querySelector(".checkbox");
//     let label = listItem.querySelector("label");
//
//     if (checkBox.checked == false) {
//
//         label.style.textDecoration = "none";
//
//     } else {
//
//         label.style.textDecoration = "line-through";
//     }
// };

let deleteTaskAjax = function(e){

    // let elementoAtivo = e.currentTarget;
    let listItem = this.closest("li");
    let elementoProximoId = listItem.querySelector("input[type=hidden]").value;
    let list = listItem.closest("ul");

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/todo/tarefas-excluir-post-json.php');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {

            // deleteTask();

            let alerta = confirm("Deseja mesmo excluir a tarefa?");

            if (alerta == true) {
                list.removeChild(listItem);
            }
        }
    };
    xhr.send(JSON.stringify(elementoProximoId));
};

addTaskBtn.addEventListener("click", addTaskAjax);

newTask.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        document.getElementById("addNewTask").click();
    }
});

for(let i=0;i < deleteBtn.length;i++){
    deleteBtn[i].addEventListener('click', deleteTaskAjax);
}

for(let i=0;i < editBtn.length;i++){
    editBtn[i].addEventListener('click', editTaskAjax);
}
console.log(editField);
for(let i=0;i < editField.length;i++){
    editField[i].addEventListener('click', editTaskAjax);
}






