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
      addToCartButton.classList.add("added");
        // // update cart total
        // var cart = document.getElementById('cart');
        // var cartTotal = parseInt(cart.getAttribute('data-totalitems')) || 0;
        // var newCartTotal = cartTotal + 1;
        // var cartIcon = cart.querySelector('.bi-cart');
  
        // cart.setAttribute('data-totalitems', newCartTotal);
        // cartIcon.textContent = newCartTotal;

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
  //     fetch(`/add-to-cart/${productId}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       //body: JSON.stringify({ /* additional data if needed */ }),
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     })
  //     .finally(() => {
  //   setTimeout(function () {
  //     addToCartButton.classList.remove("added");

  //   }, 2000);
  //   });
  // });
  // });
