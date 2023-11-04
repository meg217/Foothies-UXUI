// document.addEventListener('DOMContentLoaded', () => {
//     // Fetch and display all products by default (set 'all' as the default category)
//     //fetchAndDisplayProducts('all'); //fetch all by default
//     const productsList = document.getElementById('products-list ul');
//     //allProductsLink.classList.add('active');

//     // Function to fetch and display products based on category
//     function fetchAndDisplayProducts(category) {
//         fetch(`/api/menu/${category}`)
//             .then(response => response.json())
//             .then(products => {
//                 // Clear existing products
//                 productsList.innerHTML = '';

//                 // Append the new products
//                 products.forEach(product => {
//                     const productItem = document.createElement('li');
//                     productItem.innerHTML = `
//                         <h3>${product.name}</h3>
//                         <p>${product.description}</p>
//                         <p>Price: $${product.price}</p>
//                     `;
//                     productsList.appendChild(productItem);
//                 });
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }


//     // Event listener for category links in the sidebar
//     document.querySelectorAll('.sidebar a').forEach(categoryLink => {
//         categoryLink.addEventListener('click', event => {
//             event.preventDefault();
//             const category = categoryLink.getAttribute('href').split('/').pop();
//             fetchAndDisplayProducts(category);

//             // Remove the "active" class from all category links
//             document.querySelectorAll('.sidebar a').forEach(link => {
//                 link.classList.remove('active');
//             });

//             // Set the clicked category link as the active tab
//             categoryLink.classList.add('active');
//         });
//     });
// });




// // document.addEventListener('DOMContentLoaded', () => {
// //     const productsList = document.getElementById('products-list');

// //     // Function to fetch and display products based on category
// //     function fetchAndDisplayProducts(category) {
// //         fetch(`/api/products/category/${category}`)
// //             .then(response => response.json())
// //             .then(products => {
// //                 // Clear existing products
// //                 productsList.innerHTML = '';

// //                 // Append the new products
// //                 products.forEach(product => {
// //                     const productItem = document.createElement('li');
// //                     productItem.innerHTML = `
// //                         <h3>${product.name}</h3>
// //                         <p>${product.description}</p>
// //                         <p>Price: $${product.price}</p>
// //                     `;
// //                     productsList.appendChild(productItem);
// //                 });
// //             })
// //             .catch(error => {
// //                 console.error(error);
// //             });
// //     }

// //     // Event listener for category links in the sidebar
// //     document.querySelectorAll('.sidebar a').forEach(categoryLink => {
// //         categoryLink.addEventListener('click', event => {
// //             event.preventDefault();
// //             const category = categoryLink.getAttribute('href').split('/').pop();
// //             fetchAndDisplayProducts(category);
// //         });
// //     });
// // });