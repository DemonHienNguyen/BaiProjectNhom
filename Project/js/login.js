let users = JSON.parse(localStorage.getItem("users")) || [];

function login(e) {
    e.preventDefault();

    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");

    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();

    let user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        document.getElementById("error-login").style.display = "block";

        emailInput.classList.add("error-input");
        passwordInput.classList.add("error-input");

    } else {
        document.getElementById("error-login").style.display = "none";

        emailInput.classList.remove("error-input");
        passwordInput.classList.remove("error-input");

        window.location.href = "../pages/project-management.html";
    }
}