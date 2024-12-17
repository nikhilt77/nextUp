document.addEventListener("DOMContentLoaded", () => {
  const tasksString = localStorage.getItem("tasks");
  if (tasksString) {
    const taskString = JSON.parse(tasksString);
    taskString.forEach((task) => {
      tasks.push(task);
    });
    updateTasks();
    updateStats();
  }
});
let tasks = [];
let taskCount = 0;
let completed = false;

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

function addTask() {
  let task = document.getElementById("taskInput").value.trim();
  if (task === "") {
    alert("Please enter a task");
    return;
  }
  tasks.push({ task: task, completed: false });
  updateTasks();
  saveTasks();
  taskCount++;
  console.log(tasks);
  document.getElementById("taskInput").value = "";
}
function updateTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskElement = document.createElement("li");
    taskElement.classList.add("taskList");
    taskElement.innerHTML = `
    <div class="taskListItem">
    <div class="task ${task.completed ? "completed" : ""}">
      <input type="checkbox" ${task.completed ? "checked" : ""} />
      <p>${task.task}</p>
    </div>
    <div class="icons">
      <img src="./bin.png" alt="delete" class="delete" onclick="deleteTask(${index})" />
      <img src="./edit.png" alt="edit" class="edit" onclick="editTask(${index})" />
    </div>
    </div>
    `;
    taskList.appendChild(taskElement);
    taskElement.addEventListener("change", () => {
      toggleTaskCompleted(index);
    });
    taskElement.addEventListener("click", function () {
      toggleTaskCompleted(index);
    });
    taskList.appendChild(taskElement);
    updateStats();
    saveTasks();
  });
}
function toggleTaskCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTasks();
  updateStats();
}
function deleteTask(index) {
  tasks.splice(index, 1);
  updateTasks();
  updateStats();
  saveTasks();
}
function editTask(index) {
  const newTask = document.getElementById("taskInput");
  newTask.value = tasks[index].task;
  tasks.splice(index, 1);
  updateTasks();
  updateStats();
  saveTasks();
}
function updateStats() {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const remainingTasks = tasks.length - completedTasks;
  const progressPercent = (completedTasks / tasks.length) * 100;
  const taskCount = tasks.length;
  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progressPercent}%`;
  document.getElementById("numbers").innerText =
    `${completedTasks}/${taskCount}`;
  if (tasks.length && completedTasks === taskCount) {
    confetti();
  }
}
document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
document.getElementById("taskSubmit").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});

function confetti() {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["star"],
    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ["circle"],
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}
