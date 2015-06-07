var React = require('react');
var CartStore = require('../stores/CartStore');
var ProductStore = require('../stores/ProductStore');
var FluxProduct = require('./FluxProduct.react');
var FluxCart = require('./FluxCart.react');

// Retrieve state from stores
function getCartState() {
  return {
    product: ProductStore.getProduct(),
    selectedProduct: ProductStore.getSelected(),
    cartItems: CartStore.getCartItems(),
    cartCount: CartStore.getCartCount(),
    cartTotal: CartStore.getCartTotal(),
    cartVisible: CartStore.getCartVisible()
  };
}

// Main controller view
var FluxCartApp = React.createClass({

  // Get initial state from stores
  getInitialState: function() {
    return getCartState();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    ProductStore.addChangeListener(this._onChange);
    CartStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    ProductStore.removeChangeListener(this._onChange);
    CartStore.removeChangeListener(this._onChange);
  },

  // Render child components
  render: function() {
    return (
      <div className="flux-cart-app">
        <FluxCart products={this.state.cartItems} count={this.state.cartCount} total={this.state.cartTotal} visible={this.state.cartVisible} />
        <FluxProduct product={this.state.product} cartItems={this.state.cartItems} selected={this.state.selectedProduct} />
      </div>
    );
  },

  // Update state when stores emit `change` event
  _onChange: function() {
    console.log('[FluxCartApp.react] Received change event from a store, updating state');

    this.setState(getCartState());
  }

});

module.exports = FluxCartApp;
