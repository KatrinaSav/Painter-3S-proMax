const drawCircle = function (coordinates, ctx) {
  const x1 = coordinates['one'].x
  const y1 = coordinates['one'].y
  const x2 = coordinates['two'].x
  const y2 = coordinates['two'].y
  const radius = Math.floor(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2))
  let points = []
  let x = 0
  let y = radius
  let error = 2 - 2 * radius
  while (y > radius / Math.sqrt(2)) {
    points.push({ x: x1 + x, y: y1 + y })
    points.push({ x: x1 + y, y: y1 + x })
    points.push({ x: x1 - y, y: y1 + x })
    points.push({ x: x1 - x, y: y1 + y })
    points.push({ x: x1 - x, y: y1 - y })
    points.push({ x: x1 - y, y: y1 - x })
    points.push({ x: x1 + y, y: y1 - x })
    points.push({ x: x1 + x, y: y1 - y })
    if (error === 0) {
      x++
      y--
      error += 2 * x - 2 * y + 2
    } else if (error > 0) {
      let sigma =
        Math.abs((x + 1) ** 2 + y ** 2 - radius ** 2) -
        Math.abs((x + 1) ** 2 + (y + 1) ** 2 - radius ** 2)
      if (sigma <= 0) {
        x++
        y--
        error += 2 * x - 2 * y + 2
      } else {
        y--
        error += -2 * y + 1
      }
    } else {
      let sigma =
        Math.abs(x ** 2 + (y + 1) ** 2 - radius ** 2) -
        Math.abs((x + 1) ** 2 + (y + 1) ** 2 - radius ** 2)
      if (sigma > 0) {
        x++
        y--
        error += 2 * x - 2 * y + 2
      } else {
        x++
        error += 2 * x + 1
      }
    }
  }
  return points
}

export default drawCircle
