let profile = {
  name: "Your Name",
  mobile: "1234567890",
  email: "your@email.com"
};

let tasks = [];
let currentFilter = "all";

function addTask() {
  const title = document.getElementById('taskTitle').value.trim();
  const dueDate = document.getElementById('taskDueDate').value;
  const priority = document.getElementById('taskPriority').value;

  if (!title) return alert("Enter task title");

  tasks.push({ title, dueDate, priority, completed: false });
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDueDate').value = '';
  renderTasks(currentFilter);
}

function renderTasks(filter = "all") {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  let filtered = tasks;

  if (filter === "completed") filtered = tasks.filter(t => t.completed);
  else if (filter === "incomplete") filtered = tasks.filter(t => !t.completed);

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-card priority-${task.priority}`;

    li.innerHTML = `
      <div class="task-info">
        <h4>${task.title}</h4>
        <div class="task-meta">
          Due: ${task.dueDate || "No date"} | Priority: ${task.priority}
        </div>
      </div>
      <div class="task-buttons">
        <button class="${task.completed ? 'incomplete-btn' : 'complete-btn'}"
                onclick="toggleComplete(${index})">
          ${task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks(currentFilter);
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks(currentFilter);
}

function filterTasks(type) {
  currentFilter = type;
  renderTasks(type);
}

function filterByPriority(priorityLevel) {
  if (priorityLevel === "") {
    renderTasks(currentFilter);
    return;
  }

  const filtered = tasks.filter(task => task.priority === priorityLevel);
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-card priority-${task.priority}`;

    li.innerHTML = `
      <div class="task-info">
        <h4>${task.title}</h4>
        <div class="task-meta">
          Due: ${task.dueDate || "No date"} | Priority: ${task.priority}
        </div>
      </div>
      <div class="task-buttons">
        <button class="${task.completed ? 'incomplete-btn' : 'complete-btn'}"
                onclick="toggleComplete(${index})">
          ${task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function toggleProfile() {
  const modal = document.getElementById("profileModal");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
  document.getElementById("profileName").value = profile.name;
  document.getElementById("profileMobile").value = profile.mobile;
  document.getElementById("profileEmail").value = profile.email;
}

function saveProfile() {
  profile.name = document.getElementById("profileName").value;
  profile.mobile = document.getElementById("profileMobile").value;
  profile.email = document.getElementById("profileEmail").value;
  alert("Profile updated!");
  toggleProfile();
}

renderTasks();
