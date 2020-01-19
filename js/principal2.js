document.getElementById("dateNewTask").valueAsDate = new Date();

let newTask = document.querySelector(".newTaskDescription");
let addTaskBtn = document.querySelector("#addNewTask");
let toDoUl = document.querySelector(".conjuntoItens");
let dateTask = document.querySelector("#dateNewTask");
let deleteBtn = document.querySelectorAll(".delete");
let editBtn = document.querySelectorAll(".edit");
let editField = document.querySelectorAll(".TaskNameEdit");
let dates = document.querySelectorAll(".taskDate");
let checkboxes = document.querySelectorAll(".checkbox");

let createNewTask = function(task, inputDate,id) {
    let listItem = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    let date = document.createElement("input");
    let editButton = document.createElement("button");
    let editInput = document.createElement("input");
    let deleteButton = document.createElement("button");
    let idItem = document.createElement("input");

    deleteButton.addEventListener('click', deleteTaskAjax);
    editButton.addEventListener('click', editTaskAjax);

    label.innerText = task;
    label.className = "taskName";
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.className = "edit";
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.className = "delete iconDelete";
    editInput.type = "text";
    editInput.className = "TaskNameEdit";
    checkBox.type = "checkbox";
    checkBox.className = "checkbox";
    date.type = "date";
    date.className = "taskDate";
    date.value = inputDate;
    idItem.type = "hidden";
    idItem.value = id;

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(date);
    listItem.appendChild(idItem);

    return listItem;
};

let addTaskAjax = function() {
    let task = { nome: newTask.value, data: dateTask.valueAsDate };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/tarefas-criar-post-json.php');
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
    let listItem = this.parentNode;
    let editInput = listItem.querySelector(".TaskNameEdit");
    let tarefaId = listItem.querySelector("input[type=hidden]").value; //mudar pra esse nome em deletar tbm
    let label = listItem.querySelector("label");
    let date = listItem.querySelector(".taskDate");
    let task = { nome: editInput.value, data: date.valueAsDate, id: tarefaId};

    if (editInput.style.opacity  < 1) {
        editInput.style.opacity = "1";
        console.log(label.innerText);
        editInput.value = label.innerText;
        console.log(editInput.parentElement.nodeName);
        label.style.opacity = '0';
        console.log("op 0");
    } else {
        editInput.style.opacity = "0";
        label.innerText = editInput.value;
        // editInput.value = '';
        label.style.opacity = "1";
        console.log("sem op 0");
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/tarefas-editar-post-json.php');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(task));

    editInput.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            listItem.querySelector(".edit").click();
        }
    });
};

let editDatesAjax = function (event) {
    let listItem = event.currentTarget.closest("li");
    let elementoProximoId = listItem.querySelector("input[type=hidden]").value;
    let nome = listItem.querySelector("label").innerText;
    let dataAlterada = event.currentTarget;

    let task = { nome: nome, data: dataAlterada.value, id: elementoProximoId};
    console.log(nome);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/tarefas-editar-post-json.php');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(task));
};

let editStatusAjax = function (event) {
    let listItem = event.currentTarget.closest("li");
    let elementoProximoId = listItem.querySelector("input[type=hidden]").value;
    let descricao = listItem.querySelector("label");
    let data = listItem.querySelector(".taskDate").value;
    let checkboxItem = listItem.querySelector(".checkbox");
    let status;

    if (checkboxItem.checked === true){
        status = 1;
        descricao.style.textDecoration = "line-through";
    } else {
        status = 0;
        descricao.style.textDecoration = "none";
    }

    console.log(status);
    let task = { nome: descricao.innerText, data: data, id: elementoProximoId, status: status};
    console.log(task);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/tarefas-editar-post-json.php');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(task));
};

let deleteTaskAjax = function(e){

    // let elementoAtivo = e.currentTarget;
    let listItem = this.closest("li");
    let elementoProximoId = listItem.querySelector("input[type=hidden]").value;
    let list = listItem.closest("ul");

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/tarefas-excluir-post-json.php');
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

for(let i=0;i < editField.length;i++){
    editField[i].addEventListener('click', editTaskAjax);
}

for(let i=0;i < dates.length;i++){
    dates[i].addEventListener('change', function(event){
        editDatesAjax(event);
        }
    );
}

for(let i=0;i < checkboxes.length;i++){
    checkboxes[i].addEventListener('change', function (event) {
    editStatusAjax(event);
    });
}







