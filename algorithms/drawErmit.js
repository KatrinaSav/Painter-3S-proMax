import multiplyMatrix from '../utils/multyMatrix.js'

const drawErmit = function (coordinates) {
  const x1 = coordinates['1'].x
  const y1 = coordinates['1'].y
  const x2 = coordinates['2'].x
  const y2 = coordinates['2'].y
  const x3 = coordinates['3'].x
  const y3 = coordinates['3'].y
  const x4 = coordinates['4'].x
  const y4 = coordinates['4'].y
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
  }
  for (let key in coordinates) {
    let value = coordinates[key]
    for (let i = -2; i <= 2; i++) {
      points.push({ x: value.x + i, y: value.y, fill: 'red' })
      points.push({ x: value.x + i, y: value.y + i, fill: 'red' })
      points.push({ x: value.x, y: value.y + i, fill: 'red' })
    }
  }
  return points
}

export default drawErmit
