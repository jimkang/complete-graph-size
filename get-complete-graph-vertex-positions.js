var math = require('basic-2d-math');

function getCompleteGraphVertexPositions({
  numberOfVertices,
  width,
  height,
  margin
}) {
  // Get positions around a circle.
  const radius =
    width > height ? height - 2 * margin : (width - 2 * margin) / 2;
  const center = [width / 2, height / 2];
  var positions = [];
  const circlePortion = (2 * Math.PI) / numberOfVertices;
  for (let i = 0; i < numberOfVertices; ++i) {
    const theta = circlePortion * i;
    const deltaX = radius * Math.cos(theta);
    const deltaY = radius * Math.sin(theta);
    positions.push(math.addPairs(center, [deltaX, deltaY]));
  }
  return positions;
}

module.exports = getCompleteGraphVertexPositions;
