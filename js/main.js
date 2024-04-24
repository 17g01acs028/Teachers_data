document.addEventListener("DOMContentLoaded", function (event) {
    var modal = document.getElementById('id01');
    modal.style.display = "none";
    /**
     * toggle active class on header
     * when clicked nav-toggle-btn
     */
    var header = document.querySelector("[data-header]");
    var navToggleBtn = document.querySelector("[data-menu-toggle-btn]");
    navToggleBtn.addEventListener("click", function () {
        header.classList.toggle("active");
    });
    /**
     * toggle ctx-menu when click on card-menu-btn
     */
    var menuBtn = document.querySelectorAll("[data-menu-btn]");
    for (var i = 0; i < menuBtn.length; i++) {
        menuBtn[i].addEventListener("click", function () {
            this.nextElementSibling.classList.toggle("active");
        });
    }
    var setUsername = document.getElementById("username");
    setUsername.innerText = localStorage && localStorage.getItem("username") || "";
});
