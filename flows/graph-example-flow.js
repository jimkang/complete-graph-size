var renderEdges = require('../dom/render-edges');
var renderPoints = require('../dom/render-points');
var getCompleteGraphVertexPositions = require('../get-complete-graph-vertex-positions');
var getCompleteGraph = require('../get-complete-graph');
var colorScales = require('d3-scale-chromatic');
var curry = require('lodash.curry');

function GraphExampleFlow({
  containerSelector,
  fixedNumberOfVertices,
  labelVertices = true,
  vertexRadius,
  autoslide = false,
  autoslideInterval = 1000
}) {
  var controlInitialized = false;
  var exampleGraphVerticesControl = document.querySelector(
    containerSelector + ' .graph-vertices-control'
  );
  var vertexCountLabel = document.querySelector(
    containerSelector + ' .vertex-count-label'
  );
  var settingLinks = document.querySelectorAll('.complete-graph-setting-link');
  var autoslideDirection = 1;
  var automoveTimeoutKey;

  return graphExampleFlow;

  function graphExampleFlow() {
    if (!controlInitialized && exampleGraphVerticesControl) {
      exampleGraphVerticesControl.addEventListener(
        'change',
        onVerticesControlChange
      );
      for (var i = 0; i < settingLinks.length; ++i) {
        settingLinks[i].addEventListener('click', onSettingLinkClick);
      }
      controlInitialized = true;
    }

    var numberOfVertices;
    if (isNaN(fixedNumberOfVertices)) {
      numberOfVertices = Math.round(+exampleGraphVerticesControl.value);
      if (vertexCountLabel) {
        vertexCountLabel.textContent = numberOfVertices;
      }
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
      labelAccessor: labelVertices ? getIndex : undefined,
      r: vertexRadius
    });

    if (autoslide) {
      automoveTimeoutKey = setTimeout(automoveSlider, autoslideInterval);
    }
  }

  function onVerticesControlChange() {
    clearTimeout(automoveTimeoutKey);
    autoslide = false;
    graphExampleFlow();
  }

  function automoveSlider() {
    var max = +exampleGraphVerticesControl.max;
    var min = +exampleGraphVerticesControl.min;
    var newVal = +exampleGraphVerticesControl.value + autoslideDirection;
    if (autoslideDirection > 0 && newVal >= max) {
      newVal = max;
      autoslideDirection = -1;
    }
    if (autoslideDirection < 0 && newVal <= min) {
      newVal = min;
      autoslideDirection = 1;
    }
    exampleGraphVerticesControl.value = newVal;
    setTimeout(graphExampleFlow, 0);
  }

  function onSettingLinkClick(e) {
    clearTimeout(automoveTimeoutKey);
    autoslide = false;
    exampleGraphVerticesControl.value = +e.target.dataset.setting;
    graphExampleFlow();
  }
}

function getIndex(d, i) {
  return i;
}

function getEdgeColor(edgeCount, d, i) {
  return colorScales.interpolateViridis(i / edgeCount);
}

module.exports = GraphExampleFlow;
