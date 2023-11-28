import drawPolygon from './drawPolygon.js'

function orientation(p, q, r) {
  let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y)

  if (val == 0) return 0
  return val > 0 ? 1 : 2
}

function darwConvexHullG() {
  window.polygons.forEach((polygon) => {
    let hull = []
    polygon = Object.values(polygon)
    const n = polygon.length
    if (n < 3) return null
    let l = 0
    for (let i = 1; i < n; i++) if (polygon[i].x < polygon[l].x) l = i
    let p = l,
      q
    do {
      hull.push(polygon[p])
      q = (p + 1) % n

      for (let i = 0; i < n; i++) {
        if (orientation(polygon[p], polygon[i], polygon[q]) == 2) q = i
      }
      p = q
    } while (p != l)
    console.log(hull)
    let coordinatesHull = {}
    hull.forEach((el, index) => {
      coordinatesHull[index + 1] = el
    })
    window.queuePoints.push(...drawPolygon(coordinatesHull))
  })
}

export default darwConvexHullG
