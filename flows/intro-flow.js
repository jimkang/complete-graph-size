var renderEdges = require('../dom/render-edges');
var renderPoints = require('../dom/render-points');
var getCompleteGraphVertexPositions = require('../get-complete-graph-vertex-positions');
var getCompleteGraph = require('../get-complete-graph');
var colorScales = require('d3-scale-chromatic');
var curry = require('lodash.curry');
var getPyramid = require('../get-pyramid');

function introFlow() {
  var vertices = getCompleteGraphVertexPositions({
    numberOfVertices: 25,
    width: 100,
    height: 100,
    margin: 10
  });
  var edges = getCompleteGraph({ vertices });

  renderEdges({
    edges,
    className: 'graph-edge',
    rootSelector: '#intro-graph-example-edge-root',
    colorAccessor: curry(getEdgeColor)(edges.length) // 'rgb(237, 121, 83)'
  });

  renderPoints({
    points: vertices,
    className: 'graph-vertex',
    rootSelector: '#intro-graph-example-vertex-root',
    labelAccessor: getIndex
  });

  var pyramid = getPyramid({
    pointsPerSide: 20,
    width: 100,
    height: 100,
    margin: 0
  });

  renderPoints({
    points: pyramid.points,
    className: 'graph-vertex',
    rootSelector: '#example-triangle-dot-root'
  });
}

function getIndex(d, i) {
  return i;
}

function getEdgeColor(edgeCount, d, i) {
  return colorScales.interpolateViridis(i / edgeCount);
}

module.exports = introFlow;
