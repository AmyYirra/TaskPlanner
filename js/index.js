//
tick(); 
//added new task
const taskManager = new TaskManager(0);
/*taskManager.addTask(
  "Shopping",
  "dsdg ddfdf dfdfd dfdfdf fdfdf vdd yeyhj efeej",
  "Amy",
  "22-12-2020",
  "To-do"
);*/

taskManager.getTasks();
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
  if (document.querySelector("#id_Edit").value == "ADD") {
    document.querySelector("#add_Header").style.display = "block";
    document.querySelector("#edit_Header").style.display = "none";
    document.querySelector("#other_Header").style.display = "none";
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
  const txtTaskStatus = document.querySelector("#newTaskStatus").options[
    document.querySelector("#newTaskStatus").selectedIndex
  ].text;

  const assignedTo = newTaskAssignedTo.value;
  const txtAssignTo = document.querySelector("#newTaskAssignedTo").options[
    document.querySelector("#newTaskAssignedTo").selectedIndex
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
    taskManager.storeTasks();
    taskManager.render();

    newTaskNameInput.value = "";
    newTaskDescription.value = "";
    newTaskStatus.value = 1;
    newTaskAssignedTo.value =0;
    newTaskDueDate.value = "";

    $("#addModal").modal().hide();
    $("#addModal .close").click();

    //taskManager.addTask("shopping", "milk", "Tom", "22-12-2020", "toDO");
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
function getConfirmation(deleteId) {
  //('#btnCancel').addClass('btn-secondary');
  var retVal = confirm("Do you want to delete the task?");
  if (retVal == true) {
    fnDelete(deleteId);
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
//updating the status
function fnUpdate(id) {
  //finding the task according to id
  const task = taskManager.getTaskById(id);
  //updating the status
  task.status = "Done";

  taskManager.render();
  taskManager.storeTasks();
}


function fnDelete(taskId) {
  taskManager.deleteTask(taskId);
  taskManager.render();
  taskManager.storeTasks();
}

// function startTime() {
//   var today = new Date();
//   var h = today.getHours();
//   var m = today.getMinutes();
//   var s = today.getSeconds();

//   m = checkTime(m);
//   s = checkTime(s);
//   document.getElementById('myClock').innerHTML = h + ":" + m + ":" + s;
// }
// function checkTime(i) {
//   if (i < 10) {
//     i = "0" + i;
//   }
//   return i;
// } 
function showLocale(objD) 
{ 
var str,colorhead,colorfoot; 
var yy = objD.getYear(); 
if(yy<1900) yy = yy+1900; 
var MM = objD.getMonth()+1; 
if(MM<10) MM = '0' + MM; 
var dd = objD.getDate(); 
if(dd<10) dd = '0' + dd; 
var hh = objD.getHours(); 
if(hh<10) hh = '0' + hh; 
var mm = objD.getMinutes(); 
if(mm<10) mm = '0' + mm; 
var ss = objD.getSeconds(); 
if(ss<10) ss = '0' + ss; 
var ww = objD.getDay(); 
if ( ww==0 ) colorhead="<font color=\"#FF0000\">"; 
if ( ww > 0 && ww < 6 ) colorhead="<font color=\"#373737\">"; 
if ( ww==6 ) colorhead="<font color=\"#008000\">"; 
if (ww==0) ww="Sunday"; 
if (ww==1) ww="Monday"; 
if (ww==2) ww="Tuesday"; 
if (ww==3) ww="Wednesday"; 
if (ww==4) ww="Thursday"; 
if (ww==5) ww="Friday"; 
if (ww==6) ww="Saturday"; 
colorfoot="</font>" 
str = colorhead + dd + "-" + MM + "-" + yy + " " + hh + ":" + mm + ":" + ss + " " + ww + colorfoot; 
return(str); 
} 
function tick() 
{ 
var today; 
today = new Date(); 
document.getElementById("myClock").innerHTML = showLocale(today); 
window.setTimeout("tick()", 1000); 
} 

