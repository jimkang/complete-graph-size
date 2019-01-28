var handleError = require('handle-error-web');
var GraphExampleFlow = require('./flows/graph-example-flow');
var triangularNumberFlow = require('./flows/triangular-number-flow');
var introFlow = require('./flows/intro-flow');

var graphExampleFlow = GraphExampleFlow({
  stepSelector: '#complete-graph-step'
});
var veRelationshipGraphFlow = GraphExampleFlow({
  stepSelector: '#v-e-relationship-step'
});

(function go() {
  window.onerror = reportTopLevelError;
  introFlow();
  graphExampleFlow();
  triangularNumberFlow();
  veRelationshipGraphFlow();
})();

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}
