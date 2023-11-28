import getMousePosition from '../utils/getMousePosition.js'

const defineOnePointMode = (canvas, algorithm) => {
  function functionMouseDown(e) {
    const position = getMousePosition(canvas, e)
    algorithm(position)
  }
  canvas.addEventListener('mousedown', functionMouseDown)
  return functionMouseDown
}

export default defineOnePointMode
