var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = function(action) {
  console.log('[AppDispatcher] Dispatching', action);

  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = AppDispatcher;
