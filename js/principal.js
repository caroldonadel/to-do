document.getElementById("dateNewTask").valueAsDate = new Date();

var newTask = document.querySelector(".newTaskDescription");
var addTaskBtn = document.querySelector("#addNewTask");
var toDoUl = document.querySelector(".conjuntoItens");
var dateTask = document.querySelector("#dateNewTask");

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




