var handleError = require('handle-error-web');
var graphExampleFlow = require('./flows/graph-example-flow');

(function go() {
  window.onerror = reportTopLevelError;
  //wireControls({ makeSillyName: makeSillyNameFlow });
  graphExampleFlow();
})();

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}
