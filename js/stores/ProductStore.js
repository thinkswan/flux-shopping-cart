var AppDispatcher = require('../dispatcher/AppDispatcher');
var FluxCartConstants = require('../constants/FluxCartConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

// Define initial data points
var _product = {};
var _selected = null;

// Load product data from mock API
function loadProductData(data) {
  _product = data[0];
  _selected = data[0].variants[0];
}

// Set currently selected product variant
function setSelected(index) {
  _selected = _product.variants[index];
}

// Extend ProductStore with EventEmitter to add event capabilities
var ProductStore = _.extend({}, EventEmitter.prototype, {

  // Return product data
  getProduct: function() {
    return _product;
  },

  // Return selected product
  getSelected: function(){
    return _selected;
  },

  // Emit change event
  emitChange: function() {
    console.log('[ProductStore] Emitting change event');

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
    case FluxCartConstants.RECEIVE_DATA:
      console.log('[ProductStore] Received RECEIVE_DATA action', action.data);
      loadProductData(action.data);
      break;

    case FluxCartConstants.SELECT_PRODUCT:
      console.log('[ProductStore] Received SELECT_PRODUCT action', action.data);
      setSelected(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  ProductStore.emitChange();

  return true;
});

module.exports = ProductStore;
