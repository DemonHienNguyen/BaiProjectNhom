function showAddTaskModal() {
    document.querySelector('.modal.add-task').style.display = 'block';
}
    
function showAddMemberModal() {
    document.querySelector('.modal.add-member').style.display = 'block';
}

function cancelModal() {
    document.querySelector('.modal.add-task').style.display = 'none';
    document.querySelector('.modal.add-member').style.display = 'none';
}