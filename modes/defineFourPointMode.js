import drawBeze from '../algorithms/drawBeze.js'
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

function rerenderCurve() {}
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
    oldPoints.push(...algorithm(seg))
  }
  oldPoints.forEach((el) => {
    window.ctx.clearRect(el.x, el.y, 1, 1)
  })
}

const changeKeyPoint = function (position) {
  clearOldPoints(toSwap)
  for (let segment of toSwap) {
    const key = segment.key
    const index = keyPoints.indexOf(segment.el)

    if (keyPoints.length !== 0) {
      if (segment.key === '1') {
        console.log('ind', keyPoints[index]['2'])
        keyPoints[index]['2'].x += position.x - segment.el[key].x
        keyPoints[index]['2'].y += position.y - segment.el[key].y
        console.log('ind', keyPoints[index]['2'])
      } else if (segment.key === '4') {
        keyPoints[index]['3'].x += position.x - segment.el[key].x
        keyPoints[index]['3'].y += position.y - segment.el[key].y
      }
      if (index !== keyPoints.length - 1) {
        if (segment.key === '3') {
          keyPoints[index + 1]['2'].x -= position.x - segment.el[key].x
          keyPoints[index + 1]['2'].y -= position.y - segment.el[key].y
        }
      }
      if (index !== 0) {
        if (segment.key === '2') {
          keyPoints[index - 1]['3'].x -= position.x - segment.el[key].x
          keyPoints[index - 1]['3'].y -= position.y - segment.el[key].y
        }
      }
      segment.el[segment.key] = position
      console.log(keyPoints)
    }
  }
}

const defineFourPointMode = (canvas, algorithm) => {
  let coordinates = {}
  clearOldPoints(keyPoints)
  keyPoints = []
  function functionMouseDown(e) {
    const position = getMousePosition(canvas, e)
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
      if (keyPoints.length !== 0 && algorithm === drawBeze) {
        let lastSegment = keyPoints[keyPoints.length - 1]
        let y = lastSegment['4'].y - lastSegment['3'].y + lastSegment['4'].y
        let x = lastSegment['4'].x - lastSegment['3'].x + lastSegment['4'].x
        coordinates['1'] = lastSegment['4'] //{x:coordinates.four.x, y: coordinates.four.y}
        coordinates['2'] = { x, y }
        coordinates['3'] = position
      } else {
        clearOldPoints(keyPoints)
        keyPoints = []
        coordinates['1'] = position
      }
    }
  }
  canvas.addEventListener('mousedown', functionMouseDown)
  return functionMouseDown
}

export default defineFourPointMode
