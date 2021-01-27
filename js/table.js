
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
    // showRowNumber: true,
    height: "100%",
  });
}
