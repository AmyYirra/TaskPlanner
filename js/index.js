//added new task
const taskManager = new TaskManager(0);

taskManager.getTasks();
taskManager.render();

drawPieChart();
tableForPieChart();
//draw table
function tableForPieChart() {
  google.charts.load("current", { packages: ["table"] });
  google.charts.setOnLoadCallback(drawTable);
  function drawTable() {
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Task");
    data.addColumn("string", "Assign");
    data.addColumn("string", "Status");
    data.addColumn("string", "DueDate");
    console.log(taskManager.tasks);
    data.addRows(taskManager.getTask());
    var table = new google.visualization.Table(
      document.getElementById("table_div")
    );
    console.log(data);
    table.draw(data, {
      showRowNumber: true,
      height: "100%",
    });
  }
}
//draw pie chart
function drawPieChart() {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    let statusToDo = taskManager.countTaskByStatus("To-do");
    const statusReview = taskManager.countTaskByStatus("Review");
    const statusDone = taskManager.countTaskByStatus("Done");
    const statusProgress = taskManager.countTaskByStatus("In progress");
    const taskNumber = taskManager.taskCount();
    if (taskNumber == 0) {
      document.getElementById("piechart").style.display = "none";
      document.getElementById("table_div").style.display = "none";
    }

    //alert(statusProgress);
    var data = google.visualization.arrayToDataTable([
      ["Task", "Total Task"],
      ["To-Do", statusToDo],
      ["In Progress", statusProgress],
      ["Review", statusReview],
      ["Done", statusDone],
    ]);

    // Optional; add a title and set the width and height of the chart
    var options = {
      title: "Task Status",
      height: "100%",
      fontSize: "14",
    };

    // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(
      document.getElementById("piechart")
    );
    chart.draw(data, options);
    tableForPieChart();

    // taskManager.render();
  }
  //end pie chart
}
function drawTableForPie() {
  google.charts.load("current", { packages: ["table"] });
  google.charts.setOnLoadCallback(drawTable);
  function drawTable() {
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Task");
    data.addColumn("string", "Assign To");
    data.addColumn("string", "Status");
    data.addColumn("string", "Due Date");
    console.log(taskManager.tasks);
    data.addRows(taskManager.getTask());
    var table = new google.visualization.Table(
      document.getElementById("table_div")
    );
    console.log(data);
    table.draw(data, {
      showRowNumber: true,
      height: "100%",
    });
  }
}
let condition;

document.querySelector("#idAdd").style.display = "";
document.querySelector("#idUpdate").style.display = "none";

// Select the New Task Form
const newTaskForm = document.querySelector("#newTaskForm");
// Select the inputs
const newTaskNameInput = document.querySelector("#newTaskNameInput");
const newTaskDescription = document.querySelector("#newTaskDescription");
const newTaskStatus = document.querySelector("#newTaskStatus");
const newTaskAssignedTo = document.querySelector("#newTaskAssignedTo");
const newTaskDueDate = document.querySelector("#newTaskDueDate");

const errorMessage = document.querySelector("#alertMessage");

const errorName = document.querySelector("#errorName");
const errorTaskStatus = document.querySelector("#errorTaskStatus");
const errorAssignTo = document.querySelector("#errorAssignTo");
const errorDescription = document.querySelector("#errorDescription");
const errorDueDate = document.querySelector("#errorDueDate");
//to disable the past dates in calendar
$(function () {
  let maxDate = getTodayDate();
  $("#newTaskDueDate").attr("min", maxDate);
});
//onload addmodal --to set focus on first element
$("#addModal").on("shown.bs.modal", function () {
  newTaskNameInput.focus();
  if (condition == "ADD") {
    document.querySelector("#value_Task").innerHTML = "Add Task";
    document.querySelector("#idUpdate").style.display = "none";
    document.querySelector("#idAdd").style.display = "block";
  } else {
    document.querySelector("#value_Task").innerHTML = "Edit Task";
    document.querySelector("#idAdd").style.display = "none";
    document.querySelector("#idUpdate").style.display = "block";
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

  if (!validFormFieldInput(name)) {
    errorName.innerHTML = "Invalid Name ";
    errorName.style.display = "block";
    newTaskNameInput.focus();
    return false;
  } else {
    errorName.style.display = "none";
  }

  if (!validFormFieldInput(description)) {
    document.querySelector("#errorDescription").innerHTML =
      "Invalid Description";
    document.querySelector("#errorDescription").style.display = "block";
    newTaskDescription.focus();
    return false;
  } else {
    document.querySelector("#errorDescription").style.display = "none";
  }

  if (validFormDropdown(assignedTo) == 0) {
    document.querySelector("#errorAssignTo").innerHTML = "Invalid Asignee";
    document.querySelector("#errorAssignTo").style.display = "block";
    newTaskAssignedTo.focus();
    return false;
  } else {
    errorAssignTo.style.display = "none";
  }

  if (!validFormFieldInput(dueDate)) {
    errorDueDate.innerHTML = "Invalid duedate";
    errorDueDate.style.display = "block";
    newTaskDueDate.focus();
    return false;
  } else {
    errorDueDate.style.display = "none";
  }

  var FormatDueDate = updateDueDate(dueDate);

  if (condition == "ADD") {
    taskManager.addTask(
      name,
      description,
      txtAssignTo,
      FormatDueDate,
      txtTaskStatus
    );

    taskManager.storeTasks();
    taskManager.render();
    clearFields();
    clearError();
    drawPieChart();
    location.reload();
  } else {
    result = parseInt(condition);
    const task = taskManager.getTaskById(result);
    task.id = result;
    task.name = name;
    task.description = description;
    task.assignedTo = txtAssignTo;
    task.dueDate = FormatDueDate;
    task.status = txtTaskStatus;
    taskManager.storeTasks();
    taskManager.render();
    clearFields();
    drawPieChart();
    location.reload();
  }
  $("#addModal .close").click();
});

function disabledSubmit() {
  document.querySelector("#idBtnName").disabled = true;
  document.querySelector("#idBtnupdate").disabled = true;
}

function clearFields() {
  newTaskNameInput.value = "";
  newTaskDescription.value = "";
  newTaskStatus.value = 1;
  newTaskAssignedTo.value = 0;
  newTaskDueDate.value = "";
}
function clearError() {
  errorName.innerHTML = "";
  errorTaskStatus.innerHTML = "";
  errorAssignTo.innerHTML = "";
  errorDescription.innerHTML = "";
  errorDueDate.innerHTML = "";
}
//Format due date
function updateDueDate(dueDate) {
  var strDueDate = dueDate.split("-");
  var rtnDueDate = strDueDate[2] + "-" + strDueDate[1] + "-" + strDueDate[0];
  return rtnDueDate;
} //to show date in date input box in the format yyyy/mm/dd
function displayDueDate(dueDate) {
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
  const task = taskManager.getTaskById(deleteId);
  const taskName = task.name;
  var retVal = confirm(`Do you want to delete the task ${taskName}?`);
  if (retVal == true) {
    fnDelete(deleteId);
    location.reload();
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
  task.status = "Done";
  taskManager.render();
  taskManager.storeTasks();
  location.reload();
}

//
function editTask(id) {
  const task = taskManager.getTaskById(id);
  condition = id;
  clearError();
  newTaskNameInput.value = task.name;
  newTaskDescription.value = task.description;
  let viewDate = displayDueDate(task.dueDate);
  newTaskDueDate.value = viewDate;
  let status = task.status;
  for (var i = 0; i < newTaskStatus.options.length; i++) {
    if (newTaskStatus.options[i].text === status) {
      newTaskStatus.selectedIndex = i;
      newTaskStatus.text = document.querySelector("#newTaskStatus").options[
        i
      ].value;
      break;
    }
  }

  for (var k = 0; k < newTaskAssignedTo.options.length; k++) {
    if (newTaskAssignedTo.options[k].text === task.assignedTo) {
      newTaskAssignedTo.selectedIndex = k;
      newTaskAssignedTo.text = document.querySelector(
        "#newTaskAssignedTo"
      ).options[k].value;
      return;
    }
  }
}

function fnDelete(taskId) {
  taskManager.deleteTask(taskId);
  taskManager.render();
  taskManager.storeTasks();
}
//
document.getElementById("statusButton").addEventListener("click", function (e) {
  var selectedValue = e.target.id;
  const tasks = taskManager.getTaskByStatus(selectedValue);
  if (selectedValue == "allTasks") {
    taskManager.render();
    document.getElementById("piechart").style.display = "block";
    document.getElementById("table_div").style.display = "block";
  } else {
    renderByStatus(tasks);
    document.getElementById("piechart").style.display = "none";
    document.getElementById("table_div").style.display = "none";
  }
});

//

document.getElementById(
  "To-do"
).innerHTML = `To-do <sup>${taskManager.countTaskByStatus("To-do")}</sup>`;
document.getElementById("Review").innerHTML = `Revierw <sup>
${taskManager.countTaskByStatus("Review")}</sup>`;

document.getElementById(
  "inProgress"
).innerHTML = `In Progress <sup>${taskManager.countTaskByStatus(
  "In progress"
)} </sup>`;
  document.getElementById(
    "Done"
  ).innerHTML = `Done <sup>${taskManager.countTaskByStatus("Done")}</sup>`;
  const taskNumber=taskManager.taskCount();
document.getElementById(
  "allTasks"
).innerHTML = `All Tasks <sup>${taskNumber}</sup>`;

function renderByStatus(tasks) {
  const tasksHtmlList = [];

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    const taskHtml = createTaskHtml(
      task.id,
      task.name,
      task.description,
      task.assignedTo,
      task.dueDate,
      task.status
    );
    //push the taskHtml into the tasksHtmlList array.
    tasksHtmlList.push(taskHtml);
  } //end of looping
  //create a tasksHtml variable, set the variable to a string of HTML of all the tasks by joining the tasksHtmlList array together, separating each task's html with a newline.
  const tasksHtml = tasksHtmlList.join("\n");
  //Select the tasks list element and set its innerHTML to the tasksHtml.
  const tasksList = document.querySelector("#tasksList");
  tasksList.innerHTML = tasksHtml;
} //end of filter

let btn_Add = document.querySelector("#btn_Add");
btn_Add.addEventListener("click", fnAdd);
function fnAdd() {
  //alert();
  condition = "ADD";
  clearFields();
  clearError();
}

function changetheme() {
  var changeTheme = document.getElementById("changeTheme");
  var selectedValue = changeTheme.options[changeTheme.selectedIndex].value;
  document.head.innerHTML += `<link rel="stylesheet" href="css/${selectedValue}">`;
}
