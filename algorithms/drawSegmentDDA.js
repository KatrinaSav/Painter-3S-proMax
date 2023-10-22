const drawSegmentDDA = function (coordinates, ctx) {
  const targetLeght = Math.max(
    Math.abs(coordinates['two'].x - coordinates['one'].x),
    Math.abs(coordinates['two'].y - coordinates['one'].y)
  )
  let points = []
  const deltaX = (coordinates['two'].x - coordinates['one'].x) / targetLeght

  const deltaY = (coordinates['two'].y - coordinates['one'].y) / targetLeght

  let currentX = coordinates['one'].x + 0.5 * Math.sign(deltaX)
  let currentY = coordinates['one'].y + 0.5 * Math.sign(deltaY)
  for (let index = 0; index < targetLeght; index++) {
    currentX = currentX + deltaX
    currentY = currentY + deltaY
    points.push({ x: parseInt(currentX), y: parseInt(currentY) })
  }
  return points
}

export default drawSegmentDDA
