import drawCanvas from './utils/drawCanvas.js'
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
import defineTwoPointMode from './modes/defineTwoPointMode.js'
import defineFourPointMode from './modes/defineFourPointMode.js'

const canvas = document.getElementById('example')
window.ctx = canvas.getContext('2d')
let currentMode = defineTwoPointMode(canvas, drawSegmentDDA)

let debug = false
window.queuePoints = []

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

const clearButton = document.getElementById('clearButton')
clearButton.onclick = () => {
  drawCanvas()
  window.queuePoints = []
}

const btnSegment = document.getElementById('btnSegment')
btnSegment.addEventListener('click', function () {
  const dropdownContent = document.getElementById('lineMenu')
  if (dropdownContent.style.display === 'block') {
    dropdownContent.style.display = 'none'
  } else {
    dropdownContent.style.display = 'block'
  }
})

const btnCurves = document.getElementById('btnCurves')
btnCurves.addEventListener('click', function () {
  const dropdownContent = document.getElementById('curveMenu')
  if (dropdownContent.style.display === 'block') {
    dropdownContent.style.display = 'none'
  } else {
    dropdownContent.style.display = 'block'
  }
})

const btnInter = document.getElementById('btnInter')
btnInter.addEventListener('click', function () {
  const dropdownContent = document.getElementById('interMenu')
  if (dropdownContent.style.display === 'block') {
    dropdownContent.style.display = 'none'
  } else {
    dropdownContent.style.display = 'block'
  }
})

// Функция для закрытия выпадающего меню
function closeDropdown(idName) {
  const dropdownContent = document.getElementById(idName)
  dropdownContent.style.display = 'none'
}

canvas.addEventListener('mouseup', () => {
  if (window.queuePoints.length !== 0) debug || drawAllPoints()
})
const setMode = function (mode, defineMode) {
  canvas.removeEventListener('mousedown', currentMode)
  currentMode = defineMode(canvas, mode)
}

const btnCDA = document.getElementById('cda')
btnCDA.onclick = () => {
  setMode(drawSegmentDDA, defineTwoPointMode)
  closeDropdown('lineMenu')
}

const btnBresenhem = document.getElementById('bresenhem')
btnBresenhem.onclick = () => {
  setMode(drawSegmentBresenhem, defineTwoPointMode)
  closeDropdown('lineMenu')
}

const btnVoo = document.getElementById('voo')
btnVoo.onclick = () => {
  setMode(drawSegmentVoo, defineTwoPointMode)
  closeDropdown('lineMenu')
}

const btnCircle = document.getElementById('circle')
btnCircle.onclick = () => {
  setMode(drawCircle, defineTwoPointMode)
  closeDropdown('curveMenu')
}

const btnElipse = document.getElementById('elipse')
btnElipse.onclick = () => {
  setMode(drawElipse, defineTwoPointMode)
  closeDropdown('curveMenu')
}

const btnHyperbolaV = document.getElementById('hyperbolaV')
btnHyperbolaV.onclick = () => {
  setMode(drawHyperbolaV, defineTwoPointMode)
  closeDropdown('curveMenu')
}

const btnHyperbolaH = document.getElementById('hyperbolaH')
btnHyperbolaH.onclick = () => {
  setMode(drawHyperbolaH, defineTwoPointMode)
  closeDropdown('curveMenu')
}

const btnParabolaH = document.getElementById('parabolaH')
btnParabolaH.onclick = () => {
  setMode(drawParabolaH, defineTwoPointMode)
  closeDropdown('curveMenu')
}

const btnParabolaV = document.getElementById('parabolaV')
btnParabolaV.onclick = () => {
  setMode(drawParabolaV, defineTwoPointMode)
  closeDropdown('curveMenu')
}

const btnBeze = document.getElementById('beze')
btnBeze.onclick = () => {
  setMode(drawBeze, defineFourPointMode)
  closeDropdown('interMenu')
}

const btnErmit = document.getElementById('ermit')
btnErmit.onclick = () => {
  setMode(drawErmit, defineFourPointMode)
  closeDropdown('interMenu')
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
  if (window.queuePoints.length != 0) {
    drawPoint(window.queuePoints.shift())
  }
}
drawCanvas()
