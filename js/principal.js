
document.getElementById("dateNewTask").valueAsDate = new Date();

let newTask = document.querySelector(".newTaskDescription");
let addTaskBtn = document.querySelector("#addNewTask");
let toDoUl = document.querySelector(".conjuntoItens");
let dateTask = document.querySelector("#dateNewTask");

// let createNewTask = function(task, inputDate) {
//     let listItem = document.createElement("li");
//     let checkBox = document.createElement("input");
//     let label = document.createElement("label");
//     let date = document.createElement("input");
//     let editButton = document.createElement("button");
//     let editInput = document.createElement("input");
//     let editDate = document.createElement("input");
//     let deleteButton = document.createElement("button");
//
//     deleteButton.onclick = deleteTask;
//     editButton.onclick = editTask;
//     checkBox.onchange = completeTask;
//
//     label.innerText = task;
//     label.className = "taskName";
//     editButton.innerHTML = '<i class="fas fa-edit"></i>';
//     editButton.className = "edit";
//     deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
//     deleteButton.className = "delete iconDelete";
//     editInput.type = "text";
//     editInput.className = "TaskNameEdit";
//     editInput.style.display = "none";
//     checkBox.type = "checkbox";
//     checkBox.className = "checkbox";
//     date.type = "date";
//     date.className = "taskDate";
//     date.valueAsDate = inputDate;
//     date.readOnly = 'true';
//     editDate.type = "date";
//     editDate.className = "dataInputEdit";
//     editDate.id = "newDate";
//     editDate.style.display = "none";
//
//     listItem.appendChild(checkBox);
//     listItem.appendChild(label);
//     listItem.appendChild(editInput);
//     listItem.appendChild(editButton);
//     listItem.appendChild(deleteButton);
//     listItem.appendChild(date);
//     listItem.appendChild(editDate);
//
//     return listItem;
// };

let addTask = function() {
    addTaskAjax();

    //retrieveTasksAjax();
    //let listItem = createNewTask(newTask.value, dateTask.valueAsDate);
    //toDoUl.appendChild(listItem);
    //newTask.value = "";
    document.getElementById("dateNewTask").valueAsDate = new Date(); //redefinindo a data do input como a data de hoje
};

let addTaskAjax = function() {
    console.log("Realizando requisição para o PHP");
    let task = { nome: newTask.value, data: dateTask.valueAsDate };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/tarefas-criar-post-json.php');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status === 200) {
            //console.log(xhr.responseText);
            toDoUl.append(xhr.responseText);
           //console.log(JSON.parse(xhr.responseText));
            //console).log(xhr.responseText);
            // console.log("Requisição retornou 200 (OK), deve ter salvo")
        }
    };

    xhr.send(JSON.stringify(task));
};

//
// let retrieveTasksAjax = function(){
//     console.log("Realizando requisição para o PHP - BUSCA");
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', 'http://localhost/ToDo/tarefas-busca-elementos.php');
//     xhr.onload = function() {
//         if (xhr.readyState == 4) {
//             if (xhr.status = 200) {
//                 let resultadoBusca = JSON.parse(xhr.responseText);
//             }
//         }
//     }
//
//     xhr.send();
//     window.location.assign('http://localhost/ToDo/index-json.php');
// }

// function preencheCampos(json) {
//     let d = new Date(json.data);
//     year = d.getFullYear();
//     month = d.getMonth()+1;
//     dt = d.getDate();
//
//     if (dt < 10) {
//         dt = '0' + dt;
//     }
//     if (month < 10) {
//         month = '0' + month;
//     }
//
//     let dataFormatada = year+'-' + month + '-'+dt;
//
//     document.querySelector('.taskName').value = json.nome;
//     document.querySelector('.taskDate').value = dataFormatada;
//  }

addTaskBtn.addEventListener("click", addTask);

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

let deleteTask = function() {
    // let listItem = this.parentNode;
    let list = listItem.parentNode;
    let alerta = confirm("Deseja mesmo excluir a tarefa?");

    if (alerta == true) {
        list.removeChild(listItem);
    }
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




