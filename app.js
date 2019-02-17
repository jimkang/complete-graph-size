var handleError = require('handle-error-web');
var GraphExampleFlow = require('./flows/graph-example-flow');
//var triangularNumberFlow = require('./flows/triangular-number-flow');
var introFlow = require('./flows/intro-flow');
var VERelationshipFlow = require('./flows/v-e-relationship-flow');

var graphExampleFlow = GraphExampleFlow({
  containerSelector: '#complete-graph-step',
  autoslide: true
});
var veRelationshipFlow = VERelationshipFlow({
  containerSelector: '#v-e-relationship-step'
});
var staticGraphExample1Flow = GraphExampleFlow({
  containerSelector: '#static-graph-1',
  fixedNumberOfVertices: 3
});
var staticGraphExample2Flow = GraphExampleFlow({
  containerSelector: '#static-graph-2',
  fixedNumberOfVertices: 4
});
var staticGraphExample3Flow = GraphExampleFlow({
  containerSelector: '#static-graph-3',
  fixedNumberOfVertices: 5
});
var edgeExampleFlow = GraphExampleFlow({
  containerSelector: '#edge-example-container',
  fixedNumberOfVertices: 2,
  labelVertices: false
});

(function go() {
  window.onerror = reportTopLevelError;
  introFlow();
  edgeExampleFlow();
  graphExampleFlow();
  staticGraphExample1Flow();
  staticGraphExample2Flow();
  staticGraphExample3Flow();
  //triangularNumberFlow();
  veRelationshipFlow();
})();

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}
