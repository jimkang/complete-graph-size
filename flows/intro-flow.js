var renderEdges = require('../dom/render-edges');
var renderPoints = require('../dom/render-points');
var getCompleteGraphVertexPositions = require('../get-complete-graph-vertex-positions');
var getCompleteGraph = require('../get-complete-graph');
var getPyramid = require('../get-pyramid');
var GraphExampleFlow = require('./graph-example-flow');

var introGraphExampleFlow = GraphExampleFlow({
  containerSelector: '#intro-step',
  fixedNumberOfVertices: 32
});

function introFlow() {
  introGraphExampleFlow();

  makeGraphInPanel({
    rootSelector: '#small-intro-graph-board',
    numberOfVertices: 21
  });
  makeTriangleInPanel({
    rootSelector: '#small-intro-triangular-number-board',
    pointsPerSide: 20
  });
  makeGraphInPanel({
    rootSelector: '#big-intro-graph-board',
    numberOfVertices: 101
  });
  makeTriangleInPanel({
    rootSelector: '#big-intro-triangular-number-board',
    pointsPerSide: 100
  });
}

function makeGraphInPanel({ rootSelector, numberOfVertices }) {
  var vertices = getCompleteGraphVertexPositions({
    numberOfVertices,
    width: 100,
    height: 100,
    margin: 10
  });
  var edges = getCompleteGraph({ vertices });

  renderEdges({
    edges,
    className: 'graph-edge',
    rootSelector: rootSelector + ' .graph-edge-root',
    colorAccessor: 'rgb(151, 237, 123)'
  });

  renderPoints({
    points: vertices,
    className: 'graph-vertex',
    rootSelector: rootSelector + ' .graph-vertex-root'
  });
}

function makeTriangleInPanel({ rootSelector, pointsPerSide }) {
  var pyramid = getPyramid({
    pointsPerSide,
    width: 100,
    height: 100,
    margin: 0
  });

  renderPoints({
    points: pyramid.points,
    className: 'graph-vertex',
    rootSelector: rootSelector + ' .triangle-dot-root'
  });
}

module.exports = introFlow;
