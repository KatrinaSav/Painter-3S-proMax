const drawCanvas = function (ctx) {
  ctx.clearRect(0, 0, 1001, 601)
  ctx.moveTo(1, 1)
  ctx.lineTo(1001, 1)
  ctx.moveTo(1, 1)
  ctx.lineTo(1, 601)
  for (let x = 11; x <= 1001; x += 10) {
    ctx.moveTo(x, 0)
    ctx.lineTo(x, 3)
  }
  for (let x = 11; x <= 601; x += 10) {
    ctx.moveTo(0, x)
    ctx.lineTo(3, x)
  }
  ctx.stroke()
  return ctx
}

export default drawCanvas
