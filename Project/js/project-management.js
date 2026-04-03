// INITIAL DATA

let users = JSON.parse(localStorage.getItem("users")) || [];
localStorage.setItem("users", JSON.stringify(users));

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "../pages/login.html";
}

let projects = JSON.parse(localStorage.getItem("projects")) || [];

localStorage.setItem("projects", JSON.stringify(projects));


// VARIABLES

let editId = null;
let deleteId = null;

let currentPage = 1;
let perPage = 5;
let searchKeyword = "";


// MODAL

function showModal(type) {
    document.querySelector(`.modal.${type}`).style.display = "block";
}

function cancelModal() {

    document.querySelectorAll(".modal").forEach(modal => {
        modal.style.display = "none";
    });

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

    document.getElementById("addProjectName").value = "";
    document.getElementById("addProjectDesc").value = "";


    document.querySelectorAll(".error").forEach(e => {
        e.style.display = "none";
    });

    document.querySelectorAll("input,textarea").forEach(i => {
        i.classList.remove("error-input");
    });

}


// LẤY PROJECT CỦA OWNER

function getOwnerProjects() {

    return projects.filter(project =>
        project.members.some(
            m => m.userId === currentUser.id && m.role === "Project owner"
        )
    );

}


// RENDER PROJECTS
function renderProjects() {

    let tbody = document.querySelector("tbody");

    let ownerProjects = getOwnerProjects();

    if (searchKeyword) {
        ownerProjects = ownerProjects.filter(p =>
            p.projectName.toLowerCase().includes(searchKeyword)
        );
    }

    if (ownerProjects.length === 0) {

        tbody.innerHTML = `
        <tr>
            <td colspan="3" style="text-align:center;padding:25px;color:#6c757d">
                Chưa có dự án nào
            </td>
        </tr>
        `;

        document.querySelector(".pagination").innerHTML = "";
        return;
    }

    let totalPages = Math.ceil(ownerProjects.length / perPage);

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let start = (currentPage - 1) * perPage;
    let end = start + perPage;

    let pageData = ownerProjects.slice(start, end);

    let html = "";

    pageData.forEach((project, index) => {

        html += `
        <tr>
            <td>${project.id}</td>
            <td>${project.projectName}</td>
            <td>
                <button class="btn btn-edit" onclick="openEdit(${project.id})">Sửa</button>
                <button class="btn btn-delete" onclick="openDelete(${project.id})">Xóa</button>
                <button class="btn btn-detail" onclick="showProjectDetails(${project.id})">Chi tiết</button>
            </td>
        </tr>
        `;
    });

    tbody.innerHTML = html;

    renderPagination(totalPages);
}


// ADD PROJECT

function addProject() {

    let name = document.getElementById("addProjectName").value;
    let desc = document.getElementById("addProjectDesc").value;

    if (!validateProject(name, desc)) return;

    let newProject = {

        id: Math.floor(Math.random() * 1000) + new Date().getMilliseconds(),
        projectName: name,
        projectDesc: desc,
        members: [
            {
                userId: currentUser.id,
                role: "Project owner"
            }
        ]

    };

    projects.push(newProject);

    localStorage.setItem("projects", JSON.stringify(projects));

    cancelModal();
    renderProjects();

    showToast("Thêm dự án thành công");
}


// EDIT PROJECT

function openEdit(id) {

    editId = id;

    let project = projects.find(p => p.id === id);

    document.getElementById("editProjectName").value = project.projectName;
    document.getElementById("editProjectDesc").value = project.projectDesc;

    showModal("edit");
}

function editProject() {

    let name = document.getElementById("editProjectName").value;
    let desc = document.getElementById("editProjectDesc").value;

    if (!validateEditProject(name, desc, editId)) return;

    let project = projects.find(p => p.id === editId);

    project.projectName = name;
    project.projectDesc = desc;

    localStorage.setItem("projects", JSON.stringify(projects));

    cancelModal();
    renderProjects();

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


// VALIDATE ADD

function validateProject(name, desc) {

    let valid = true;

    if (name.trim() === "") {
        showError(".add .error-projectName", "Tên dự án không được để trống", "block", "#addProjectName");
        valid = false;

    } else if (name.length < 5) {
        showError(".add .error-projectName", "Tên dự án tối thiểu 5 ký tự", "block", "#addProjectName");
        valid = false;

    } else {

        let duplicate = projects.find(p =>
            p.projectName.toLowerCase() === name.toLowerCase()
        );

        if (duplicate) {
            showError(".add .error-projectName", "Tên dự án đã tồn tại", "block", "#addProjectName");
            valid = false;
        } else {
            showError(".add .error-projectName", "", "none", "#addProjectName");
        }

    }

    if (desc.trim() === "") {
        showError(".add .error-projectDesc", "Mô tả không được để trống", "block", "#addProjectDesc");
        valid = false;

    } else if (desc.length < 10) {
        showError(".add .error-projectDesc", "Mô tả tối thiểu 10 ký tự", "block", "#addProjectDesc");
        valid = false;

    } else {
        showError(".add .error-projectDesc", "", "none", "#addProjectDesc");
    }

    return valid;
}


// VALIDATE EDIT

function validateEditProject(name, desc, id) {

    let valid = true;

    if (name.trim() === "") {
        showError(".edit .error-projectName", "Tên dự án không được để trống", "block", "#editProjectName");
        valid = false;

    } else if (name.length < 5) {
        showError(".edit .error-projectName", "Tên dự án tối thiểu 5 ký tự", "block", "#editProjectName");
        valid = false;

    } else {

        let duplicate = projects.find(p =>
            p.projectName.toLowerCase() === name.toLowerCase() && p.id !== id
        );

        if (duplicate) {
            showError(".edit .error-projectName", "Tên dự án đã tồn tại", "block", "#editProjectName");
            valid = false;
        } else {
            showError(".edit .error-projectName", "", "none", "#editProjectName");
        }

    }

    if (desc.trim() === "") {
        showError(".edit .error-projectDesc", "Mô tả không được để trống", "block", "#editProjectDesc");
        valid = false;

    } else if (desc.length < 10) {
        showError(".edit .error-projectDesc", "Mô tả tối thiểu 10 ký tự", "block", "#editProjectDesc");
        valid = false;

    } else {
        showError(".edit .error-projectDesc", "", "none", "#editProjectDesc");
    }

    return valid;
}


// DELETE PROJECT

function openDelete(id) {

    deleteId = id;

    showModal("delete");
}

function deleteProject() {

    projects = projects.filter(p => p.id !== deleteId);

    localStorage.setItem("projects", JSON.stringify(projects));

    cancelModal();
    renderProjects();

    showToast("Xóa dự án thành công");
}


// SEARCH PROJECT

function searchProject() {

    let input = document.querySelector(".top-bar input");

    searchKeyword = input.value.trim().toLowerCase();

    currentPage = 1;

    renderProjects();
}


// PROJECT DETAILS

function showProjectDetails(id) {
    localStorage.setItem("currentProjectId", id);
    window.location.href = "../pages/project-details.html";
}


// PAGINATION

function renderPagination(totalPages) {

    let pagination = document.querySelector(".pagination");
    let html = "";

    html += `
        <span class="${currentPage === 1 ? 'disabled' : ''}" onclick="changePage(${currentPage - 1})">&lt;</span>
    `;

    for (let i = 1; i <= totalPages; i++) {
        html += `
            <span class="${currentPage === i ? 'active' : ''}" onclick="changePage(${i})">
                ${i}
            </span>
        `;
    }

    html += `
        <span class="${currentPage === totalPages ? 'disabled' : ''}" onclick="changePage(${currentPage + 1})">&gt;</span>
    `;

    pagination.innerHTML = html;
}

function changePage(page) {

    let ownerProjects = getOwnerProjects();

    if (searchKeyword) {
        ownerProjects = ownerProjects.filter(p =>
            p.projectName.toLowerCase().includes(searchKeyword)
        );
    }

    let totalPages = Math.ceil(ownerProjects.length / perPage);

    if (page < 1 || page > totalPages) return;

    currentPage = page;

    renderProjects();
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

renderProjects();