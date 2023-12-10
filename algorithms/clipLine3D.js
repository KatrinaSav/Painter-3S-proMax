import drawSegmentBresenhem from "./drawSegmentBresenhem.js"

const clipLine3d = function (coordinates) {
    // должны быть заменены в зависимости от многоугольника
    let beginT = 0
    let endT = 1
    const vertexClippingList = [{x:350, y:150}, {x:600, y:100}, {x:550, y:500}, {x:200, y:500}, {x:250, y:260}]
    const lineVector = {x: coordinates['2'].x - coordinates['1'].x, y: coordinates['2'].y - coordinates['1'].y}
    for (let i = 0; i<vertexClippingList.length;i++){
        const vertexLineVector = {x: coordinates['1'].x - vertexClippingList[i].x, y: coordinates['1'].y - vertexClippingList[i].y}
        let secondVertexIndex = 0
        if (i+1!=vertexClippingList.length){
            secondVertexIndex = i+1
        }
        const sideNormal = getSideNormal(vertexClippingList[i], vertexClippingList[secondVertexIndex])
        const scalarW = vertexLineVector.x*sideNormal.x+vertexLineVector.y*sideNormal.y
        const scalarD = lineVector.x*sideNormal.x+lineVector.y*sideNormal.y
        if (scalarD==0 & scalarW<0) {
            return [{ x: -1, y: -1 }]
        }
        const tParameter = -((scalarW)/(scalarD))
        if (scalarD > 0)
        if (tParameter > 1) {
            return [{ x: -1, y: -1 }]
        }
        else {
            beginT = Math.max(beginT, tParameter)
        }
        if (scalarD <=0)
        if (tParameter < 0) {
            return [{ x: -1, y: -1 }]
        }
        else {
            endT = Math.min(tParameter, endT)
        }
    }
    if (beginT <= endT){
        let newCoordinates = {}
        newCoordinates['1'] = {x: coordinates['1'].x + (coordinates['2'].x - coordinates['1'].x)*beginT,
            y: coordinates['1'].y + (coordinates['2'].y - coordinates['1'].y)*beginT}
        newCoordinates['2'] = {x: coordinates['1'].x + (coordinates['2'].x - coordinates['1'].x)*endT,
            y: coordinates['1'].y + (coordinates['2'].y - coordinates['1'].y)*endT}
        return drawSegmentBresenhem(newCoordinates)
    }
    else {
        return [{ x: -1, y: -1 }]
    }
}

const getSideNormal = function (vertex1, vertex2) {
    return ({x: -(vertex2.y-vertex1.y), y: (vertex2.x-vertex1.x)})
}

export default clipLine3d