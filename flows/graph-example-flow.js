var renderEdges = require('../dom/render-edges');
var renderPoints = require('../dom/render-points');
var getCompleteGraphVertexPositions = require('../get-complete-graph-vertex-positions');
var getCompleteGraph = require('../get-complete-graph');
var colorScales = require('d3-scale-chromatic');
var curry = require('lodash.curry');

function GraphExampleFlow({
  containerSelector,
  fixedNumberOfVertices,
  labelVertices = true
}) {
  var controlInitialized = false;
  var exampleGraphVerticesControl = document.querySelector(
    containerSelector + ' .graph-vertices-control'
  );
  var vertexCountLabel = document.querySelector(
    containerSelector + ' .vertex-count-label'
  );
  var showDerivationsButton = document.querySelector(
    containerSelector + ' .show-derivations-button'
  );
  var derivationCells = document.querySelectorAll(
    containerSelector + ' .derivation'
  );
  return graphExampleFlow;

  function graphExampleFlow() {
    if (!controlInitialized && exampleGraphVerticesControl) {
      exampleGraphVerticesControl.addEventListener('change', graphExampleFlow);
      showDerivationsButton.addEventListener(
        'click',
        toggleDerivationVisibility
      );
      controlInitialized = true;
    }

    var numberOfVertices;
    if (isNaN(fixedNumberOfVertices)) {
      numberOfVertices = Math.round(+exampleGraphVerticesControl.value);
      vertexCountLabel.textContent = numberOfVertices;
    } else {
      numberOfVertices = fixedNumberOfVertices;
    }

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
      rootSelector: containerSelector + ' .graph-edge-root',
      colorAccessor: curry(getEdgeColor)(edges.length) // 'rgb(237, 121, 83)'
    });

    renderPoints({
      points: vertices,
      className: 'graph-vertex',
      rootSelector: containerSelector + ' .graph-vertex-root',
      labelAccessor: labelVertices ? getIndex : undefined
    });
  }

  function toggleDerivationVisibility() {
    var derivationExampleCell = derivationCells[0];
    var opName = 'add';
    showDerivationsButton.textContent = 'Show derivations of edge counts';
    if (derivationExampleCell.classList.contains('hidden')) {
      opName = 'remove';
      showDerivationsButton.textContent = 'Hide derivations of edge counts';
    }
    for (var i = 0; i < derivationCells.length; ++i) {
      derivationCells[i].classList[opName]('hidden');
    }
  }
}

function getIndex(d, i) {
  return i;
}

function getEdgeColor(edgeCount, d, i) {
  return colorScales.interpolateViridis(i / edgeCount);
}

module.exports = GraphExampleFlow;
