import drawCanvas from './utils/drawCanvas.js'
import getMousePosition from './utils/getMousePosition.js'
import drawSegmentDDA from './algorithms/DrawSegmentDDA.js'
import drawSegmentBresenhem from './algorithms/drawSegmentBresenhem.js'
import drawSegmentVoo from './algorithms/drawSegmentVoo.js'
import drawCircle from './algorithms/drawCircle.js'
import drawElipse from './algorithms/drawElipse.js'
import drawHyperbolaH from './algorithms/drawHyperbolaH.js'
import drawHyperbolaV from './algorithms/drawHyperbolaV.js'
import drawParabolaV from './algorithms/drawParabolaV.js'
import drawParabolaH from './algorithms/drawParabolaH.js'
import drawBeze from './algorithms/drawBeze.js'
import drawErmit from './algorithms/drawErmit.js'

const canvas = document.getElementById('example')
const ctx = canvas.getContext('2d')
const state = {
  segment: false,
  cursor: true,
  curve: false,
  interpolation: false,
  pointManipulation: false,
  setState: function (currState) {
    for (let stepState in this) {
      stepState === 'setState' || (this[stepState] = false)
    }
    this[currState] = true
  },
}

const algorithm = {
  cda: false,
  bresenhem: false,
  voo: false,
  circle: false,
  elipse: false,
  hyperbolaH: false,
  hyperbolaV: false,
  parabolaH: false,
  parabolaV: false,
  beze: false,
  ermit: false,
  setAlgorithm: function (currAlg) {
    for (let step in this) {
      step === 'setAlgorithm' || (this[step] = false)
    }
    this[currAlg] = true
  },
}

let coordinates = {}
let debug = false
let queuePoints = []
let keyPoints
let currentKeyPoint = {}

function checkKeyPoints(pos) {
  for (let key in keyPoints) {
    let value = keyPoints[key]
    if (
      value.x - 2 <= pos.x &&
      pos.x <= value.x + 2 &&
      value.y - 2 <= pos.y &&
      pos.y <= value.y + 2
    ) {
      currentKeyPoint[key] = value
      state.setState('pointManipulation')
      return true
    }
  }
}

const clearOldPoints = function () {
  for (let key in keyPoints) {
    let value = keyPoints[key]

    for (let i = -2; i <= 2; i++) {
      ctx.clearRect(value.x + i, value.y, 1, 1)
      ctx.clearRect(value.x, value.y + i, 1, 1)
    }
  }
}

const clearCurve = function () {
  let oldPoints = []
  if (algorithm.beze) oldPoints.push(...drawBeze(keyPoints, ctx))
  if (algorithm.ermit) oldPoints.push(...drawErmit(keyPoints, ctx))
  oldPoints.forEach((el) => {
    ctx.clearRect(el.x, el.y, 1, 1)
  })
}

const changeKeyPoint = function (position) {
  clearOldPoints()
  keyPoints[Object.keys(currentKeyPoint)[0]] = position
  currentKeyPoint = {}
}

canvas.addEventListener('mousedown', function (e) {
  const position = getMousePosition(canvas, e)
  console.log(position)
  if (state.interpolation) {
    if (checkKeyPoints(position)) return
  }
  if (state.segment || state.curve) {
    if ('one' in coordinates) {
      coordinates['two'] = position
      if (algorithm.cda) queuePoints.push(...drawSegmentDDA(coordinates, ctx))
      if (algorithm.bresenhem)
        queuePoints.push(...drawSegmentBresenhem(coordinates, ctx))
      if (algorithm.voo) queuePoints.push(...drawSegmentVoo(coordinates, ctx))
      if (algorithm.circle) queuePoints.push(...drawCircle(coordinates, ctx))
      if (algorithm.elipse) queuePoints.push(...drawElipse(coordinates, ctx))
      if (algorithm.hyperbolaH)
        queuePoints.push(...drawHyperbolaH(coordinates, ctx))
      if (algorithm.hyperbolaV)
        queuePoints.push(...drawHyperbolaV(coordinates, ctx))
      if (algorithm.parabolaH)
        queuePoints.push(...drawParabolaH(coordinates, ctx))
      if (algorithm.parabolaV)
        queuePoints.push(...drawParabolaV(coordinates, ctx))
      delete coordinates.one
      delete coordinates.two
    } else {
      coordinates['one'] = position
    }
  }
  if (state.pointManipulation) {
    clearCurve()
    changeKeyPoint(position)
    if (algorithm.beze) queuePoints.push(...drawBeze(keyPoints, ctx))
    if (algorithm.ermit) queuePoints.push(...drawErmit(keyPoints, ctx))
    state.setState('interpolation')
  } else if (state.interpolation) {
    if ('three' in coordinates) {
      coordinates['four'] = position
      if (algorithm.beze) queuePoints.push(...drawBeze(coordinates, ctx))
      if (algorithm.ermit) queuePoints.push(...drawErmit(coordinates, ctx))
      keyPoints = JSON.parse(JSON.stringify(coordinates))
      coordinates = {}
    } else if ('two' in coordinates) coordinates['three'] = position
    else if ('one' in coordinates) coordinates['two'] = position
    else {
      coordinates['one'] = position
      clearOldPoints()
      if (algorithm.beze && 'one' in keyPoints) {
        let y = keyPoints.four.y - keyPoints.three.y + keyPoints.four.y
        let x = keyPoints.four.x - keyPoints.three.x + keyPoints.four.x
        coordinates.one = keyPoints.four //{x:coordinates.four.x, y: coordinates.four.y}
        coordinates['two'] = { x, y }
        coordinates['three'] = position
        console.log(x, y)
      }
      keyPoints = {}
    }
  }
  debug || drawAllPoints()
})

const drawPoint = function (position) {
  position.fill && (ctx.fillStyle = position.fill)
  ctx.fillRect(position.x, position.y, 1, 1)
  ctx.stroke()
  ctx.fillStyle = `rgba(0,0,0,1)`
}

const drawAllPoints = function () {
  queuePoints.forEach((e) => {
    drawPoint(e)
  })
  queuePoints = []
}

const clearButton = document.getElementById('clearButton')
clearButton.onclick = () => {
  drawCanvas(ctx)
  queuePoints = []
  keyPoints = {}
  currentKeyPoint = {}
  state.setState('cursor')
}

const btnSegment = document.getElementById('btnSegment')
btnSegment.addEventListener('click', function () {
  const dropdownContent = document.getElementById('lineMenu')
  if (dropdownContent.style.display === 'block') {
    dropdownContent.style.display = 'none'
  } else {
    dropdownContent.style.display = 'block'
  }
  state.setState('segment')
})

const btnCurves = document.getElementById('btnCurves')
btnCurves.addEventListener('click', function () {
  const dropdownContent = document.getElementById('curveMenu')
  if (dropdownContent.style.display === 'block') {
    dropdownContent.style.display = 'none'
  } else {
    dropdownContent.style.display = 'block'
  }
  state.setState('curve')
})

const btnInter = document.getElementById('btnInter')
btnInter.addEventListener('click', function () {
  const dropdownContent = document.getElementById('interMenu')
  if (dropdownContent.style.display === 'block') {
    dropdownContent.style.display = 'none'
  } else {
    dropdownContent.style.display = 'block'
  }
  state.setState('interpolation')
})

// Функция для закрытия выпадающего меню
function closeDropdown(idName) {
  const dropdownContent = document.getElementById(idName)
  dropdownContent.style.display = 'none'
}

const btnCDA = document.getElementById('cda')
btnCDA.onclick = () => {
  algorithm.setAlgorithm('cda')
  closeDropdown('lineMenu')
}

const btnBresenhem = document.getElementById('bresenhem')
btnBresenhem.onclick = () => {
  algorithm.setAlgorithm('bresenhem')
  closeDropdown('lineMenu')
}

const btnVoo = document.getElementById('voo')
btnVoo.onclick = () => {
  algorithm.setAlgorithm('voo')
  closeDropdown('lineMenu')
}

const btnCircle = document.getElementById('circle')
btnCircle.onclick = () => {
  algorithm.setAlgorithm('circle')
  closeDropdown('curveMenu')
}

const btnElipse = document.getElementById('elipse')
btnElipse.onclick = () => {
  algorithm.setAlgorithm('elipse')
  closeDropdown('curveMenu')
}

const btnHyperbolaV = document.getElementById('hyperbolaV')
btnHyperbolaV.onclick = () => {
  algorithm.setAlgorithm('hyperbolaV')
  closeDropdown('curveMenu')
}

const btnHyperbolaH = document.getElementById('hyperbolaH')
btnHyperbolaH.onclick = () => {
  algorithm.setAlgorithm('hyperbolaH')
  closeDropdown('curveMenu')
}

const btnParabolaH = document.getElementById('parabolaH')
btnParabolaH.onclick = () => {
  algorithm.setAlgorithm('parabolaH')
  closeDropdown('curveMenu')
}

const btnParabolaV = document.getElementById('parabolaV')
btnParabolaV.onclick = () => {
  algorithm.setAlgorithm('parabolaV')
  closeDropdown('curveMenu')
}

const btnBeze = document.getElementById('beze')
btnBeze.onclick = () => {
  algorithm.setAlgorithm('beze')
  closeDropdown('interMenu')
  clearOldPoints()
  keyPoints = {}
  currentKeyPoint = {}
  coordinates = {}
}

const btnErmit = document.getElementById('ermit')
btnErmit.onclick = () => {
  algorithm.setAlgorithm('ermit')
  closeDropdown('interMenu')
  clearOldPoints()
  keyPoints = {}
  currentKeyPoint = {}
  coordinates = {}
}

const switchDebug = document.querySelector('.switch-btn')
switchDebug.onclick = () => {
  switchDebug.classList.toggle('switch-on')
  debug = !debug
  const nextBtn = document.querySelector('.debug')
  if (nextBtn.style.display === 'inline-block') {
    nextBtn.style.display = 'none'
  } else {
    nextBtn.style.display = 'inline-block'
  }
}

const nextBtn = document.querySelector('.next-btn')
nextBtn.onclick = () => {
  if (queuePoints.length != 0) {
    drawPoint(queuePoints.shift())
  }
}
drawCanvas(ctx)
