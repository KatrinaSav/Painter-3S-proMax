const drawSegmentDDA = function (coordinates) {
  const targetLeght = Math.max(
    Math.abs(coordinates['2'].x - coordinates['1'].x),
    Math.abs(coordinates['2'].y - coordinates['1'].y)
  )
  let points = []
  const deltaX = (coordinates['2'].x - coordinates['1'].x) / targetLeght

  const deltaY = (coordinates['2'].y - coordinates['1'].y) / targetLeght

  let currentX = coordinates['1'].x + 0.5 * Math.sign(deltaX)
  let currentY = coordinates['1'].y + 0.5 * Math.sign(deltaY)
  for (let index = 0; index < targetLeght; index++) {
    currentX = currentX + deltaX
    currentY = currentY + deltaY
    points.push({ x: parseInt(currentX), y: parseInt(currentY) })
  }
  return points
}

export default drawSegmentDDA
