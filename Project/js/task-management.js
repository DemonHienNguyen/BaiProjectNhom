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
    }, 1500);

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