import getMousePosition from '../utils/getMousePosition.js'
import drawVSpline from '../algorithms/drawVSpline.js'
import drawPolygon from '../algorithms/drawPolygon.js'

let keyPoints = []
let toSwap = []
let swapState = false

const clearOldPoints = function (keys) {
  for (let el of keys) {
    for (let key in el) {
      let value = el[key]
      for (let i = -2; i <= 2; i++) {
        window.ctx.clearRect(value.x + i, value.y, 1, 1)
        window.ctx.clearRect(value.x + i, value.y + i, 1, 1)
        window.ctx.clearRect(value.x, value.y + i, 1, 1)
      }
    }
  }
}
function checkKeyPoints(pos) {
  for (let el of keyPoints) {
    for (let key in el) {
      let value = el[key]
      if (
        value.x - 2 <= pos.x &&
        pos.x <= value.x + 2 &&
        value.y - 2 <= pos.y &&
        pos.y <= value.y + 2
      ) {
        toSwap.push({ el, key })
        console.log('swapafter', toSwap)
      }
    }
  }
  if (toSwap.length === 0) return false
  else return true
}

const clearCurve = function (segments, algorithm) {
  let oldPoints = []
  console.log('segment', segments)
  for (let seg of segments) {
    console.log('segment', seg)
    oldPoints.push(...algorithm(seg))
  }
  oldPoints.forEach((el) => {
    window.ctx.clearRect(el.x, el.y, 1, 1)
  })
}

const drawPoint = function (position) {
  position.fill && (window.ctx.fillStyle = position.fill)
  window.ctx.fillRect(position.x, position.y, 1, 1)
  window.ctx.stroke()
  window.ctx.fillStyle = `rgba(0,0,0,1)`
}

const drawAllPoints = function () {
  window.queuePoints.forEach((e) => {
    drawPoint(e)
  })
  window.queuePoints = []
}

const changeKeyPoint = function (position) {
  clearOldPoints(keyPoints)
  for (let segment of toSwap) {
    segment.el[segment.key] = position
    console.log(keyPoints)
  }
}

const defineManyPointsMode = function (canvas, algorithm) {
  let coordinates = {}
  clearOldPoints(keyPoints)
  keyPoints = []
  function functionMouseDown(event) {
    console.log(coordinates)
    const position = getMousePosition(canvas, event)
    if (swapState) {
      console.log('swap', toSwap)
      clearCurve(keyPoints, algorithm)
      changeKeyPoint(position)
      for (let segment of keyPoints) {
        window.queuePoints.push(...algorithm(segment))
      }
      toSwap = []
      swapState = false
      return
    }
    if (checkKeyPoints(position)) {
      swapState = true
      console.log('checkswap', toSwap)
      return
    }
    const lastIndex = Object.keys(coordinates)
    if (lastIndex.length > 0) {
      coordinates[`${parseInt(lastIndex[lastIndex.length - 1], 10) + 1}`] =
        position
    } else {
      clearOldPoints(keyPoints)
      keyPoints = []
      coordinates['1'] = position
    }
  }
  canvas.addEventListener('mousedown', functionMouseDown)
  document.addEventListener('keydown', function (event) {
    if (event.code == 'Space') {
      // console.log(Object.getOwnPropertyNames(coordinates).length)
      if (Object.getOwnPropertyNames(coordinates).length > 3) {
        if (algorithm !== drawPolygon) keyPoints.push(coordinates)
        window.queuePoints.push(...algorithm(coordinates))
        drawAllPoints()
        coordinates = {}
      } else {
        // alert('Введите 4 точки')
      }
    }
  })
  return functionMouseDown
}

export default defineManyPointsMode
