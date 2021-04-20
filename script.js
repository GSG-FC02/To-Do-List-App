// These are the selector I will use to build the app
let userInput = document.getElementById("new-task"),
    addButton = document.getElementById("add"),
    taskList = document.getElementById("task-list");
  
initialArray = []; //this array is used to save tasks in it at first
//building a function that saves the userInput(tasks) to local storage
function saveTask() {
        let savedTaskListArray = JSON.parse(localStorage.getItem("savedTask"));
        if(savedTaskListArray){
            savedTaskListArray.push(userInput.value);
            localStorage.setItem("savedTask", JSON.stringify(savedTaskListArray));

        }else{
            initialArray.push(userInput.value);
            localStorage.setItem("savedTask", JSON.stringify(initialArray));
        }
    }
addButton.addEventListener("click", saveTask )

//This function to save the task forever in page
function savingTaskOnPage(){
    let savedTask =  JSON.parse(localStorage.getItem("savedTask"));
    if(savedTask){
        for (let i =0; i< savedTask.length; i++){
            let addTask = document.createElement("li");
            addTask.setAttribute( "class" , "added-new-task");
            addTask.innerText = savedTask[i];
            taskList.appendChild(addTask)

            // create delete button
            let deleteButton = document.createElement("button");
            deleteButton.setAttribute( "class","delete-btn");
            deleteButton.innerText = "\u00D7";
            addTask.appendChild(deleteButton);
            userInput.value = null; 
            deleteButton.addEventListener("click",deleteTask)
          
        }
    }
}
window.onload = savingTaskOnPage(); //onloading the task list remains as it is

function addTask(){
    // e.preventDefualt(); //I do not know what this do, but I saw other developers write it
    //this is to add task in the unordered list
    let addTask = document.createElement("li");
    addTask.setAttribute( "class" , "added-new-task");
    addTask.innerText = userInput.value
    taskList.appendChild(addTask)

    // create delete button
    deleteButton = document.createElement("button");
    deleteButton.setAttribute( "class","delete-btn");
    deleteButton.innerText = "\u00D7";
    addTask.appendChild(deleteButton);
    userInput.value = null; //this is to empty the input box from the previous task
    deleteButton.addEventListener("click",deleteTask)
}    
addButton.addEventListener("click" ,addTask ) 


//building the delete function
function deleteTask(e){
    let deleteTarget = e.target;
    let remove = deleteTarget.parentNode;
    remove.style.display= "none";
    let localData = JSON.parse(localStorage.getItem("savedTask"));
    let requiredTask = remove.childNodes[0].textContent;
    if(localData !== null){
        for(let i = 0 ; i < localData.length ; i++){
            if(localData[i] === requiredTask){
                localData.splice(i, 1);
                localStorage.setItem("savedTask", JSON.stringify(localData))
            }
        }
    } 
}

//This function to add task when the user press enter

userInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addButton.click();
    }
});