const drawCanvas = function () {
  window.ctx.clearRect(0, 0, 1001, 601)
  window.ctx.moveTo(1, 1)
  window.ctx.lineTo(1001, 1)
  window.ctx.moveTo(1, 1)
  window.ctx.lineTo(1, 601)
  for (let x = 11; x <= 1001; x += 10) {
    window.ctx.moveTo(x, 0)
    window.ctx.lineTo(x, 3)
  }
  for (let x = 11; x <= 601; x += 10) {
    window.ctx.moveTo(0, x)
    window.ctx.lineTo(3, x)
  }
  window.ctx.stroke()
}

export default drawCanvas
