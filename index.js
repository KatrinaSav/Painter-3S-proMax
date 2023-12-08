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
import drawVSpline from './algorithms/drawVSpline.js'
import drawCycleVSpline from './algorithms/drawCycleVSpline.js'
import defineTwoPointMode from './modes/defineTwoPointMode.js'
import defineFourPointMode from './modes/defineFourPointMode.js'
import defineManyPointsMode from './modes/defineManyPointMode.js'
import ThreeDObject from './3d/ThreeDObject.js'
import drawPolygon from './algorithms/drawPolygon.js'
import checkDotPoly from './algorithms/checkDotPoly.js'
import defineOnePointMode from './modes/defineOnePointMode.js'
import checkSegmentPoly from './algorithms/checkSegmentPoly.js'
import drawConvexHullG from './algorithms/drawconvexHullG.js'
import fillPoly from './algorithms/fillPoly.js'
import drawClippingSurface from './algorithms/drawClippingSurface.js'
import clipLine from './algorithms/clipLine.js'
import drawClippingSpace from './algorithms/drawClippingSpace.js'
import clipLine3D from './algorithms/clipLine3D.js'

const canvas = document.getElementById('example')
window.ctx = canvas.getContext('2d')
window.polygons = []
window.timer = setTimeout(() => {}, 0)
let currentMode = defineTwoPointMode(canvas, drawSegmentDDA)

let ThreeD = null
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
  window.polygons = []
  canvas.removeEventListener('mousedown', currentMode)
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

const btnPoly = document.getElementById('polygon')
btnPoly.addEventListener('click', function () {
  const dropdownContent = document.getElementById('polyMenu')
  if (dropdownContent.style.display === 'block') {
    dropdownContent.style.display = 'none'
  } else {
    dropdownContent.style.display = 'block'
  }
})

const btnClipping = document.getElementById('clipping')
btnClipping.addEventListener('click', function () {
  const dropdownContent = document.getElementById('clippingMenu')
  if (dropdownContent.style.display === 'block') {
    drawCanvas()
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

const btnVSpline = document.getElementById('vSpline')
btnVSpline.onclick = () => {
  setMode(drawVSpline, defineManyPointsMode)
  closeDropdown('interMenu')
}

const btnCycleVSpline = document.getElementById('vSplineClose')
btnCycleVSpline.onclick = () => {
  setMode(drawCycleVSpline, defineManyPointsMode)
  closeDropdown('interMenu')
}

const btnDrawPoly = document.getElementById('drawPoly')
btnDrawPoly.onclick = () => {
  setMode(drawPolygon, defineManyPointsMode)
  closeDropdown('polyMenu')
}

const btnDotPoly = document.getElementById('dotPoly')
btnDotPoly.onclick = () => {
  setMode(checkDotPoly, defineOnePointMode)
  closeDropdown('polyMenu')
}

const btnSegmentPoly = document.getElementById('segmentPoly')
btnSegmentPoly.onclick = () => {
  setMode(checkSegmentPoly, defineTwoPointMode)
  closeDropdown('polyMenu')
}

const btnWrapGarvis = document.getElementById('wrapGarvis')
btnWrapGarvis.onclick = () => {
  drawConvexHullG()
  closeDropdown('polyMenu')
}

const btnFill = document.getElementById('fill')
btnFill.onclick = () => {
  fillPoly()
  closeDropdown('polyMenu')
}

const btn2dClipping = document.getElementById('2dClip')
btn2dClipping.onclick = () => {
  drawClippingSurface()
  setMode(clipLine, defineTwoPointMode)
  closeDropdown('clippingMenu')
}

const btn3dClipping = document.getElementById('3dClip')
btn3dClipping.onclick = () => {
  drawClippingSpace()
  setMode(clipLine3D, defineTwoPointMode)
  closeDropdown('clippingMenu')
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

document.getElementById('threeDMode').onclick = () => {
  const threeDDiv = document.querySelector('.threeDContent')
  if (threeDDiv.style.display === 'flex') {
    threeDDiv.style.display = 'none'
    ThreeD = null
    window.ctx.beginPath()
    drawCanvas()
  } else {
    threeDDiv.style.display = 'flex'
    ThreeD = new ThreeDObject()
  }
}
document.getElementById('btnMovement').onclick = () => {
  const movementDropdown = document.getElementById('movementDropdown')
  if (movementDropdown.style.display === 'flex') {
    movementDropdown.style.display = 'none'
  } else {
    movementDropdown.style.display = 'flex'
  }
  // ThreeD.moveObject(100, 100, 100)
}
document.getElementById('commitMovement').onclick = () => {
  // тут десятка значит десятичное число, вау
  const dx = parseInt(document.getElementById('deltaX').value, 10)
  const dy = parseInt(document.getElementById('deltaY').value, 10)
  const dz = parseInt(document.getElementById('deltaZ').value, 10)
  ThreeD.moveObject(dx, dy, dz)
}
document.getElementById('btnScale').onclick = () => {
  const movementDropdown = document.getElementById('scaleDropdown')
  if (movementDropdown.style.display === 'flex') {
    movementDropdown.style.display = 'none'
  } else {
    movementDropdown.style.display = 'flex'
  }
}
document.getElementById('commitScale').onclick = () => {
  const dx = parseFloat(document.getElementById('sX').value, 10)
  const dy = parseFloat(document.getElementById('sY').value, 10)
  const dz = parseFloat(document.getElementById('sZ').value, 10)
  ThreeD.scaleObject(dx, dy, dz)
}
document.getElementById('btnMirror').onclick = () => {
  const movementDropdown = document.getElementById('mirrorDropdown')
  if (movementDropdown.style.display === 'flex') {
    movementDropdown.style.display = 'none'
  } else {
    movementDropdown.style.display = 'flex'
  }
}
document.getElementById('mirrorX').onclick = () => {
  ThreeD.mirrorX()
}
document.getElementById('mirrorY').onclick = () => {
  ThreeD.mirrorY()
}
document.getElementById('mirrorZ').onclick = () => {
  ThreeD.mirrorZ()
}
document.getElementById('btnRotate').onclick = () => {
  const movementDropdown = document.getElementById('rotateDropdow')
  if (movementDropdown.style.display === 'flex') {
    movementDropdown.style.display = 'none'
  } else {
    movementDropdown.style.display = 'flex'
  }
}
document.getElementById('rotateX').onclick = () => {
  const degrees = parseInt(document.getElementById('angle').value, 10)
  ThreeD.rotateX(degrees * (Math.PI / 180))
}
document.getElementById('rotateY').onclick = () => {
  const degrees = parseInt(document.getElementById('angle').value, 10)
  ThreeD.rotateY(degrees * (Math.PI / 180))
}
document.getElementById('rotateZ').onclick = () => {
  const degrees = parseInt(document.getElementById('angle').value, 10)
  ThreeD.rotateZ(degrees * (Math.PI / 180))
}
document.getElementById('btnOutlook').onclick = () => {
  const movementDropdown = document.getElementById('percpectiveDropdow')
  if (movementDropdown.style.display === 'flex') {
    movementDropdown.style.display = 'none'
  } else {
    movementDropdown.style.display = 'flex'
  }
}
document.getElementById('commitOutlook').onclick = () => {
  const dx = parseFloat(document.getElementById('deltaXp').value, 10)
  const dy = parseFloat(document.getElementById('deltaYp').value, 10)
  const dz = parseFloat(document.getElementById('deltaZp').value, 10)
  ThreeD.outLook(dx, dy, dz)
}

drawCanvas()
