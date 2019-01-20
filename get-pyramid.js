// Gets coordinates to position points in a equilateral triangle,
// with pointsPerSide number of points on each side (and the middle
// filled in). The points will be provided arranged in rows, as well as
// as a flat array.

// opposite over adjacent (which is 1/2 width) = tan(60)
const equilateralHeightToWidthRatio = Math.tan(Math.PI / 3) * 0.5;

function getPyramid({ pointsPerSide, width, height, margin }) {
  const usableWidth = width - 2 * margin;
  const usableHeight = height - 2 * margin;

  var distBetweenPoints = usableWidth / pointsPerSide;
  // opposite over hypotenuse (distBetweenPoints) = sin(60)
  var distBetweenRows = Math.sin(Math.PI / 3) * distBetweenPoints;

  const projectedHeight = equilateralHeightToWidthRatio * usableWidth;
  if (projectedHeight > usableHeight) {
    distBetweenRows = usableHeight / pointsPerSide;
    // opposite (distBetweenRows) over hypotenuse = sin(60)
    distBetweenPoints = distBetweenRows / Math.sin(Math.PI / 3);
  }

  var rows = [];
  var points = [];
  for (var rowIndex = 0; rowIndex < pointsPerSide; ++rowIndex) {
    const pointsInRow = pointsPerSide - rowIndex;
    const y = margin + (pointsInRow - 0.5) * distBetweenRows;
    const leftMargin =
      margin + (usableWidth - pointsInRow * distBetweenPoints) / 2;
    let row = { y, points: [] };
    for (let colIndex = 0; colIndex < pointsInRow; ++colIndex) {
      const x = leftMargin + (colIndex + 0.5) * distBetweenPoints;
      row.points.push([x, y]);
      points.push([x, y]);
    }
    rows.push(row);
  }
  return { rows, distBetweenPoints, points };
}

module.exports = getPyramid;
