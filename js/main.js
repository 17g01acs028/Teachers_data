document.addEventListener("DOMContentLoaded", function(event) {
  var modal = document.getElementById('id01');  
  modal.style.display = "none";
/**
 * toggle active class on header
 * when clicked nav-toggle-btn
 */

const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-menu-toggle-btn]");

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


var setUsername = document.getElementById("username");

setUsername.innerText = localStorage.getItem("username");


var setWelcome = document.getElementById("Welcome");
setWelcome.innerText ="Hi "+localStorage.getItem("username");

// Get the modal


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



});

