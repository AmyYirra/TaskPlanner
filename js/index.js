function getConfirmation() {
  var retVal = confirm("Do you want to delete the task?");
  if (retVal == true) {
    alert("Task deleted successfully");
    return true;
  } else {
    //document.write ("User does not want to continue!");
    return false;
  }
}
// Select the New Task Form
// Select the New Task Form
const newTaskForm = document.querySelector("#newTaskForm");

// Add an 'onsubmit' event listener
newTaskForm.addEventListener("submit", (event) => {
  // Prevent default action
  event.preventDefault();

  // Select the inputs
  const newTaskNameInput = document.querySelector("#newTaskNameInput");
  const newTaskDescription = document.querySelector("#newTaskDescription");
  const newTaskAssignedTo = document.querySelector("#newTaskAssignedTo");
  const newTaskDueDate = document.querySelector("#newTaskDueDate");
  const errorMessage = document.querySelector("#alertMessage");

  /*
        Validation code here
    */

  // Get the values of the inputs
  const name = newTaskNameInput.value;
  const description = newTaskDescription.value;
  const assignedTo = newTaskAssignedTo.value;
  const dueDate = newTaskDueDate.value;
  if (!validFormFieldInput(name)) {
    errorMessage.innerHTML = "Invalid name input";
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
  }
});
