const drawParabolaV = function (coordinates, ctx) {
  const x1 = coordinates['one'].x
  const y1 = coordinates['one'].y
  const x2 = coordinates['two'].x
  const y2 = coordinates['two'].y
  const p = y2 - y1
  let points = []
  let x = 0
  let y = 0
  while (
    Math.abs(y) < 700 - Math.sign(p) * y1 &&
    Math.abs(x) < 1100 - Math.sign(p) * x1
  ) {
    console.log(y, x)
    const verticalError = getError(x, y + Math.sign(p), p)
    const horizontalError = getError(x + Math.sign(p), y, p)
    const diagonalError = getError(x + Math.sign(p), y + Math.sign(p), p)
    const minError = Math.min(verticalError, horizontalError, diagonalError)
    if (minError === verticalError) {
      y += Math.sign(p)
    } else if (minError === horizontalError) {
      x += Math.sign(p)
    } else {
      y += Math.sign(p)
      x += Math.sign(p)
    }
    points.push({ x: x1 + x, y: y1 + y })
    points.push({ x: x1 - x, y: y1 + y })
    //points.push({ x: x1 - x, y: y1 - y })
    //points.push({ x: x1 + x, y: y1 - y })
  }
  return points
}

function getError(x, y, p) {
  return Math.abs(2 * p * y - x ** 2)
}
export default drawParabolaV
