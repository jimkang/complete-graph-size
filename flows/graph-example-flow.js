var controlInitialized = false;
var exampleGraphVerticesControl = document.getElementById(
  'example-graph-vertices-control'
);
var vertexCountLabel = document.querySelector(
  '#complete-graph-step .vertex-count-label'
);
var renderEdges = require('../dom/render-edges');
var renderPoints = require('../dom/render-points');
var getVertexPositions = require('../get-vertex-positions');
var getCompleteGraph = require('../get-complete-graph');

function graphExampleFlow() {
  if (!controlInitialized) {
    exampleGraphVerticesControl.addEventListener('change', graphExampleFlow);
    controlInitialized = true;
  }

  var numberOfVertices = Math.round(+exampleGraphVerticesControl.value);
  vertexCountLabel.textContent = numberOfVertices;
  var vertices = getVertexPositions({
    numberOfVertices,
    width: 100,
    height: 100,
    margin: 20
  });
  var edges = getCompleteGraph({ vertices });

  renderEdges({
    edges,
    className: 'graph-edge',
    rootSelector: '#complete-graph-example-edge-root',
    colorAccessor: 'blue'
  });

  renderPoints({
    points: vertices,
    className: 'graph-vertex',
    rootSelector: '#complete-graph-example-vertex-root',
    labelAccessor: getIndex,
    r: 4
  });
}

function getIndex(d, i) {
  return i;
}

module.exports = graphExampleFlow;
