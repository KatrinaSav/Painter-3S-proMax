import drawCanvas from "../utils/drawCanvas.js"

const drawClippingSurface = function () {
    drawCanvas()
    window.ctx.beginPath()
    window.ctx.moveTo(200, 100)
    window.ctx.lineTo(800, 100)
    window.ctx.lineTo(800, 400)
    window.ctx.lineTo(200, 400)
    window.ctx.lineTo(200, 100)
    window.ctx.stroke()
}

export default drawClippingSurface