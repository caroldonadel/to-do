document.getElementById("dateNewTask").valueAsDate = new Date();

var newTask = document.querySelector(".newTaskDescription");
var addTaskBtn = document.querySelector("#addNewTask");
var toDoUl = document.querySelector(".conjuntoItens");
var dateTask = document.querySelector("#dateNewTask");

var createNewTask = function(task, inputDate) {
    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var date = document.createElement("input");
    var editButton = document.createElement("button");
    var editInput = document.createElement("input");
    var editDate = document.createElement("input");  
    var deleteButton = document.createElement("button");

    deleteButton.onclick = deleteTask;
    editButton.onclick = editTask;
    checkBox.onchange = completeTask;

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
    date.valueAsDate = inputDate;
    date.readOnly = 'true';
    editDate.type = "date";  
    editDate.className = "dataInputEdit"; 
    editDate.id = "newDate";
    editDate.style.display = "none"; 

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(date);
    listItem.appendChild(editDate);

    return listItem;
};

var addTask = function() {
    var listItem = createNewTask(newTask.value, dateTask.valueAsDate);

    toDoUl.appendChild(listItem);

    newTask.value = "";
    document.getElementById("dateNewTask").valueAsDate = new Date();

};

var editTask = function() {
    var listItem = this.parentNode;
    var editInput = listItem.querySelector(".TaskNameEdit");
    var label = listItem.querySelector("label");
    var editDate = listItem.querySelector("#newDate");
    var date = listItem.querySelector(".taskDate");

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

var deleteTask = function() {
    var listItem = this.parentNode;
    var list = listItem.parentNode;
    var alerta = confirm("Deseja mesmo excluir a tarefa?");

    if (alerta == true) {
        list.removeChild(listItem);
    }
};

var completeTask = function() {

    var listItem = this.parentNode;
    var checkBox = listItem.querySelector(".checkbox");
    var label = listItem.querySelector("label");

    if (checkBox.checked == false) {

        label.style.textDecoration = "none";
        
    } else {

        label.style.textDecoration = "line-through";
    }
};

addTaskBtn.addEventListener("click", addTask);

newTask.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        document.getElementById("addNewTask").click();
    }
});


