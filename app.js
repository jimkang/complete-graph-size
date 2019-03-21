var handleError = require('handle-error-web');
var GraphExampleFlow = require('./flows/graph-example-flow');
//var triangularNumberFlow = require('./flows/triangular-number-flow');
var introFlow = require('./flows/intro-flow');
var RandomGraphFlow = require('./flows/random-graph-flow');
var range = require('d3-array').range;

var graphExampleFlow = GraphExampleFlow({
  containerSelector: '#complete-graph-step',
  autoslide: true
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
  vertexRadius: 4,
  labelVertices: false
});
var randomGraphFlow = RandomGraphFlow({
  containerSelector: '#graph-step'
});

var veTableGraphFlows = range(1, 11).map(i =>
  GraphExampleFlow({
    containerSelector: `#table-graph-${i}`,
    fixedNumberOfVertices: i,
    vertexRadius: 6
  })
);

(function go() {
  window.onerror = reportTopLevelError;
  introFlow();
  edgeExampleFlow();
  graphExampleFlow();
  staticGraphExample1Flow();
  staticGraphExample2Flow();
  staticGraphExample3Flow();
  //triangularNumberFlow();
  randomGraphFlow();
  veTableGraphFlows.forEach(f => f());
})();

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}
