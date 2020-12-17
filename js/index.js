//added new task 
const taskManager = new TaskManager(0);
taskManager.addTask(
  "Shopping",
  "dsdg ddfdf dfdfd dfdfdf fdfdf vdd yeyhj efeej",
  "Amy",
  "22-12-2020",
  "To-do"
);
taskManager.render();
// Select the New Task Form
const newTaskForm = document.querySelector("#newTaskForm");
// Select the inputs
const newTaskNameInput = document.querySelector("#newTaskNameInput");
const newTaskDescription = document.querySelector("#newTaskDescription");
const newTaskStatus = document.querySelector("#newTaskStatus");
const newTaskAssignedTo = document.querySelector("#newTaskAssignedTo");
const newTaskDueDate = document.querySelector("#newTaskDueDate");
const errorMessage = document.querySelector("#alertMessage");
//to disable the past dates in calendar
$(function () {
  let maxDate = getTodayDate();
  $("#newTaskDueDate").attr("min", maxDate);
});
//onload addmodal --to set focus on first element
$("#addModal").on("shown.bs.modal", function () {
  newTaskNameInput.focus();
  if (document.getElementById("id_Edit").value == "ADD") {
    document.getElementById("add_Header").style.display = "block";
    document.getElementById("edit_Header").style.display = "none";
    document.getElementById("other_Header").style.display = "none";
  }
});

// Add an 'onsubmit' event listener
newTaskForm.addEventListener("submit", (event) => {
  // Prevent default action
  event.preventDefault();
  // Get the values of the inputs
  const name = newTaskNameInput.value;
  const description = newTaskDescription.value;
  const taskStatus = newTaskStatus.value;
  const txtTaskStatus = document.getElementById("newTaskStatus").options[
    document.getElementById("newTaskStatus").selectedIndex
  ].text;

  const assignedTo = newTaskAssignedTo.value;
  const txtAssignTo = document.getElementById("newTaskAssignedTo").options[
    document.getElementById("newTaskAssignedTo").selectedIndex
  ].text;
  const dueDate = newTaskDueDate.value;
  const status = newTaskStatus.innerHTML;

  if (!validFormFieldInput(name)) {
    errorName.innerHTML = "Invalid Name ";
    errorName.style.display = "block";

    newTaskNameInput.focus();
  } else {
    errorName.style.display = "none";
  }
  if (!validFormFieldInput(description)) {
    errorDescription.innerHTML = "Invalid Description";
    errorDescription.style.display = "block";
    if (newTaskNameInput.value != "") {
      newTaskDescription.focus();
    }
  } else {
    errorDescription.style.display = "none";
  }
  if (
    validFormDropdown(taskStatus) == 1 &&
    validFormDropdown(assignedTo) == 0 &&
    newTaskDescription.value != ""
  ) {
    // errorTaskStatus.innerHTML = "Invalid Status";
    //errorTaskStatus.style.display = "block";
    newTaskStatus.focus();
    errorTaskStatus.style.display = "none";
  }
  if (validFormDropdown(assignedTo) == 0) {
    errorAssignTo.innerHTML = "Invalid Asignee";
    errorAssignTo.style.display = "block";
    if (newTaskStatus.value >= 1 && newTaskDescription.value != "") {
      newTaskAssignedTo.focus();
    }
  } else {
    errorAssignTo.style.display = "none";
  }
  if (!validFormFieldInput(dueDate)) {
    errorDueDate.innerHTML = "Invalid duedate";
    errorDueDate.style.display = "block";
    if (
      newTaskStatus.value >= 1 &&
      newTaskDescription.value != "" &&
      newTaskAssignedTo.value > 0
    ) {
      newTaskDueDate.focus();
    }
  } else {
    errorDueDate.style.display = "none";
    var FormatDueDate = updateDueDate(dueDate);
    taskManager.addTask(
      name,
      description,
      txtAssignTo,
      FormatDueDate,
      txtTaskStatus
    );

    //taskManager.addTask("shopping", "milk", "Tom", "22-12-2020", "toDO");
    taskManager.render();
  }
});
//Format due date
function updateDueDate(dueDate) {
  //var strDueDate = dueDate;
  var strDueDate = dueDate.split("-");
  var rtnDueDate = strDueDate[2] + "-" + strDueDate[1] + "-" + strDueDate[0];
  return rtnDueDate;
}

function validFormFieldInput(data) {
  return data !== null && data !== "";
}
function validFormDropdown(data) {
  return data;
}
function getConfirmation() {
  //('#btnCancel').addClass('btn-secondary');
  var retVal = confirm("Do you want to delete the task?");
  if (retVal == true) {
    alert("Task deleted successfully");
    return true;
  } else {
    return false;
  }
}

function getTodayDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return yyyy + "-" + mm + "-" + dd;
}

function fnEdit() {
  document.getElementById("value_Task").innerHTML = "Edit Task";
  let idBtnedit = document.getElementById("idBtnName");
  idBtnedit.innerHTML = "Edit Task";
}
function clickAdd() {
  document.getElementById("value_Task").innerHTML = "Add Task";
  let idBtnadd = document.getElementById("idBtnName");
  idBtnadd.innerHTML = "Add Task";
}
