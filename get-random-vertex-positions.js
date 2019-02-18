var probable = require('probable');

function getRandomVertexPositions({ numberOfVertices, width, height, margin }) {
  // Get random points.
  var positions = [];
  for (let i = 0; i < numberOfVertices; ++i) {
    positions.push([
      margin + probable.roll(width - 2 * margin),
      margin + probable.roll(height - 2 * margin)
    ]);
  }
  return positions;
}

module.exports = getRandomVertexPositions;
