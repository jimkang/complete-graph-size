var renderEdges = require('../dom/render-edges');
var renderPoints = require('../dom/render-points');
var getCompleteGraphVertexPositions = require('../get-complete-graph-vertex-positions');
var getCompleteGraph = require('../get-complete-graph');
var colorScales = require('d3-scale-chromatic');
var curry = require('lodash.curry');

function GraphExampleFlow({ stepSelector }) {
  var controlInitialized = false;
  var exampleGraphVerticesControl = document.querySelector(
    stepSelector + ' .graph-vertices-control'
  );
  var vertexCountLabel = document.querySelector(
    stepSelector + ' .vertex-count-label'
  );
  return graphExampleFlow;

  function graphExampleFlow() {
    if (!controlInitialized) {
      exampleGraphVerticesControl.addEventListener('change', graphExampleFlow);
      controlInitialized = true;
    }

    var numberOfVertices = Math.round(+exampleGraphVerticesControl.value);
    vertexCountLabel.textContent = numberOfVertices;
    var vertices = getCompleteGraphVertexPositions({
      numberOfVertices,
      width: 100,
      height: 100,
      margin: 5
    });
    var edges = getCompleteGraph({ vertices });

    renderEdges({
      edges,
      className: 'graph-edge',
      rootSelector: stepSelector + ' .graph-edge-root',
      colorAccessor: curry(getEdgeColor)(edges.length) // 'rgb(237, 121, 83)'
    });

    renderPoints({
      points: vertices,
      className: 'graph-vertex',
      rootSelector: stepSelector + ' .graph-vertex-root',
      labelAccessor: getIndex
    });
  }
}

function getIndex(d, i) {
  return i;
}

function getEdgeColor(edgeCount, d, i) {
  return colorScales.interpolateViridis(i / edgeCount);
}

module.exports = GraphExampleFlow;
