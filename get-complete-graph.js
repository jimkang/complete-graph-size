var math = require('basic-2d-math');
// Get the edges for a complete graph.

function getCompleteGraph({ vertices }) {
  var graph = [];
  vertices.map(createEdgesToOtherPoints);
  return graph;

  function createEdgesToOtherPoints(point, i) {
    for (var j = 0; j < vertices.length; ++j) {
      if (i !== j) {
        graph.push({
          start: i,
          dest: j,
          x1: point[0],
          y1: point[1],
          x2: vertices[j][0],
          y2: vertices[j][1],
          dist: math.getVectorMagnitude(math.subtractPairs(point, vertices[j]))
        });
      }
    }
  }
}

module.exports = getCompleteGraph;
