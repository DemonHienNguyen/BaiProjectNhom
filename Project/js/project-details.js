function showAddTaskModal() {
    document.querySelector('.modal.add-task').style.display = 'block';
}
    
function showAddMemberModal() {
    document.querySelector('.modal.add-member').style.display = 'block';
}

function showEditModal() {
    document.querySelector('.modal.edit-task').style.display = 'block';
}

function showDeleteModal() {
    document.querySelector('.modal.delete-task').style.display = 'block';
}

function showMoreMembersModal() {
    document.querySelector('.modal.more-members').style.display = 'block';
}

function showLogoutModal() {
    document.querySelector('.modal.logout').style.display = 'block';
}

function logout(){
    window.location.href = "../pages/login.html";
}

function cancelModal() {
    document.querySelector('.modal.add-task').style.display = 'none';
    document.querySelector('.modal.add-member').style.display = 'none';
    document.querySelector('.modal.edit-task').style.display = 'none';
    document.querySelector('.modal.delete-task').style.display = 'none';
    document.querySelector('.modal.more-members').style.display = 'none';
    document.querySelector('.modal.logout').style.display = 'none';
}

function addTask() {
    document.querySelector(".error-task").style.display = "block";
}

function addMember() {
    document.querySelector(".error-member").style.display = "block";
}