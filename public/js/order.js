 $(document).ready(function () {
    toggleFields();

  // Handle change event of the delivery option dropdown
  $('#deliveryOption').change(function () {
    toggleFields();
  });
// Function to toggle the visibility of address and card fields
function toggleFields() {
  var deliveryOption = $('#deliveryOption').val();

  // Toggle address fields
  if (deliveryOption === 'saved') {
    $('#savedAddress').show();
    $('#newAddress').hide();
  } else if (deliveryOption === 'new') {
    $('#savedAddress').hide();
    $('#newAddress').show();
  } else {
    $('#savedAddress').hide();
    $('#newAddress').hide();
  }
}
 });


$(document).ready(function () {
  toggleFieldsC();


    $('#cardOption').change(function () {
      toggleFieldsC();
    });

  function toggleFieldsC() {
    // Toggle card fields
    var cardOption = $('#cardOption').val();
    if (cardOption === 'saved') {
      $('#savedCard').show();
      $('#newCard').hide();
    } else if (cardOption === 'new') {
      $('#savedCard').hide();
      $('#newCard').show();
    } else {
      $('#savedCard').hide();
      $('#newCard').hide();
    }
  }
});
