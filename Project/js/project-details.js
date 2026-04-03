// INITIAL DATA
let projects = JSON.parse(localStorage.getItem("projects")) || [];

let projectId = Number(localStorage.getItem("currentProjectId"));

let project = projects.find(p => p.id === projectId);

let tasks = JSON.parse(localStorage.getItem("tasks")) || [
    {
        id: 1,
        taskName: "Soạn thảo đề cương dự án",
        assigneeId: 1,
        projectId: 1,
        asignDate: "2025-03-24",
        dueDate: "2025-03-26",
        priority: "Thấp",
        progress: "Đúng tiến độ",
        status: "To Do",
    },
];

if (project) {
    project.tasks = tasks.filter(t => t.projectId === projectId);
}

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "../pages/login.html";
}


// VARIABLES

let editTaskId = null;
let deleteTaskId = null;


// MODAL

function showModal(type) {
    document.querySelector(`.modal.${type}`).style.display = "block";
}

function cancelModal() {
    document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
}


// TOAST

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 1000);

}


// CLEAR FORM

function clearForm() {

    document.getElementById("addTaskName").value = "";
    document.getElementById("addTaskAssignee").value = "";
    document.getElementById("addTaskStatus").value = "";
    document.getElementById("addTaskStartDate").value = "";
    document.getElementById("addTaskDueDate").value = "";
    document.getElementById("addTaskPriority").value = "";
    document.getElementById("addTaskProgress").value = "";


    document.querySelectorAll(".error").forEach(e => {
        e.style.display = "none";
    });

    document.querySelectorAll("input").forEach(i => {
        i.classList.remove("error-input");
    });

}


// RENDER PROJECT INFO

function renderProjectInfo() {

    document.querySelector(".task-wrapper h2").innerText = project.projectName;
    document.querySelector(".task-wrapper p").innerText = project.projectDesc;

}


// RENDER TASK

function renderTasks() {

    let tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    if (!project || !project.tasks || project.tasks.length === 0) {

        tbody.innerHTML = `
        <tr>
            <td colspan="7" style="text-align:center;padding:25px;color:#6c757d">
                Chưa có nhiệm vụ nào
            </td>
        </tr>
        `;

        return;
    }

    renderTodoTasks(tbody);
    renderInProgressTasks(tbody);
    renderPendingTasks(tbody);
    renderDoneTasks(tbody);
}

function renderTodoTasks(tbody) {

    tbody.innerHTML += `
    <tr class="project">
        <td colspan="7">▼ To do</td>
    </tr>
    `;

    let tasks = project.tasks.filter(task => task.status === "To do");

    tasks.forEach(task => {

        tbody.innerHTML += `
        <tr>
            <td>${task.taskName}</td>
            <td>${task.assigneeId}</td>
            <td><span class="tag">${task.priority}</span></td>
            <td>${task.asignDate}</td>
            <td>${task.dueDate}</td>
            <td><span class="status">${task.progress}</span></td>
            <td>
                <button class="btn btn-edit" onclick="openEditTask(${task.id})">Sửa</button>
                <button class="btn btn-delete" onclick="openDeleteTask(${task.id})">Xóa</button>
            </td>
        </tr>
        `;

    });

}

function renderInProgressTasks(tbody) {

    tbody.innerHTML += `
    <tr class="project">
        <td colspan="7">▼ In Progress</td>
    </tr>
    `;

    let tasks = project.tasks.filter(task => task.status === "In Progress");

    tasks.forEach(task => {

        tbody.innerHTML += `
        <tr>
            <td>${task.taskName}</td>
            <td>${task.assigneeId}</td>
            <td><span class="tag">${task.priority}</span></td>
            <td>${task.asignDate}</td>
            <td>${task.dueDate}</td>
            <td><span class="status">${task.progress}</span></td>
            <td>
                <button class="btn btn-edit" onclick="openEditTask(${task.id})">Sửa</button>
                <button class="btn btn-delete" onclick="openDeleteTask(${task.id})">Xóa</button>
            </td>
        </tr>
        `;

    });

}

function renderPendingTasks(tbody) {

    tbody.innerHTML += `
    <tr class="project">
        <td colspan="7">▼ Pending</td>
    </tr>
    `;

    let tasks = project.tasks.filter(task => task.status === "Pending");

    tasks.forEach(task => {

        tbody.innerHTML += `
        <tr>
            <td>${task.taskName}</td>
            <td>${task.assigneeId}</td>
            <td><span class="tag">${task.priority}</span></td>
            <td>${task.asignDate}</td>
            <td>${task.dueDate}</td>
            <td><span class="status">${task.progress}</span></td>
            <td>
                <button class="btn btn-edit" onclick="openEditTask(${task.id})">Sửa</button>
                <button class="btn btn-delete" onclick="openDeleteTask(${task.id})">Xóa</button>
            </td>
        </tr>
        `;

    });

}

function renderDoneTasks(tbody) {

    tbody.innerHTML += `
    <tr class="project">
        <td colspan="7">▼ Done</td>
    </tr>
    `;

    let tasks = project.tasks.filter(task => task.status === "Done");

    tasks.forEach(task => {

        tbody.innerHTML += `
        <tr>
            <td>${task.taskName}</td>
            <td>${task.assigneeId}</td>
            <td><span class="tag">${task.priority}</span></td>
            <td>${task.asignDate}</td>
            <td>${task.dueDate}</td>
            <td><span class="status">${task.progress}</span></td>
            <td>
                <button class="btn btn-edit" onclick="openEditTask(${task.id})">Sửa</button>
                <button class="btn btn-delete" onclick="openDeleteTask(${task.id})">Xóa</button>
            </td>
        </tr>
        `;

    });

}

// ADD TASK

function addTask() {

    let taskName = document.getElementById("addTaskName").value.trim();
    let assigneeId = document.getElementById("addTaskAssignee").value;
    let status = document.getElementById("addTaskStatus").value;
    let startDate = document.getElementById("addTaskStartDate").value;
    let dueDate = document.getElementById("addTaskDueDate").value;
    let priority = document.getElementById("addTaskPriority").value;
    let progress = document.getElementById("addTaskProgress").value;

    let newTask = {
        id: Math.floor(Math.random() * 1000) + new Date().getMilliseconds(),
        taskName: taskName,
        assigneeId: Number(assigneeId),
        projectId: projectId,
        asignDate: startDate,
        dueDate: dueDate,
        priority: priority,
        progress: progress,
        status: status
    };

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    project.tasks = tasks.filter(t => t.projectId === projectId);

    renderTasks();

    cancelModal();

    clearForm();

    showToast("Thêm nhiệm vụ thành công");

}


// SHOW ERROR

function showError(selector, message, display, inputSelector) {

    let element = document.querySelector(selector);
    let input = document.querySelector(inputSelector);

    element.textContent = message;
    element.style.display = display;

    if (display === "block") {
        input.classList.add("error-input");
    } else {
        input.classList.remove("error-input");
    }
}


// VALIDATE TASK


// EDIT TASK


// DELETE TASK


// SEARCH TASK


// LOGOUT

function logout() {

    cancelModal();

    localStorage.removeItem("currentUser");

    showToast("Đăng xuất thành công");

    setTimeout(() => {
        window.location.href = "../pages/login.html";
    }, 1000);

}


// INIT

renderProjectInfo();

renderTasks()
