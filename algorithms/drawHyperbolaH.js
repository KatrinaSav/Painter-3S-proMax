const drawHyperbolaH = function (coordinates, ctx) {
  const x1 = coordinates['1'].x
  const y1 = coordinates['1'].y
  const x2 = coordinates['2'].x
  const y2 = coordinates['2'].y
  const a = Math.abs(x2 - x1)
  const b = Math.abs(y2 - y1)
  let points = []
  let x = a
  let y = 0
  while (y < 300 || x < 300) {
    console.log(y, x)
    const verticalError = getError(x, y + 1, a, b)
    const horizontalError = getError(x + 1, y, a, b)
    const diagonalError = getError(x + 1, y + 1, a, b)
    const minError = Math.min(verticalError, horizontalError, diagonalError)
    if (minError === verticalError) {
      y++
    } else if (minError === horizontalError) {
      x++
    } else {
      y++
      x++
    }
    points.push({ x: x1 + x, y: y1 + y })
    points.push({ x: x1 - x, y: y1 + y })
    points.push({ x: x1 - x, y: y1 - y })
    points.push({ x: x1 + x, y: y1 - y })
  }
  return points
}

function getError(x, y, a, b) {
  return Math.abs(x ** 2 / a ** 2 - y ** 2 / b ** 2 - 1)
}
export default drawHyperbolaH
