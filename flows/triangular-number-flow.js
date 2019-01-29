var controlInitialized = false;
var triangularSideControl = document.getElementById(
  'triangle-side-length-control'
);
var triangleSideCountLabels = document.querySelectorAll(
  '#triangular-number-step .triangle-side-count-label'
);
var resultLabel = document.querySelector(
  '#triangular-number-step .triangular-number-result-label'
);
var renderPoints = require('../dom/render-points');
var getPyramid = require('../get-pyramid');

function triangularNumberFlow() {
  if (!controlInitialized) {
    triangularSideControl.addEventListener('change', triangularNumberFlow);
    controlInitialized = true;
  }

  var pointsPerSide = Math.round(+triangularSideControl.value);
  for (var i = 0; i < triangleSideCountLabels.length; ++i) {
    triangleSideCountLabels[i].textContent = pointsPerSide;
  }
  resultLabel.textContent = getTriangularNumber(pointsPerSide);
  var pyramid = getPyramid({
    pointsPerSide,
    width: 120,
    height: 100,
    margin: 1
  });

  renderPoints({
    points: pyramid.points,
    className: 'graph-vertex',
    rootSelector: '#triangle-dot-root'
  });
}

function getTriangularNumber(pointsPerSide) {
  return (pointsPerSide * (pointsPerSide + 1)) / 2;
}

module.exports = triangularNumberFlow;
