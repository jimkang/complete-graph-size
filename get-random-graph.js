var math = require('basic-2d-math');
var probable = require('probable');

function getRandomGraph({ vertices }) {
  var graph = [];
  // Leave some points unconnected.
  var baseVertices = probable.sample(
    vertices,
    vertices.length * 0.8 + probable.roll(vertices.length * 0.2)
  );
  if (baseVertices.length < 2) {
    baseVertices = vertices;
  }
  baseVertices.map(createEdgesToOtherPoints);
  return graph;

  function createEdgesToOtherPoints(point, i) {
    var targetVertices = probable.sample(
      baseVertices,
      probable.roll(vertices.length / 2)
    );
    for (var j = 0; j < targetVertices.length; ++j) {
      if (i !== j) {
        graph.push({
          start: i,
          dest: j,
          x1: point[0],
          y1: point[1],
          x2: targetVertices[j][0],
          y2: targetVertices[j][1],
          dist: math.getVectorMagnitude(
            math.subtractPairs(point, targetVertices[j])
          )
        });
      }
    }
  }
}

module.exports = getRandomGraph;
