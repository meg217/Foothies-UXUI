document.addEventListener('DOMContentLoaded', function () {
// addToCartButton = document.querySelectorAll(".add-to-cart-button");

// document
//   .querySelectorAll(".add-to-cart-button")
//   .forEach(function (addToCartButton) {
//     addToCartButton.addEventListener("click", function () {
//       addToCartButton.classList.add("added");
addToCartButton = document.querySelectorAll(".add-to-cart-button");

  addToCartButton.forEach(function (addToCartButton) {
    addToCartButton.addEventListener("click", async function () {
      const sessionId = addToCartButton.getAttribute("data-user-session");
      if (sessionId == 0) {
        // Redirect to the login page if the user is not authenticated
        window.location.href = '/login.html?error=Please choose a login method to continue shopping.';
        return;
      }

      addToCartButton.classList.add("added");

      const productId = addToCartButton.getAttribute("data-product-id");


      try {
        const response = await fetch(`/menu/add-to-cart/${productId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);

        var cart = document.getElementById('cart');
        var cartIcon = cart.querySelector('.bi-cart');
        cart.setAttribute('data-totalitems', data.cartTotal);
        cartIcon.textContent = data.cartTotal;

      } catch (error) {
        console.error("Error:", error);
      } finally {
        setTimeout(function () {
          addToCartButton.classList.remove("added");
        }, 2000);
      }
    });
  });
});

