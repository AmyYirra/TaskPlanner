const assert = require("assert");
const TaskManager = require("./../js/taskManager.js");
console.log(TaskManager);
describe("Testing Task Manager functions", () => {
  it("Add task", () => {
    const taskManager = new TaskManager(0);
    taskManager.addTask("Shopping",
  "Milk,water,icecream",
  "Amy",
  "22-12-2020",
  "To-do"
)
    let actual = taskManager.tasks.length;
    let expected=1
   // taskManager.tasks.id=1;
    assert.strictEqual(actual, expected);
    //console.log(id);
  });
  it("delete task", () => {
    const taskManager = new TaskManager(0);
   
    taskManager.addTask(
      "shoppping",
      "At Aldi",
      "Lavina",
      "24/01/2021",
      "TO do"
    );
   taskManager.addTask(
      "shoppping",
      "At Aldi",
      "Cecilia",
      "24/01/2021",
      "TO do"
    );
      taskManager.addTask(
        "shoppping",
        "At Aldi",
        "Lavina",
        "24/01/2021",
        "TO do"
      );
        taskManager.addTask(
          "shoppping",
          "At Aldi",
          "Lavina",
          "24/01/2021",
          "TO do"
        );
    taskManager.deleteTask(1);
    let actual = taskManager.tasks.length;
    let expected =3
    assert.strictEqual(actual, expected);
  });
   it("Find task by id", () => {
   const taskManager = new TaskManager(0);
   
    taskManager.addTask(
      "Shopping",
      "Milk,water,icecream",
      "Amy",
      "22-12-2020",
      "To-do"
    );
    taskManager.addTask(
      "Aldi Shopping",
      "At Aldi",
      "Lavina",
      "24/01/2021",
      "TO do"
    );
    taskManager.addTask(
      "Gardening",
      "At Aldi",
      "Lavina",
      "24/01/2021",
      "TO do"
    );
  const task=  taskManager.getTaskById(2);
   let actual = task.name;
   assert.strictEqual(actual,"Gardening" );
   });
});
