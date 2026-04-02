// INITIAL DATA

let projects = JSON.parse(localStorage.getItem("projects")) || [];

let projectId = Number(localStorage.getItem("currentProjectId"));

let project = projects.find(p => p.id === projectId);

if (!project.tasks) project.tasks = [];


let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "../pages/login.html";
}


// VARIABLES


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

    document.getElementById("").value = "";


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


// ADD TASK


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
