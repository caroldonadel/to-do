// //console.log('chamou o adicionar');
//
// document.getElementById("dateNewTask").valueAsDate = new Date();
//
// let newTask = document.querySelector(".newTaskDescription");
// let addTaskBtn = document.querySelector("#addNewTask");
// //let toDoUl = document.querySelector(".conjuntoItens");
// let dateTask = document.querySelector("#dateNewTask");
//
// // let createNewTask = function(task, inputDate) {
// //     let listItem = document.createElement("li");
// //     let checkBox = document.createElement("input");
// //     let label = document.createElement("label");
// //     let date = document.createElement("input");
// //     let editButton = document.createElement("button");
// //     let editInput = document.createElement("input");
// //     let editDate = document.createElement("input");
// //     let deleteButton = document.createElement("button");
// //
// //     deleteButton.onclick = deleteTask;
// //     editButton.onclick = editTask;
// //     checkBox.onchange = completeTask;
// //
// //     label.innerText = task;
// //     label.className = "taskName";
// //     editButton.innerHTML = '<i class="fas fa-edit"></i>';
// //     editButton.className = "edit";
// //     deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
// //     deleteButton.className = "delete iconDelete";
// //     editInput.type = "text";
// //     editInput.className = "TaskNameEdit";
// //     editInput.style.display = "none";
// //     checkBox.type = "checkbox";
// //     checkBox.className = "checkbox";
// //     date.type = "date";
// //     date.className = "taskDate";
// //     date.valueAsDate = inputDate;
// //     date.readOnly = 'true';
// //     editDate.type = "date";
// //     editDate.className = "dataInputEdit";
// //     editDate.id = "newDate";
// //     editDate.style.display = "none";
// //
// //     listItem.appendChild(checkBox);
// //     listItem.appendChild(label);
// //     listItem.appendChild(editInput);
// //     listItem.appendChild(editButton);
// //     listItem.appendChild(deleteButton);
// //     listItem.appendChild(date);
// //     listItem.appendChild(editDate);
// //
// //     return listItem;
// // };
//
// let addTask = function() {
//     addTaskAjax();
//     //retrieveTasksAjax();
//
//     //let listItem = createNewTask(newTask.value, dateTask.valueAsDate);
//     //toDoUl.appendChild(listItem);
//     //newTask.value = "";
//     document.getElementById("dateNewTask").valueAsDate = new Date(); //redefinindo a data do input como a data de hoje
// };
//
// let addTaskAjax = function() {
//     console.log("Realizando requisição para o PHP");
//     let task = { nome: newTask.value, data: dateTask.valueAsDate };
//     //console.log(task);
//
//     let xhr = new XMLHttpRequest();
//     xhr.open('POST', 'http://localhost/ToDo/tarefas-criar-post-json.php');
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     // xhr.onload = function() {
//     //     if (xhr.status === 200) {
//     //         let response = JSON.parse(xhr.responseText);
//     //         console.log(response);
//     //         console.log("Requisição retornou 200 (OK), deve ter salvo")
//     //     }
//     // };
//
//     xhr.send(JSON.stringify(task));
// }
//
// // let retrieveTasksAjax = function(){
// //     console.log("Realizando requisição para o PHP - BUSCA");
// //     let xhr = new XMLHttpRequest();
// //     xhr.open('GET', 'http://localhost/ToDo/tarefas-busca-elementos.php');
// //     xhr.onload = function() {
// //         if (xhr.readyState == 4) {
// //             if (xhr.status = 200) {
// //                 console.log(xhr.responseText);
// //                 let resultadoBusca = JSON.parse(xhr.responseText);
// //             }
// //         }
// //     }
// //
// //     xhr.send();
// // }
//
// // function preencheCampos(json) {
// //     document.querySelector('input[name=endereco]').value = json.logradouro;
// //     document.querySelector('input[name=bairro]').value = json.bairro;
// //     document.querySelector('input[name=complemento]').value = json.complemento;
// //     document.querySelector('input[name=cidade]').value = json.localidade;
// //     document.querySelector('input[name=estado]').value = json.uf; }
// //
//
// addTaskBtn.addEventListener("click", addTask);
//
// newTask.addEventListener("keyup", function(event) {
//     if (event.keyCode === 13) {
//         document.getElementById("addNewTask").click();
//     }
// });