var newTask = document.querySelector("#new-task");
var addTaskBtn = document.querySelector("#addTask");
var toDoUl = document.querySelector(".conjuntoItens");

var createNewTask = function(task) {
    
  console.log("criando task");

    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var editButton = document.createElement("button"); 
    var editInput=document.createElement("input");
    var deleteButton = document.createElement("button");

    deleteButton.onclick = deleteTask;
    editButton.onclick = editTask;
    checkBox.onchange = completeTask;
    
    label.innerText = task;
    label.className = "nomeItem";
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.className = "edit";
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.className = "delete";
    editInput.type="text";
    editInput.className = "inputItem";
    editInput.style.display = "none";
    checkBox.type = "checkbox";
    checkBox.className = "checkbox";
    
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

var addTask = function() {
  var listItem = createNewTask(newTask.value);

  toDoUl.appendChild(listItem);

  newTask.value = "";
};

var editTask = function(){
    console.log("Edit task...");

    var listItem = this.parentNode;
    var editInput = listItem.querySelector(".inputItem");
    //var checkBox = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");

    if (editInput.style.display === "none") {
      editInput.style.display = "inline-block";
      label.innerText = editInput.value;
    } else {
      editInput.style.display = "none";
      label.innerText = editInput.value;
    }
}

var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  var alerta = confirm("Deseja mesmo excluir o item?");

  if (alerta == true){
    ul.removeChild(listItem);
    }
  };

var completeTask = function() {
    var listItem = this.parentNode;
    var checkBox = listItem.querySelector(".checkbox");
    var label = listItem.querySelector("label");

    if (checkBox.checked == false){
      console.log("checked false");
      //checkBox.checked = true;
      label.style.textDecoration = "none";

    } else {

      console.log("checked true");
      //checkBox.checked = true;
      label.style.textDecoration = "line-through";
      //label.style.textDecorationStyle="wavy";
    }
}

addTaskBtn.addEventListener("click", addTask);

newTask.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    document.getElementById("addTask").click();
  }
});



