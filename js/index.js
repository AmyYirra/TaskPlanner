// Select the New Task Form
const newTaskForm = document.querySelector("#newTaskForm");

// Add an 'onsubmit' event listener
newTaskForm.addEventListener('submit', (event) => {
    // Prevent default action
    event.preventDefault();

  // Select the inputs
  const newTaskNameInput = document.querySelector("#newTaskNameInput");
  const newTaskDescription = document.querySelector("#newTaskDescription");
  const newTaskStatus = document.querySelector("#newTaskStatus");
  const newTaskAssignedTo = document.querySelector("#newTaskAssignedTo");
  const newTaskDueDate = document.querySelector("#newTaskDueDate");
  const errorMessage = document.querySelector("#alertMessage");

  /*
        Validation code here
    */

  // Get the values of the inputs
  const name = newTaskNameInput.value;
  const description = newTaskDescription.value;
  const taskStatus = newTaskStatus.value;
  const assignedTo = newTaskAssignedTo.value;
  const dueDate = newTaskDueDate.value;
  // if (!validFormFieldInput(name)) {
  //   errorMessage.innerHTML = "Invalid name input";
  //   errorMessage.style.display = "block";
  // } else {
  //   errorMessage.style.display = "none";
  // }
  if (!validFormFieldInput(name)) {
    errorName.innerHTML = "Invalid Name ";
    errorName.style.display = "block";
  } else {
    errorName.style.display = "none";
  }
  if (!validFormFieldInput(description)) {
    errorDescription.innerHTML = "Invalid Description";
    errorDescription.style.display = "block";
  } else {
    errorDescription.style.display = "none";
  }
  let errDatemsg = validatedate(dueDate);
  if (!validFormFieldInput(dueDate)) {
    errorDueDate.innerHTML = "Invalid duedate";
    errorDueDate.style.display = "block";
  } else if (errDatemsg != null) {
    errorDueDate.innerHTML = errDatemsg;
    errorDueDate.style.display = "block";
  } else {
    errorDueDate.style.display = "none";
  }
  if (validFormDropdown(taskStatus) == 0) {
    errorTaskStatus.innerHTML = "Invalid Status";
    errorTaskStatus.style.display = "block";
  } else {
    errorTaskStatus.style.display = "none";
  }
  if (validFormDropdown(assignedTo) == 0) {
    errorAssignTo.innerHTML = "Invalid Asignee";
    errorAssignTo.style.display = "block";
  } else {
    errorAssignTo.style.display = "none";
  }
      if (!isValidDate(dueDate)) {
        errorMessage.innerHTML = "Invalid date input";
        errorMessage.style.display = "block";
      } else {
        errorMessage.style.display = "none";
      }

});

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
    //document.write ("User does not want to continue!");
    return false;
  }
}
function validatedate(dueDate) {
  var today = new Date();
  var Tdd = today.getDate();

  var Tmm = today.getMonth() + 1;

  var Tyyyy = today.getFullYear();

  // Match the date format through regular expression
  if (dueDate != "") {
    // document.form1.text1.focus();
    //Test which seperator is used '/' or '-'
    var opera1 = dueDate.split("/");
    //alert(opera1);
    var opera2 = dueDate.split("-");
    // alert(opera2);
    lopera1 = opera1.length;
    lopera2 = opera2.length;
    // Extract the string into month, date and year
    if (lopera1 > 1) {
      var pdate = dueDate.split("/");
    } else if (lopera2 > 1) {
      var pdate = dueDate.split("-");
    }
    var yyyy = parseInt(pdate[0]);
    var mm = parseInt(pdate[1]);
    var dd = parseInt(pdate[2]);
    Tyyyy = parseInt(Tyyyy);
    //alert(Tyyyy + "<" + yyyy);
    if (Tyyyy > yyyy) {
      return "select the corrrect year";
    } else if (Tmm > mm) {
      return "select correct month";
    } else if (Tdd > dd) {
      return "select the correct date";
    } else {
      return null;
    }
  }
}
