let accountBtn = document.getElementById("accountBtn");
let accountMenu = document.getElementById("accountMenu");

accountBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    accountMenu.classList.toggle("active");
});

document.addEventListener("click", () => accountMenu.classList.remove("active"));