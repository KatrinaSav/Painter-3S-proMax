import drawCanvas from "../utils/drawCanvas.js"

const drawClippingSpace = function () {
    drawCanvas()
    window.ctx.beginPath()
    window.ctx.moveTo(350, 150)
    window.ctx.lineTo(600, 100)
    window.ctx.lineTo(550, 500)
    window.ctx.lineTo(200, 500)
    window.ctx.lineTo(250, 260)
    window.ctx.lineTo(350, 150)
    window.ctx.stroke()
}

export default drawClippingSpace