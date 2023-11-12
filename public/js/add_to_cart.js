addToCartButton = document.querySelectorAll(".add-to-cart-button");

document
  .querySelectorAll(".add-to-cart-button")
  .forEach(function (addToCartButton) {
    addToCartButton.addEventListener("click", function () {
      addToCartButton.classList.add("added");
    setTimeout(function () {
      addToCartButton.classList.remove("added");

      // Simulate updating the cart total
      var cart = document.getElementById('cart');
      var cartTotal = parseInt(cart.getAttribute('data-totalitems')) || 0;
      var newCartTotal = cartTotal + 1;

      cart.setAttribute('data-totalitems', newCartTotal);
    }, 2000);
    });
  });
