// Create the HTML for a task
const createTaskHtml = (name, description, assignedTo, dueDate, status) => `
<div class="card p-0 m-0  col-lg-3 col-md-6 mb-4">
                    <!-- <img src="..." class="card-img-top" alt="..." /> -->
                    <div class="card-body p-0 m-0 border border-dark ">
                      <p class="card-title bg-green cardheader">
                       <span> Task:${name}</span>
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
                        <span>Status:${status}</span>
                      </p>
                      <p class="card-text p-1 m-1 text-left">
                        <span>Due Date:${dueDate} </span>
                      </p>
                      <div>
                        <p class="card-text p-1 m-1 text-left">
                          <span>
                            
                            <button
                              type="button"
                              class="btn btn-success"
                              data-toggle="modal"
                              data-target="#addModal"
                              onclick="fnEdit();"
                            >
                              Edit
                            </button> </span
                          ><span>
                            <button
                              class="card-link btn btn-success"
                              onclick="getConfirmation()"
                            >
                              Delete
                            </button></span
                          >
                        </p>
                      </div>
                    </div>
                  </div>

`;
// task manager class
class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
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
  }

  // Create the render method to display the task on the browser
  render() {
   
    const tasksList = document.querySelector("#addTask");
    
    for (let i = 0; i < this.tasks.length; i++) {
      
      // Create the task html
      const taskHtml = createTaskHtml(
        this.tasks[i].name,
        this.tasks[i].description,
        this.tasks[i].assignedTo,
        this.tasks[i].dueDate,
        this.tasks[i].status
      );

      tasksList.innerHTML += taskHtml;
    }
  }
}
// end of class
// instances of TaskManager
const newTaskList = new TaskManager(0);
 newTaskList.addTask('shopping', 'milk', 'Tom', '17-12-2020','toDO');
 newTaskList.addTask("cooking", "prepare recipe", "Tom", "17-12-2020",'toDo');
 newTaskList.addTask("pay bills", "electricity/gas/water", "Sam", "30-12-2020", "toDo");
 newTaskList.render();
