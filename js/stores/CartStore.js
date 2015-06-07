var AppDispatcher = require('../dispatcher/AppDispatcher');
var FluxCartConstants = require('../constants/FluxCartConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

// Define initial data points
var _products = {};
var _cartVisible = false;

// Add product to cart
function add(sku, update) {
  update.quantity = (sku in _products) ? _products[sku].quantity + 1 : 1;
  _products[sku] = _.extend({}, _products[sku], update)
}

// Set cart visibility
function setCartVisible(cartVisible) {
  _cartVisible = cartVisible;
}

// Remove item from cart
function removeItem(sku) {
  delete _products[sku];
}

// Extend Cart Store with EventEmitter to add event capabilities
var CartStore = _.extend({}, EventEmitter.prototype, {

  // Return cart items
  getCartItems: function() {
    return _products;
  },

  // Return number of items in cart
  getCartCount: function() {
    return Object.keys(_products).length;
  },

  // Return total cost of cart
  getCartTotal: function() {
    var total = 0;
    for (product in _products) {
      if (_products.hasOwnProperty(product)) {
        total += _products[product].price * _products[product].quantity;
      }
    }

    return total.toFixed(2);
  },

  // Return cart visibility state
  getCartVisible: function() {
    return _cartVisible;
  },

  // Emit change event
  emitChange: function() {
    console.log('[CartStore] Emitting change event');

    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case FluxCartConstants.CART_ADD:
      console.log('[CartStore] Received CART_ADD action', action.sku, action.update);
      add(action.sku, action.update);
      break;

    case FluxCartConstants.CART_VISIBLE:
      console.log('[CartStore] Received CART_VISIBLE action', action.cartVisible);
      setCartVisible(action.cartVisible);
      break;

    case FluxCartConstants.CART_REMOVE:
      console.log('[CartStore] Received CART_REMOVE action', action.sku);
      removeItem(action.sku);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  CartStore.emitChange();

  return true;
});

module.exports = CartStore;
