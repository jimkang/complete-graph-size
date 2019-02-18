var renderEdges = require('../dom/render-edges');
var renderPoints = require('../dom/render-points');
var getRandomVertexPositions = require('../get-random-vertex-positions');
var getRandomGraph = require('../get-random-graph');
var colorScales = require('d3-scale-chromatic');
var curry = require('lodash.curry');
var probable = require('probable');

function RandomGraphFlow({ containerSelector, labelVertices = true }) {
  return randomGraphFlow;

  function randomGraphFlow() {
    var boards = document.querySelectorAll(
      `${containerSelector} .random-graph-board`
    );

    for (var i = 0; i < boards.length; ++i) {
      createRandomGraph('#' + boards[i].id);
    }
  }

  function createRandomGraph(graphContainerSelector) {
    var vertices = getRandomVertexPositions({
      numberOfVertices: probable.roll(10) + 2,
      width: 100,
      height: 100,
      margin: 5
    });
    var edges = getRandomGraph({ vertices });

    renderEdges({
      edges,
      className: 'graph-edge',
      rootSelector: graphContainerSelector + ' .graph-edge-root',
      colorAccessor: curry(getEdgeColor)(edges.length) // 'rgb(237, 121, 83)'
    });

    renderPoints({
      points: vertices,
      className: 'graph-vertex',
      rootSelector: graphContainerSelector + ' .graph-vertex-root',
      labelAccessor: labelVertices ? getIndex : undefined
    });
  }
}

function getIndex(d, i) {
  return i;
}

function getEdgeColor(edgeCount, d, i) {
  return colorScales.interpolateViridis(i / edgeCount);
}

module.exports = RandomGraphFlow;
