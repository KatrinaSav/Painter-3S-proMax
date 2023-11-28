import drawSegmentBresenhem from './drawSegmentBresenhem.js'

function onSegment(p, q, r) {
  if (
    q.x <= Math.max(p.x, r.x) &&
    q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) &&
    q.y >= Math.min(p.y, r.y)
  ) {
    return true
  }
  return false
}

function orientation(p, q, r) {
  let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y)

  if (val == 0) return 0
  return val > 0 ? 1 : 2
}

function doIntersect(p1, q1, p2, q2) {
  let o1 = orientation(p1, q1, p2)
  let o2 = orientation(p1, q1, q2)
  let o3 = orientation(p2, q2, p1)
  let o4 = orientation(p2, q2, q1)

  if (o1 != o2 && o3 != o4) {
    return true
  }

  if (o1 == 0 && onSegment(p1, p2, q1)) {
    return true
  }

  if (o2 == 0 && onSegment(p1, q2, q1)) {
    return true
  }

  if (o3 == 0 && onSegment(p2, p1, q2)) {
    return true
  }

  if (o4 == 0 && onSegment(p2, q1, q2)) {
    return true
  }

  return false
}

const checkSegmentPoly = function (coordinates) {
  const points = drawSegmentBresenhem(coordinates)
  const intersections = []

  window.polygons.forEach((polygon) => {
    polygon = Object.values(polygon)
    for (let i = 0; i < polygon.length; i++) {
      let next = (i + 1) % polygon.length
      if (
        doIntersect(
          coordinates['1'],
          coordinates['2'],
          polygon[i],
          polygon[next]
        )
      ) {
        intersections.push({
          x: polygon[i].x,
          y: polygon[i].y,
        })
      }
    }
  })
  console.log(intersections, 'd')
  let answer = ''
  if (intersections.length !== 0) {
    answer = `Количество точек пересечения: ${intersections.length}`
    intersections.forEach((e) => {
      answer += ` \{x:${e.x}, y:${e.y}\} `
    })
  } else answer = 'Отрезок не пересекает ни одного многоугольника'
  const answerHTML = document.getElementById('answer')
  answerHTML.innerHTML = answer
  answerHTML.style.display = 'block'
  clearTimeout(window.timer)
  window.timer = setTimeout(() => {
    answerHTML.style.display = 'none'
  }, 3000)
  return points
}

export default checkSegmentPoly
