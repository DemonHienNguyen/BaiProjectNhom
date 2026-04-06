// INITIAL DATA
let users = JSON.parse(localStorage.getItem("users")) || [];

let projects = JSON.parse(localStorage.getItem("projects")) || [];

let projectId = Number(localStorage.getItem("currentProjectId"));

let project = projects.find(p => p.id === projectId);

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

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

let deleteMemberId = null;


// MODAL

function showModal(type) {
    document.querySelector(`.modal.${type}`).style.display = "block";
}

function cancelModal() {
    document.querySelectorAll(".modal").forEach(m => m.style.display = "none");

    clearForm();
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

    document.querySelectorAll(".error-input").forEach(i => {
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

    let projectTasks = tasks.filter(t => t.projectId === projectId);

    if (projectTasks.length === 0) {
        tbody.innerHTML = `
        <tr>
            <td colspan="7" style="text-align:center;padding:25px;color:#6c757d">
                Chưa có nhiệm vụ nào
            </td>
        </tr>
        `;
        return;
    }

    renderTodoTasks(tbody, projectTasks);
    renderInProgressTasks(tbody, projectTasks);
    renderPendingTasks(tbody, projectTasks);
    renderDoneTasks(tbody, projectTasks);
}

function renderTodoTasks(tbody, projectTasks) {

    tbody.innerHTML += `
    <tr class="project">
        <td colspan="7">▼ To do</td>
    </tr>
    `;

    let tasks = project.tasks.filter(task => task.status === "To Do");

    tasks.forEach(task => {

        tbody.innerHTML += `
        <tr>
            <td>${task.taskName}</td>
            <td>${getUserNameById(task.assigneeId)}</td>
            <td><span class="tag ${getPriorityClass(task.priority)}">${task.priority}</span></td>
            <td>${task.asignDate}</td>
            <td>${task.dueDate}</td>
            <td><span class="tag ${getProgressClass(task.progress)}">${task.progress}</span></td>
            <td>
                <button class="btn btn-edit" onclick="openEditTask(${task.id})">Sửa</button>
                <button class="btn btn-delete" onclick="openDeleteTask(${task.id})">Xóa</button>
            </td>
        </tr>
        `;

    });

}

function renderInProgressTasks(tbody, projectTasks) {

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
            <td>${getUserNameById(task.assigneeId)}</td>
            <td><span class="tag ${getPriorityClass(task.priority)}">${task.priority}</span></td>
            <td>${task.asignDate}</td>
            <td>${task.dueDate}</td>
            <td><span class="tag ${getProgressClass(task.progress)}">${task.progress}</span></td>
            <td>
                <button class="btn btn-edit" onclick="openEditTask(${task.id})">Sửa</button>
                <button class="btn btn-delete" onclick="openDeleteTask(${task.id})">Xóa</button>
            </td>
        </tr>
        `;

    });

}

function renderPendingTasks(tbody, projectTasks) {

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
            <td>${getUserNameById(task.assigneeId)}</td>
            <td><span class="tag ${getPriorityClass(task.priority)}">${task.priority}</span></td>
            <td>${task.asignDate}</td>
            <td>${task.dueDate}</td>
            <td><span class="tag ${getProgressClass(task.progress)}">${task.progress}</span></td>
            <td>
                <button class="btn btn-edit" onclick="openEditTask(${task.id})">Sửa</button>
                <button class="btn btn-delete" onclick="openDeleteTask(${task.id})">Xóa</button>
            </td>
        </tr>
        `;

    });

}

function renderDoneTasks(tbody, projectTasks) {

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
            <td>${getUserNameById(task.assigneeId)}</td>
            <td><span class="tag ${getPriorityClass(task.priority)}">${task.priority}</span></td>
            <td>${task.asignDate}</td>
            <td>${task.dueDate}</td>
            <td><span class="tag ${getProgressClass(task.progress)}">${task.progress}</span></td>
            <td>
                <button class="btn btn-edit" onclick="openEditTask(${task.id})">Sửa</button>
                <button class="btn btn-delete" onclick="openDeleteTask(${task.id})">Xóa</button>
            </td>
        </tr>
        `;

    });

}

function getUserNameById(id) {
    let user = users.find(u => u.id === id);
    return user ? user.fullName : "Không xác định";
}

function getPriorityClass(priority) {
    if (priority === "Cao") {
        return "red";
    } else if (priority === "Trung bình") {
        return "orange";
    } else if (priority === "Thấp") {
        return "blue";
    }
    return "";
}

function getProgressClass(progress) {
    if (progress === "Đúng tiến độ") {
        return "green";
    } else if (progress === "Có rủi ro") {
        return "orange";
    } else if (progress === "Trễ hạn") {
        return "red";
    }
    return "";
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

    if (!validateAddTask(taskName, assigneeId, status, startDate, dueDate, priority, progress)) {
        return;
    }

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


    cancelModal();
    renderTasks();

    showToast("Thêm nhiệm vụ thành công");
}


// EDIT TASK

function openEditTask(id) {

    editTaskId = id;

    let task = tasks.find(t => t.id === id);

    document.getElementById("editTaskName").value = task.taskName;
    document.getElementById("editTaskAssignee").value = task.assigneeId;
    document.getElementById("editTaskStatus").value = task.status;
    document.getElementById("editTaskStartDate").value = task.asignDate;
    document.getElementById("editTaskDueDate").value = task.dueDate;
    document.getElementById("editTaskPriority").value = task.priority;
    document.getElementById("editTaskProgress").value = task.progress;

    showModal("edit-task");
}

function editTask() {

    let name = document.getElementById("editTaskName").value;
    let assigneeId = document.getElementById("editTaskAssignee").value;
    let status = document.getElementById("editTaskStatus").value;
    let startDate = document.getElementById("editTaskStartDate").value;
    let dueDate = document.getElementById("editTaskDueDate").value;
    let priority = document.getElementById("editTaskPriority").value;
    let progress = document.getElementById("editTaskProgress").value;

    if (!validateEditTask(name, assigneeId, status, startDate, dueDate, priority, progress, editTaskId)) {
        return;
    }

    let task = tasks.find(t => t.id === editTaskId);

    task.taskName = name;
    task.assigneeId = Number(assigneeId);
    task.status = status;
    task.asignDate = startDate;
    task.dueDate = dueDate;
    task.priority = priority;
    task.progress = progress;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    cancelModal();
    renderTasks();

    showToast("Cập nhật thành công");
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


// VALIDATE ADD TASK

function validateAddTask(taskName, assigneeId, status, startDate, dueDate, priority, progress) {

    let today = new Date().toISOString().split("T")[0];
    let valid = true;

    if (taskName === "") {
        showError(".add-task .error-taskName", "Tên nhiệm vụ không được để trống", "block", "#addTaskName");
        valid = false;

    } else if (taskName.length < 5) {
        showError(".add-task .error-taskName", "Tên nhiệm vụ tối thiểu 5 ký tự", "block", "#addTaskName");
        valid = false;

    } else {

        let duplicate = tasks.find(t =>
            t.taskName.toLowerCase() === taskName.toLowerCase() && t.projectId === projectId
        );

        if (duplicate) {
            showError(".add-task .error-taskName", "Tên nhiệm vụ đã tồn tại", "block", "#addTaskName");
            valid = false;

        } else {
            showError(".add-task .error-taskName", "", "none", "#addTaskName");
        }
    }

    if (assigneeId === "") {
        showError(".add-task .error-assignee", "Vui lòng chọn người phụ trách", "block", "#addTaskAssignee");
        valid = false;
    } else {
        showError(".add-task .error-assignee", "", "none", "#addTaskAssignee");
    }

    if (status === "") {
        showError(".add-task .error-status", "Vui lòng chọn trạng thái", "block", "#addTaskStatus");
        valid = false;
    } else {
        showError(".add-task .error-status", "", "none", "#addTaskStatus");
    }

    if (startDate === "") {
        showError(".add-task .error-start", "Ngày bắt đầu không được để trống", "block", "#addTaskStartDate");
        valid = false;

    } else if (startDate <= today) {
        showError(".add-task .error-start", "Ngày bắt đầu phải lớn hơn ngày hiện tại", "block", "#addTaskStartDate");
        valid = false;

    } else {
        showError(".add-task .error-start", "", "none", "#addTaskStartDate");
    }

    if (dueDate === "") {
        showError(".add-task .error-end", "Hạn chót không được để trống", "block", "#addTaskDueDate");
        valid = false;

    } else if (startDate && dueDate <= startDate) {
        showError(".add-task .error-end", "Hạn chót phải lớn hơn ngày bắt đầu", "block", "#addTaskDueDate");
        valid = false;

    } else {
        showError(".add-task .error-end", "", "none", "#addTaskDueDate");
    }

    if (priority === "") {
        showError(".add-task .error-priority", "Vui lòng chọn độ ưu tiên", "block", "#addTaskPriority");
        valid = false;
    } else {
        showError(".add-task .error-priority", "", "none", "#addTaskPriority");
    }

    if (progress === "") {
        showError(".add-task .error-progress", "Vui lòng chọn tiến độ", "block", "#addTaskProgress");
        valid = false;
    } else {
        showError(".add-task .error-progress", "", "none", "#addTaskProgress");
    }

    return valid;
}


// VALIDATE EDIT TASK

function validateEditTask(taskName, assigneeId, status, startDate, dueDate, priority, progress, id) {

    let today = new Date().toISOString().split("T")[0];
    let valid = true;

    if (taskName === "") {
        showError(".edit-task .error-taskName", "Tên nhiệm vụ không được để trống", "block", "#editTaskName");
        valid = false;

    } else if (taskName.length < 5) {
        showError(".edit-task .error-taskName", "Tên nhiệm vụ tối thiểu 5 ký tự", "block", "#editTaskName");
        valid = false;

    } else {

        let duplicate = tasks.find(t =>
            t.taskName.toLowerCase() === taskName.toLowerCase() && t.projectId === projectId && t.id !== id
        );

        if (duplicate) {
            showError(".edit-task .error-taskName", "Tên nhiệm vụ đã tồn tại", "block", "#editTaskName");
            valid = false;

        } else {
            showError(".edit-task .error-taskName", "", "none", "#editTaskName");
        }
    }

    if (assigneeId === "") {
        showError(".edit-task .error-assignee", "Vui lòng chọn người phụ trách", "block", "#editTaskAssignee");
        valid = false;
    } else {
        showError(".edit-task .error-assignee", "", "none", "#editTaskAssignee");
    }

    if (status === "") {
        showError(".edit-task .error-status", "Vui lòng chọn trạng thái", "block", "#editTaskStatus");
        valid = false;
    } else {
        showError(".edit-task .error-status", "", "none", "#editTaskStatus");
    }

    if (startDate === "") {
        showError(".edit-task .error-start", "Ngày bắt đầu không được để trống", "block", "#editTaskStartDate");
        valid = false;

    } else if (startDate <= today) {
        showError(".edit-task .error-start", "Ngày bắt đầu phải lớn hơn ngày hiện tại", "block", "#editTaskStartDate");
        valid = false;

    } else {
        showError(".edit-task .error-start", "", "none", "#editTaskStartDate");
    }

    if (dueDate === "") {
        showError(".edit-task .error-end", "Hạn chót không được để trống", "block", "#editTaskDueDate");
        valid = false;

    } else if (startDate && dueDate <= startDate) {
        showError(".edit-task .error-end", "Hạn chót phải lớn hơn ngày bắt đầu", "block", "#editTaskDueDate");
        valid = false;

    } else {
        showError(".edit-task .error-end", "", "none", "#editTaskDueDate");
    }

    if (priority === "") {
        showError(".edit-task .error-priority", "Vui lòng chọn độ ưu tiên", "block", "#editTaskPriority");
        valid = false;
    } else {
        showError(".edit-task .error-priority", "", "none", "#editTaskPriority");
    }

    if (progress === "") {
        showError(".edit-task .error-progress", "Vui lòng chọn tiến độ", "block", "#editTaskProgress");
        valid = false;
    } else {
        showError(".edit-task .error-progress", "", "none", "#editTaskProgress");
    }

    return valid;
}


// DELETE TASK

function openDeleteTask(id) {

    deleteTaskId = id;

    showModal("delete-task");

}

function deleteTask() {

    tasks = tasks.filter(t => t.id !== deleteTaskId);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    project.tasks = tasks.filter(t => t.projectId === projectId);

    renderTasks();

    cancelModal();

    showToast("Xóa nhiệm vụ thành công");
}


// SEARCH TASK


// RENDER MEMBERS

function renderMembers() {

    let members = document.querySelector(".members");

    members.innerHTML = "";

    let member = project.members || [];

    member.slice(0, 2).forEach(member => {

        let user = users.find(u => u.id === member.userId);
        if (!user) return;

        members.innerHTML += `
        <div class="member">
            <div class="avatar avatar-blue">${user.fullName.slice(0, 2).toUpperCase()}</div>
            <div>
                <b>${user.fullName}</b>
                <p>${member.role}</p>
            </div>
        </div>
        `;
    });

    members.innerHTML += `
        <button class="btn avatar more" onclick="showModal('more-members')">
            <i class="fa-solid fa-ellipsis"></i>
        </button>
    `;
}

// RENDER MORE MEMBERS

function renderMoreMembers() {

    let members = document.querySelector(".member-table");

    members.innerHTML = "";

    let memberIds = project.members || [];

    memberIds.forEach(member => {

        let user = users.find(u => u.id === member.userId);

        if (!user) return;

        members.innerHTML += `
        <tr>
            <td class="member-info">
                <div class="avatar avatar-blue">${user.fullName.slice(0, 2).toUpperCase()}</div>
                <div>
                    <p class="member-name">${user.fullName}</p>
                    <p class="member-email">${user.email}</p>
                </div>
            </td>

            <td class="member-role">
                <select>
                    <option ${member.role === "Project owner" ? "selected" : ""}>Project owner</option>
                    <option ${member.role === "Frontend developer" ? "selected" : ""}>Frontend developer</option>
                    <option ${member.role === "Backend developer" ? "selected" : ""}>Backend developer</option>
                    <option ${member.role === "Tester" ? "selected" : ""}>Tester</option>
                    <option ${member.role === "Designer" ? "selected" : ""}>Designer</option>
                </select>
                <span class="delete" onclick="openDeleteMember(${member.userId})"">
                    <i class="fa-solid fa-trash-can" style="color:red"></i>
                </span>
            </td>
        </tr>
        `;
    });
}


// DELETE MEMBER

function openDeleteMember(id) {
    deleteMemberId = id;
    showModal("delete-member");
}

function deleteMember() {

    project.members = project.members.filter(m => m.userId !== deleteMemberId);

    localStorage.setItem("projects", JSON.stringify(projects));

    renderMembers();
    renderMoreMembers();

    cancelModal();
}

// CHANGE ROLE

function changeRole(userId, role) {

    let member = project.members.find(m => m.userId === userId);

    if (member) {
        member.role = role;
    }

    localStorage.setItem("projects", JSON.stringify(projects));
}


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

renderTasks();

renderMembers();

renderMoreMembers();