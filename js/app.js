window.React = require('react');
var ProductData = require('./ProductData');
var CartAPI = require('./utils/CartAPI')
var FluxCartApp = require('./components/FluxCartApp.react');

// Load mock product data into local storage
ProductData.init();

// Use mock API to fetch mock data from local storage and load it into the
// `ProductStore`
CartAPI.getProductData();

// Render FluxCartApp view
React.render(
  <FluxCartApp />,
  document.getElementById('flux-cart')
);
