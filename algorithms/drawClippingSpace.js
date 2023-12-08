import drawCanvas from "../utils/drawCanvas.js"

const drawClippingSpace = function () {
    drawCanvas()
    window.ctx.beginPath()
    window.ctx.moveTo(350, 100)
    window.ctx.lineTo(650, 100)
    window.ctx.lineTo(800, 300)
    window.ctx.lineTo(650, 500)
    window.ctx.lineTo(350, 500)
    window.ctx.lineTo(200, 300)
    window.ctx.lineTo(350, 100)
    window.ctx.stroke()
}

export default drawClippingSpace