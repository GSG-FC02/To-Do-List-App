
// selectors  
let taskInput = document.querySelector("#new-task");
let addButton = document.querySelector("#add"); 
let taskList = document.querySelector("#task-list");


// Events listener
addButton.addEventListener("click", saveTask , true);
taskList.addEventListener("click" , deleteTask) ;

// function 
function saveTask(e){
    e.preventDefault();
    if(taskInput.value){
        //div 
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("todo");
        
        // li 
        const newTask = document.createElement("li")
        newTask.textContent = taskInput.value
    
        // the value of taskinput needed to be inside the list 
        newTask.classList.add("todo-item");
        taskDiv.appendChild(newTask);
        saveTaskListLocally(taskInput.value)
   
      // Deleted button 
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "X";
      deleteButton.classList.add("delete-btn");
      taskDiv.appendChild(deleteButton);
    
      // append to list 
      taskList.appendChild(taskDiv);
     // clear to do input value 
      taskInput.value = null;
    }
    
}

function deleteTask(e) {
    // console.log(e.target)
    const item = e.target;
    //delete 
    if (item.classList[0] === "delete-btn"){
        const todo = item.parentElement;
        todo.remove()   
    }
}

function saveTaskListLocally(todo){
    let todos ;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    // saving in local storage
    localStorage.setItem("todos" , JSON.stringify(todos));
}