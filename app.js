var handleError = require('handle-error-web');
var graphExampleFlow = require('./flows/graph-example-flow');
var triangularNumberFlow = require('./flows/triangular-number-flow');

(function go() {
  window.onerror = reportTopLevelError;
  graphExampleFlow();
  triangularNumberFlow();
})();

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}
