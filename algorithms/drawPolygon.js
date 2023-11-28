import drawSegmentBresenhem from './drawSegmentBresenhem.js'
const drawPolygon = function (coordinates) {
  let points = []
  let signs = []
  const keyArray = Object.keys(coordinates)
  signs.push(
    Math.sign(
      (coordinates[keyArray[keyArray.length - 1]].x -
        coordinates[keyArray[keyArray.length - 2]].x) *
        (coordinates[keyArray[0]].y -
          coordinates[keyArray[keyArray.length - 1]].y) -
        (coordinates[keyArray[keyArray.length - 1]].y -
          coordinates[keyArray[keyArray.length - 2]].y) *
          (coordinates[keyArray[0]].x -
            coordinates[keyArray[keyArray.length - 1]].x)
    )
  )
  points.push(
    ...drawSegmentBresenhem({
      1: coordinates[keyArray[0]],
      2: coordinates[keyArray[keyArray.length - 1]],
    })
  )
  for (let ind = 0; ind < keyArray.length - 1; ind++) {
    points.push(
      ...drawSegmentBresenhem({
        1: coordinates[keyArray[ind]],
        2: coordinates[keyArray[ind + 1]],
      })
    )
  }
  for (let ind = 1; ind < keyArray.length - 1; ind++) {
    signs.push(
      Math.sign(
        (coordinates[keyArray[ind]].x - coordinates[keyArray[ind - 1]].x) *
          (coordinates[keyArray[ind + 1]].y - coordinates[keyArray[ind]].y) -
          (coordinates[keyArray[ind]].y - coordinates[keyArray[ind - 1]].y) *
            (coordinates[keyArray[ind + 1]].x - coordinates[keyArray[ind]].x)
      )
    )
  }
  const answerHTML = document.getElementById('answer')

  if (signs.includes(-1) && signs.includes(1)) {
    clearTimeout(window.timer)
    answerHTML.innerHTML = 'Вогнутый'
    answerHTML.style.display = 'block'
    window.timer = setTimeout(() => {
      answerHTML.style.display = 'none'
    }, 3000)
  } else {
    clearTimeout(window.timer)
    answerHTML.innerHTML = 'Выпуклый'
    answerHTML.style.display = 'block'
    window.timer = setTimeout(() => {
      answerHTML.style.display = 'none'
    }, 3000)
  }
  window.polygons = [...window.polygons, coordinates]
  return points
}

export default drawPolygon
