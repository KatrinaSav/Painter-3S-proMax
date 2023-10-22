const getMousePosition = function (canvas, event) {
  let rect = canvas.getBoundingClientRect()
  let x = Math.floor(event.clientX - rect.left - 1)
  let y = Math.floor(event.clientY - rect.top)
  return { x, y }
}

export default getMousePosition
