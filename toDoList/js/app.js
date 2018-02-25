// Problem: User interaction doesn't provide desired results.
// Solution: Add interactivity so the user can manage daily tasks

var taskInput = document.getElementById("new-task");
var taskDate = document.getElementById("new-task-date");
var taskAuthor = document.getElementById("new-task-author");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

//New Task List Item
var createNewTaskElement = function(taskString, dateString, authorString) {
  //Create List Item
  var listItem = document.createElement("li");

  //input (checkbox)
  var checkBox = document.createElement("input"); // checkbox
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input"); // text
   //input (date)
  // var dateInput = document.createElement("input"); // date
   //input for author
   //var authorName = document.createElement("input");// author
  //label
  var dateLabel = document.createElement("label");
  //label
  var authorLabel = document.createElement("label");
   //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");
  
      //Each element needs modifying
  
  checkBox.type = "checkbox";
  editInput.type = "text";
  //dateInput.type ="text";
  //authorName.type ="text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
   
  label.innerText = taskString;
  dateLabel.innerText ="On: " + dateString;
  authorLabel.innerText ="By: " + authorString;
  
      // each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(authorLabel);
  listItem.appendChild(dateLabel);
  listItem.appendChild(editInput);
 // listItem.appendChild(dateInput);
  //listItem.appendChild(authorName);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

//Import tasks from JSON

var xmlhttp = new XMLHttpRequest();
var url = "toDo.json";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        myFunction(myArr);
        //console.log(myArr);
    }
};
//open() method has been invoked. During this state, the request headers 
//can be set using the setRequestHeader() method and the send() method can be called which will initiate the fetch.
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
    var i;
    for(i = 0; i < arr.length; i++) {
      var newTasks = createNewTaskElement(String(arr[i].todo) ,String(arr[i].date) ,String(arr[i].author));
      incompleteTasksHolder.appendChild(newTasks);
      bindTaskEvents(newTasks, taskCompleted);
    }
    
}



// Add a new task
var addTask = function() {
  console.log("Add task...");
  //Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value, taskDate.value, taskAuthor.value);
  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);  
  
  taskInput.value = "";
  taskDate.value ="";
  taskAuthor.value="";   
}

// Edit an existing task
var editTask = function() {
  console.log("Edit Task...");
  
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  //var dateInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  //var dateLabel = listItem.querySelector("label");
  //var authorLabel = listItem.querySelector("label");
 // var authorName = listItem.querySelector("input[type=text]");
  
  var containsClass = listItem.classList.contains("editMode");
    //if the class of the parent is .editMode 
  if(containsClass) {
      //switch from .editMode 
      //Make label text become the input's value
    label.innerText = editInput.value;
    //dateLabel.innerText = dateInput.value;
    //authorLabel.innerText = authorName.value;

  } else {
      //Switch to .editMode
      //input value becomes the label's text
    editInput.value = label.innerText;
   // dateInput.value = dateLabel.innerText;
    //authorName.value = authorLabel.innerText;
  }
  
    // Toggle .editMode on the parent
  listItem.classList.toggle("editMode");
 
}


// Delete an existing task
var deleteTask = function() {
  console.log("Delete task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  //Remove the parent list item from the ul
  ul.removeChild(listItem);
}

// Mark a task as complete 
var taskCompleted = function() {
  console.log("Task complete...");
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

// Mark a task as incomplete
var taskIncomplete = function() {
  console.log("Task Incomplete...");
  // When checkbox is unchecked
  // Append the task list item #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
 // var dateSelector = taskListItem.querySelector("input[type=text]");
 // var authorName = taskListItem.querySelector("input[type=text]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
  //bind editTask to edit button
  editButton.onclick = editTask;
  
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

// Set the click handler to the addTask function
//addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


// Cycle over the incompleteTaskHolder ul list items
for(var i = 0; i <  incompleteTasksHolder.children.length; i++) {
    // bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
// Cycle over the completeTaskHolder ul list items
for(var i = 0; i <  completedTasksHolder.children.length; i++) {
    // bind events to list item's children (taskIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete); 

}




