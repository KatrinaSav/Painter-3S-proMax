const checkDotPoly = function (position) {
  let x = position.x,
    y = position.y
  let inside = false

  window.polygons.forEach((polygon) => {
    polygon = Object.values(polygon)
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      let xi = polygon[i].x,
        yi = polygon[i].y
      let xj = polygon[j].x,
        yj = polygon[j].y

      let intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
      if (intersect) inside = !inside
    }
  })
  if (inside) alert('Точка внутри многоульника')
  else alert('Точка вне многоугольника')
}

export default checkDotPoly
