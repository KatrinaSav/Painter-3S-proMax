import multiplyMatrix from '../utils/multyMatrix.js'

const drawCycleVSpline = function (dots) {
  let points = []
  let coordinates = JSON.parse(JSON.stringify(dots))
  for (let key in coordinates) {
    let value = coordinates[key]

    for (let i = -2; i <= 2; i++) {
      points.push({ x: value.x + i, y: value.y, fill: 'red' })
      points.push({ x: value.x + i, y: value.y + i, fill: 'red' })
      points.push({ x: value.x, y: value.y + i, fill: 'red' })
    }
  }
  const lastIndex = Object.keys(coordinates)
  coordinates['0'] = coordinates['1']
  coordinates[`${lastIndex.length + 1}`] = coordinates['1']
  coordinates[`${lastIndex.length + 2}`] = coordinates['2']
  coordinates[`${lastIndex.length + 3}`] = coordinates['3']
  console.log(coordinates)
  const matrixBeze = [
    [-1, 3, -3, 1],
    [3, -6, 3, 0],
    [-3, 0, 3, 0],
    [1, 4, 1, 0],
  ]
  const newLastIndex = Object.keys(coordinates)
  for (let i = newLastIndex.length - 1; i >= 4; i--) {
    console.log(i)
    let x1 = coordinates[`${i - 3}`].x
    let x2 = coordinates[`${i - 2}`].x
    let x3 = coordinates[`${i - 1}`].x
    let x4 = coordinates[`${i}`].x

    let y1 = coordinates[`${i - 3}`].y
    let y2 = coordinates[`${i - 2}`].y
    let y3 = coordinates[`${i - 1}`].y
    let y4 = coordinates[`${i}`].y

    const coordinateMatrix = [
      [x1, y1],
      [x2, y2],
      [x3, y3],
      [x4, y4],
    ]
    const resultMatrix = multiplyMatrix(matrixBeze, coordinateMatrix)

    for (let t = 0; t <= 1; t += 0.001) {
      const param = [[t ** 3, t ** 2, t, 1]]
      let result = multiplyMatrix(param, resultMatrix)
      points.push({
        x: Math.floor(result[0][0] / 6),
        y: Math.floor(result[0][1] / 6),
      })
    }
  }
  // console.log(points)
  return points
}

export default drawCycleVSpline
