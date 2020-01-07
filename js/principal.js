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
    
    label.innerText = task;
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.className = "edit";
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.className = "delete";
    editInput.type="text";
    checkBox.type = "checkbox";
    //add data

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

    return listItem;
};

var addTask = function() {
    console.log("Add Task...");
    var listItem = createNewTask(newTask.value);

    toDoUl.appendChild(listItem);

    newTask.value = " ";

};

var editTask = function(){
    console.log("Edit task...");

    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");

    var containsClass = listItem.classList.contains("editMode");

        //if the class of parent is .editmode
    if (containsClass){
      //label text become the input's value  
      label.innerText = editInput.value;

    } else {
        //switch to .editmode
        //input value becomes the label's text
      editInput.value = label.innerText;
    }

    listItem.classList.toggle("editMode"); //toggle .editmode on the parent
}

var deleteTask = function() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    ul.removeChild(listItem);  
  };


addTaskBtn.addEventListener("click", addTask);


