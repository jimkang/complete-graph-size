var controlInitialized = false;
var triangularSideControl = document.getElementById(
  'triangle-side-length-control'
);
var triangleSideCountLabel = document.querySelector(
  '#triangular-number-step .triangle-side-count-label'
);
var renderPoints = require('../dom/render-points');
var getPyramid = require('../get-pyramid');

function triangularNumberFlow() {
  if (!controlInitialized) {
    triangularSideControl.addEventListener('change', triangularNumberFlow);
    controlInitialized = true;
  }

  var pointsPerSide = Math.round(+triangularSideControl.value);
  triangleSideCountLabel.textContent = pointsPerSide;

  var pyramid = getPyramid({
    pointsPerSide,
    width: 100,
    height: 100,
    margin: 20
  });
  console.log('pyramid', pyramid);

  renderPoints({
    points: pyramid.points,
    className: 'graph-vertex',
    rootSelector: '#triangle-dot-root'
  });
}

// function getIndex(d, i) {
//   return i;
// }
//
// function getEdgeColor(edgeCount, d, i) {
//   return colorScales.interpolateViridis(i / edgeCount);
// }

module.exports = triangularNumberFlow;
