import drawPolygon from './drawPolygon.js'

function fillPoly() {
  window.polygons.forEach((polygon) => {
    polygon = Object.values(polygon)
    if (polygon.length < 3) return

    window.ctx.beginPath()
    window.ctx.moveTo(polygon[0].x, polygon[0].y)

    for (let i = 1; i < polygon.length; i++) {
      window.ctx.lineTo(polygon[i].x, polygon[i].y)
    }

    window.ctx.closePath()
    window.ctx.fill('evenodd')
  })
}

export default fillPoly
