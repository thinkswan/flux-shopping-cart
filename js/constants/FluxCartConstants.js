var keyMirror = require('react/lib/keyMirror');

var Constants = keyMirror({
  CART_ADD: null,       // Add item to cart
  CART_REMOVE: null,    // Remove item from cart
  CART_VISIBLE: null,   // Show or hide the cart
  SET_SELECTED: null,   // Select a product option
  RECEIVE_DATA: null    // Load mock data
});

module.exports = Constants;
