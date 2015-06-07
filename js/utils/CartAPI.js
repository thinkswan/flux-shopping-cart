var FluxCartActions = require('../actions/FluxCartActions');

var CartAPI = {

  getProductData: function() {
    console.log('[CartAPI] Fetching mock data');

    var data = JSON.parse(localStorage.getItem('product'));
    FluxCartActions.receiveProduct(data);
  }

};

module.exports = CartAPI;
