import getMousePosition from '../utils/getMousePosition.js'

const defineTwoPointMode = (canvas, algorithm) => {
  let coordinates = {}
  function functionMouseDown(e) {
    const position = getMousePosition(canvas, e)
    if ('1' in coordinates) {
      coordinates['2'] = position
      window.queuePoints.push(...algorithm(coordinates))
      coordinates = {}
    } else {
      coordinates['1'] = position
    }
  }
  canvas.addEventListener('mousedown', functionMouseDown)
  return functionMouseDown
}

export default defineTwoPointMode
