let users = JSON.parse(localStorage.getItem("users")) || [];

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function register(e) {
    e.preventDefault();

    let isValid = true;

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (username.length === 0) {
        showError(".error-name", "Vui lòng nhập tên người dùng", "block", "#username");
        isValid = false;
    } else {
        showError(".error-name", "", "none", "#username");
    }

    if (email.length === 0) {
        showError(".error-email", "Vui lòng nhập email", "block", "#email");
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(".error-email", "Email không đúng định dạng", "block", "#email");
        isValid = false;
    } else if (users.some(u => u.email === email)) {
        showError(".error-email", "Email đã được sử dụng", "block", "#email");
        isValid = false;
    } else {
        showError(".error-email", "", "none", "#email");
    }

    if (password.length === 0) {
        showError(".error-password", "Vui lòng nhập mật khẩu", "block", "#password");
        isValid = false;
    } else if (password.length < 8) {
        showError(".error-password", "Mật khẩu phải có ít nhất 8 ký tự", "block", "#password");
        isValid = false;
    } else {
        showError(".error-password", "", "none", "#password");
    }

    if (confirmPassword.length === 0) {
        showError(".error-confirmPassword", "Vui lòng xác nhận mật khẩu", "block", "#confirmPassword");
        isValid = false;
    } else if (password !== confirmPassword) {
        showError(".error-confirmPassword", "Mật khẩu xác nhận không khớp", "block", "#confirmPassword");
        isValid = false;
    } else {
        showError(".error-confirmPassword", "", "none", "#confirmPassword");
    }

    if (isValid) {
        let newUser = {
            id: Math.floor(Math.random() * 1000) + new Date().getMilliseconds(),
            username: username,
            email: email,
            password: password
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        showToast("Đăng ký thành công");

        setTimeout(() => {
            window.location.href = "../pages/project-management.html";
        }, 1000);

    }
}

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

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 1000);
}