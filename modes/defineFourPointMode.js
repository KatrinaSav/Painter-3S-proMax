import getMousePosition from '../utils/getMousePosition.js'

let keyPoints = []
let toSwap = []
let swapState = false

document.addEventListener('keydown', function (event) {
  if (event.code == 'Enter') {
    clearOldPoints(keyPoints)
    keyPoints = []
  }
})

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

const clearCurve = function (segments, algorithm) {
  let oldPoints = []
  console.log('segment', segments)
  for (let seg of segments) {
    oldPoints.push(...algorithm(seg.el))
  }
  oldPoints.forEach((el) => {
    window.ctx.clearRect(el.x, el.y, 1, 1)
  })
}

const changeKeyPoint = function (position) {
  clearOldPoints(toSwap)
  for (let segment of toSwap) {
    segment.el[segment.key] = position
  }
}

const defineFourPointMode = (canvas, algorithm) => {
  let coordinates = {}
  function functionMouseDown(e) {
    const position = getMousePosition(canvas, e)
    if (swapState) {
      console.log('swap', toSwap)
      clearCurve(toSwap, algorithm)
      changeKeyPoint(position)
      for (let segment of toSwap) {
        window.queuePoints.push(...algorithm(segment.el))
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
    if ('3' in coordinates) {
      coordinates['4'] = position
      window.queuePoints.push(...algorithm(coordinates))
      keyPoints.push(coordinates)
      console.log('add', keyPoints)
      coordinates = {}
    } else if ('2' in coordinates) {
      coordinates['3'] = position
    } else if ('1' in coordinates) {
      coordinates['2'] = position
    } else {
      if (keyPoints.length !== 0) {
        let lastSegment = keyPoints[keyPoints.length - 1]
        let y = lastSegment['4'].y - lastSegment['3'].y + lastSegment['4'].y
        let x = lastSegment['4'].x - lastSegment['3'].x + lastSegment['4'].x
        coordinates['1'] = lastSegment['4'] //{x:coordinates.four.x, y: coordinates.four.y}
        coordinates['2'] = { x, y }
        coordinates['3'] = position
      } else coordinates['1'] = position
    }
  }
  canvas.addEventListener('mousedown', functionMouseDown)
  return functionMouseDown
}

export default defineFourPointMode
