// Get the modal
var login_modal = document.getElementById("loginModal");
var closeButton = document.querySelector("#loginModal .close");
var loginBtn = document.getElementById("loginButton");

loginBtn.addEventListener("click", function (event) {
  event.preventDefault();
  login_modal.style.display = "block";
});

closeButton.addEventListener("click", function () {
  login_modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === login_modal) {
    login_modal.style.display = "none";
  }
});
