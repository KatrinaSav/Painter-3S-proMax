import multiplyMatrix from '../utils/multyMatrix.js'

const drawErmit = function (coordinates, ctx) {
  const x1 = coordinates['one'].x
  const y1 = coordinates['one'].y
  const x2 = coordinates['two'].x
  const y2 = coordinates['two'].y
  const x3 = coordinates['three'].x
  const y3 = coordinates['three'].y
  const x4 = coordinates['four'].x
  const y4 = coordinates['four'].y
  let points = []
  const matrixErmit = [
    [2, -2, 1, 1],
    [-3, 3, -2, -1],
    [0, 0, 1, 0],
    [1, 0, 0, 0],
  ]
  const coordinateMatrix = [
    [x1, y1],
    [x3, y3],
    [x2, y2],
    [x4, y4],
  ]
  const resultMatrix = multiplyMatrix(matrixErmit, coordinateMatrix)

  for (let t = 0; t <= 1; t += 0.001) {
    const param = [[t ** 3, t ** 2, t, 1]]
    let result = multiplyMatrix(param, resultMatrix)
    points.push({ x: Math.floor(result[0][0]), y: Math.floor(result[0][1]) })
    console.log(result)
  }
  for (let key in coordinates) {
    let value = coordinates[key]
    for (let i = -2; i <= 2; i++) {
      ctx.fillRect(value.x + i, value.y, 1, 1)
      ctx.fillRect(value.x, value.y + i, 1, 1)
    }
  }
  ctx.stroke()
  return points
}

export default drawErmit
