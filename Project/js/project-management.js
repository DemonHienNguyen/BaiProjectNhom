function showAddModal() {
    document.querySelector('.modal.add').style.display = 'block';
}

function showEditModal() {
    document.querySelector('.modal.edit').style.display = 'block';
}

function showDeleteModal() {
    document.querySelector('.modal.delete').style.display = 'block';
}

function showLogoutModal() {
    document.querySelector(".modal.logout").style.display = 'block';
}

function logout() {
    cancelModal();

    showToast("Đăng xuất thành công");

    setTimeout(() => {
        window.location.href = "../pages/login.html";
    }, 2000);
}

function cancelModal() {
    document.querySelector('.modal.add').style.display = 'none';
    document.querySelector('.modal.edit').style.display = 'none';
    document.querySelector('.modal.delete').style.display = 'none';
    document.querySelector('.modal.logout').style.display = 'none';
}

function showProjectDetails() {
    window.location.href = "../pages/project-details.html";
}

function addProject() {
    document.querySelector(".error-project").style.display = "block";
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}