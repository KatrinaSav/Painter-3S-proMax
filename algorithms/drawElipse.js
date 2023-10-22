const drawElipse = function (coordinates, ctx) {
  const x1 = coordinates['one'].x
  const y1 = coordinates['one'].y
  const x2 = coordinates['two'].x
  const y2 = coordinates['two'].y
  const a = Math.abs(x2 - x1)
  const b = Math.abs(y2 - y1)
  let points = []
  let x = 0
  let y = b
  let error = a ** 2 + b ** 2 - 2 * a ** 2 * b
  while (y > 0) {
    console.log(error)
    points.push({ x: x1 + x, y: y2 + y })
    points.push({ x: x1 - x, y: y2 + y })
    points.push({ x: x1 - x, y: y2 - y })
    points.push({ x: x1 + x, y: y2 - y })
    if (error === 0) {
      x++
      y--
      error += b ** 2 * (2 * x + 1) + a ** 2 * (1 - 2 * y)
    } else if (error > 0) {
      let sigma = 2 * (error - b ** 2 * x) - 1
      if (sigma <= 0) {
        x++
        y--
        error += b ** 2 * (2 * x + 1) + a ** 2 * (1 - 2 * y)
      } else {
        y--
        error += a ** 2 * (1 - 2 * y)
      }
    } else {
      let sigma = 2 * (error + a ** 2 * y) - 1
      if (sigma > 0) {
        x++
        y--
        error += b ** 2 * (2 * x + 1) + a ** 2 * (1 - 2 * y)
      } else {
        x++
        error += b ** 2 * (2 * x + 1)
      }
    }
  }
  return points
}

export default drawElipse
