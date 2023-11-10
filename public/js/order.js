 $(document).ready(function () {
    toggleAddressFields();

    // Handle change event of the delivery option dropdown
    $('#deliveryOption').change(function () {
      toggleAddressFields();
    });

    // Function to toggle the visibility of address fields
    function toggleAddressFields() {
      var deliveryOption = $('#deliveryOption').val();
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

