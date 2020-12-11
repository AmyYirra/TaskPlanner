// Select the New Task Form
const editTaskForm = document.querySelector("#editTaskForm");

// Add an 'onsubmit' event listener
editTaskForm.addEventListener("submit", (event) => {
  // Prevent default action
  event.preventDefault();

  // Select the inputs
  const editTaskNameInput = document.querySelector("#editTaskNameInput");
  const editTaskDescription = document.querySelector("#editTaskDescription");
  const editTaskAssignedTo = document.querySelector("#editTaskAssignedTo");
  const editTaskStatus = document.querySelector("#editTaskStatus");
  const editTaskDueDate = document.querySelector("#editTaskDueDate");
  
  /*
        Validation code here
    */

  // Get the values of the inputs
  const name = editTaskNameInput.value;
  const description = editTaskDescription.value;
  const assignedTo = editTaskAssignedTo.value;
  const status = editTaskStatus.value;
  const dueDate = editTaskDueDate.value;
  if (!validFormFieldInput(name)) {
    errorNameE.innerHTML = "Invalid name";
    errorNameE.style.display = "block";
  } else {
    errorNameE.style.display = "none";
  }
  if (!validFormFieldInput(description)) {
    errorDescriptionE.innerHTML = "Invalid description";
    errorDescriptionE.style.display = "block";
  } else {
    errorDescriptionE.style.display = "none";
  }

  if (validFormDropDown(assignedTo) == 0) {
    errorAssignedToE.innerHTML = "Please select an assignee";
    errorAssignedToE.style.display = "block";
  } else {
    errorAssignToE.style.display = "none";
    }
    
    if (validFormDropDown(status) == 0) {
        alert('hello');
    errorStatusE.innerHTML = "Please select a status";
    errorStatusE.style.display = "block";
  } else {
    errorStatusE.style.display = "none";
    }
    
});

function validFormFieldInput(data) {
  return data !== null && data !== "";
}

function validFormDropDown(data) {
  return data;
}
