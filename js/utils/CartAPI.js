var FluxCartActions = require('../actions/FluxCartActions');

var CartAPI = {

  getProductData: function() {
    var data = JSON.parse(localStorage.getItem('product'));
    FluxCartActions.receiveProduct(data);
  }

};

module.exports = CartAPI;
