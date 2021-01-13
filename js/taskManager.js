// Create the HTML for a task
const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  const value = "idDone" + id;
  const btnst = "btn_Status" + id;
  // alert(value);
  if (status == "Done") {
    return `<div class="card p-0 m-0  col-lg-3 col-md-6 mb-4" >
                    <!-- <img src="..." class="card-img-top" alt="..." /> -->
                    <div class="card-body p-0 m-0 border border-dark ">
                      <p class="card-title bg-green cardheader" data-taskId=${id}>
                       <span class="p-1 m-1"> Task :  ${name}</span>
                    </p>
                      <p class="card-text p-1 m-1 text-left">
                        <span>Description :</span>
                      </p>
                      <p
                        class="card-text spantextarea p-1 m-1 text-left"
                        id="viewComment"
                      >
                        <span class="spantextarea p-0 m-0"
                          >${description}</span
                        >
                      </p>
                      <p class="card-text p-1 m-1 text-left">
                        <span>Assigned to :${assignedTo}</span>
                      </p>
                      <p class="card-text p-1 m-1 text-left">
                        <span id=${value} class= " cardheader">Status:${status}</span>
                      </p>
                      <p class="card-text p-1 m-1 text-left">
                        <span>Due Date:${dueDate} </span>
                      </p>
                       <p hidden = "hidden"> <span ><input type="textbox" id="txt"  value= ${id} ></span></p>
                       <span>
                            <button
                              class="card-link btn btn-success " onclick="fnDelete(${id})"
                                                       >
                              Delete
                            </button></span
                          >
                       </div>
                       </div>`;
  } else {
    return `<div class="card p-0 m-0  col-lg-3 col-md-6 mb-4" >
                    <!-- <img src="..." class="card-img-top" alt="..." /> -->
                    <div class="card-body p-0 m-0 border border-dark ">
                      <p class="card-title bg-green cardheader" data-taskId=${id}>
                       <span class="p-1 m-1"> Task :  ${name}</span>
                    </p>
                      <p class="card-text p-1 m-1 text-left">
                        <span>Description :</span>
                      </p>
                      <p
                        class="card-text spantextarea p-1 m-1 text-left"
                        id="viewComment"
                      >
                        <span class="spantextarea p-0 m-0"
                          >${description}</span
                        >
                      </p>
                      <p class="card-text p-1 m-1 text-left">
                        <span>Assigned to :${assignedTo}</span>
                      </p>
                      <p class="card-text p-1 m-1 text-left">
                        <span id=${value}>Status:${status}</span>
                      </p>
                      <p class="card-text p-1 m-1 text-left">
                        <span>Due Date:${dueDate} </span>
                      </p>
                       
                       <div> <p class="card-text p-1 m-1 text-left">
                          <span>
                            
                            <button id=${btnst}
                              type="button"
                              class="btn btn-success"
                              data-toggle="modal"
                              
                              onclick="fnUpdate(${id})"
                            >
                            Mark as done
                            </button> </span>
                   <span hidden = "hidden" ><input type="textbox" id="txt"  value= ${id} ></span>
                         <span>
                            <button
                              class="card-link btn btn-success" onclick="fnDelete(${id})"                              
                            >
                              Delete
                            </button></span
                          >
                                               
                      </div>
                    </div>
                  </div>`;
  }
};
// task manager class
class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
    //alert(this.currentId);
  }

  addTask(name, description, assignedTo, dueDate, status) {
    const task = {
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    };

    this.tasks.push(task);
    //alert(this.tasks.id);
  }

  // Create the render method to display the task on the browser
  render() {
    //Create a variable storing an empty array to hold the HTML of all the tasks' html, tasksHtmlList.
    const tasksHtmlList = [];

    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      // Create a taskHtml variable to store the HTML of the current task, by calling the createTaskHtml function and using the properties of the current task, as well as the new formattedDate variable for the parameters.

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
  } //end of render

  //Add a new method, getTaskById(), it should accept a taskId as a parameter.
  getTaskById(id) {
    // create a foundTask variable to store the found task.
    let foundTask;

    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.tasks.length; i++) {
      // Store the current task in a variable called task
      const task = this.tasks[i];

      // Compare task.id to the passed in taskId, if its a match, store the task to the variable foundTask
      if (task.id === id) {
        foundTask = task;
      }
    }
    // Return the found task
    return foundTask;
  }

  // Create the deleteTask method
  deleteTask(id) {
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];

    // Loop over the tasks
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];

      // Check if the task id is not the task id passed in as a parameter
      if (task.id !== id) {
        // Push the task to the newTasks array
        newTasks.push(task);
      }
    }

    // Set this.tasks to newTasks
    this.tasks = newTasks;
  }

  // Store task JSON to localStorage
  storeTasks() {
    const taskJson = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", taskJson);
    const currentIdsrting = String(this.currentId);
    localStorage.setItem("currentId", currentIdsrting);
  }

  //get tasks from local storage

  getTasks() {
    // 2) Get books out of localstorage and parse into JS array
    // if localstorage is empty, assign books to empty array
    if (localStorage.getItem("tasks")) {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    if (localStorage.getItem("currentId")) {
      this.currentId = Number(JSON.parse(localStorage.getItem("currentId")));
    }
  }
  // Clear local storage
  clearTasksFromLocalStorage() {
    localStorage.clear();
  }
}
// end of class
// instances of TaskManager
// const newTaskList = new TaskManager(0);
// newTaskList.addTask("cooking", "prepare recipe", "Tom", "17-12-2020", "toDo");
// //   newTaskList.addTask("pay bills", "electricity/gas/water", "Sam", "30-12-2020", "toDo");
// newTaskList.render();
