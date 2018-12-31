var d3 = require('d3-selection');

function renderPoints({
  points,
  className,
  rootSelector,
  xProperty = '0',
  yProperty = '1',
  dx = -12,
  dy = 0,
  r = 1,
  labelAccessor,
  colorAccessor
}) {
  const pointSelector = '.' + className;
  var pointsRoot = d3.select(rootSelector);
  pointsRoot.selectAll(pointSelector).remove();
  var pointStems = pointsRoot
    .selectAll(pointSelector)
    .data(points)
    .enter()
    .append('g')
    .classed(className, true)
    .attr('transform', getTransform);

  var pointCircles = pointStems
    .append('circle')
    .attr('r', r)
    .attr('cx', 0)
    .attr('cy', 0);

  if (labelAccessor) {
    pointStems
      .append('text')
      .attr('dx', dx)
      .attr('dy', dy)
      .text(labelAccessor);
  }
  if (colorAccessor) {
    pointCircles.attr('fill', colorAccessor);
  }

  function getTransform(point) {
    return `translate(${point[xProperty]}, ${point[yProperty]})`;
  }
}

module.exports = renderPoints;
