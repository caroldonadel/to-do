document.getElementById("dateNewTask").valueAsDate = new Date();

let newTask = document.querySelector(".newTaskDescription");
let addTaskBtn = document.querySelector("#addNewTask");
let toDoUl = document.querySelector(".conjuntoItens");
let dateTask = document.querySelector("#dateNewTask");
let deleteBtn = document.querySelectorAll(".delete");

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
    editInput.style.display = "none";
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

let addTask = function() {
    addTaskAjax();
    document.getElementById("dateNewTask").valueAsDate = new Date();
};

let addTaskAjax = function() {
    console.log("Realizando requisição para o PHP");
    let task = { nome: newTask.value, data: dateTask.valueAsDate };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/todo/tarefas-criar-post-json2.php');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {

            let resultado =  JSON.parse(xhr.responseText);
            console.log(xhr.response);
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

            let dataFormatada = year +'-' + month + '-'+dt;
            let itemnovo = createNewTask(resultado['descricao'], dataFormatada, resultado['id']);

            toDoUl.appendChild(itemnovo);
            newTask.value = "";
        }
    };

    xhr.send(JSON.stringify(task));
};

// let editTaskAjax = function() {
//     console.log("Realizando requisição para o PHP - editar");
//
//     let tarefaEditada = document.querySelector(".TaskNameEdit");
//     let dataEditada = document.querySelector(".dataInputEdit");
//
//     let task = { nome: tarefaEditada.value, data: dataEditada.valueAsDate };
//
//     let xhr = new XMLHttpRequest();
//     xhr.open('POST', 'http://localhost/tarefas-editar-post-json.php');
//     xhr.setRequestHeader('Content-Type', 'application/json');
//
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             let resultado =  JSON.parse(xhr.responseText);
//             let d = new Date(resultado['data']);
//             let year = d.getFullYear();
//             let month = d.getMonth()+1;
//             let dt = d.getDate();
//
//             if (dt < 10) {
//                 dt = '0' + dt;
//             }
//             if (month < 10) {
//                 month = '0' + month;
//             }
//
//             let dataFormatada = year+'-' + month + '-'+dt;
//             let listItem = createNewTask(resultado['nome'], dataFormatada);
//             toDoUl.appendChild(listItem);
//             newTask.value = "";
//         }
//     };

let deleteTaskAjax = function(e){
    console.log(e);
    console.log("Realizando requisição para o PHP - excluir");

    // elementoAtivo = this.activeElement;
    let elementoAtivo = e.currentTarget;
    console.log(elementoAtivo);
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

            console.log("funcionou");
        }
    };
    xhr.send(JSON.stringify(elementoProximoId));
};

addTaskBtn.addEventListener("click", addTask);

// deleteBtn.addEventListener("click", deleteTaskAjax);

newTask.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        document.getElementById("addNewTask").click();
    }
});
let editTask = function() {
    let listItem = this.parentNode;
    let editInput = listItem.querySelector(".TaskNameEdit");
    let label = listItem.querySelector("label");
    let editDate = listItem.querySelector("#newDate");
    let date = listItem.querySelector(".taskDate");

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
};


let completeTask = function() {

    let listItem = this.parentNode;
    let checkBox = listItem.querySelector(".checkbox");
    let label = listItem.querySelector("label");

    if (checkBox.checked == false) {

        label.style.textDecoration = "none";
        
    } else {

        label.style.textDecoration = "line-through";
    }
};

for(let i=0;i< deleteBtn.length;i++){
    deleteBtn[i].addEventListener('click', deleteTaskAjax);
}






