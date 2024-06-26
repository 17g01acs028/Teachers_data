document.addEventListener("DOMContentLoaded", function (event) {
  var modal = document.getElementById('id01') as HTMLElement;
  modal.style.display = "none";
  /**
   * toggle active class on header
   * when clicked nav-toggle-btn
   */

  const header = document.querySelector("[data-header]") as Element;
  const navToggleBtn = document.querySelector("[data-menu-toggle-btn]") as Element;

  navToggleBtn.addEventListener("click", function () {
    header.classList.toggle("active");
  });



  /**
   * toggle ctx-menu when click on card-menu-btn
   */

  const menuBtn = document.querySelectorAll("[data-menu-btn]");

  for (let i = 0; i < menuBtn.length; i++) {
    menuBtn[i].addEventListener("click", function () {
      this.nextElementSibling.classList.toggle("active");
    });
  }


  const setUsername = document.getElementById("username") as HTMLElement;

  setUsername.innerText = localStorage && localStorage.getItem("username") || "";


});


