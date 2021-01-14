const TaskManager = require("./../js/taskManager.js");
const assert = require("assert");

console.log(TaskManager);
describe("Testing taskmangager function", () => {
  it("Test addTask Function", () => {
    const taskManager = new TaskManager(0);
    taskManager.addTask("shoppping", "dentist", "Amy", "24/01/2021");
    let len = taskManager.tasks.length;
    assert.strictEqual(len, 1);
  });
    it("Test deleteTask Function", () => {
        const taskManager = new TaskManager(0);
        taskManager.addTask("shoppping", "At Aldi", "Amy", "24/01/2021");
        taskManager.addTask("payment", "Hotel", "Amy", "26/01/2021");
        taskManager.addTask("appointment", "At Aldi", "Amy", "26/01/2021");
        taskManager.deleteTask(1);
        let len = taskManager.tasks.length;
        assert.strictEqual(len, 2);
      });
  it("Test getTaskById Function", () => {
            const taskManager = new TaskManager(0);
            taskManager.addTask("shoppping", "At Aldi", "Amy", "24/01/2021");
            taskManager.addTask("payment", "Hotel", "Amy", "26/01/2021");
            taskManager.addTask("appointment", "Hornsby", "Amy", "26/01/2021");
    const reslut1 = taskManager.getTaskById(2).name;
    
    assert.strictEqual(reslut1, 'appointment');
    const reslut2 = taskManager.getTaskById(2).description;
    assert.strictEqual(reslut2, 'Hornsby');
  });
});
