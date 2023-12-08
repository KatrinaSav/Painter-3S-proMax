import drawSegmentBresenhem from "./drawSegmentBresenhem.js"

const clipLine = function (coordinates) {
    const xMax = 800
    const xMin = 200
    const yMin = 100
    const yMax = 400
    let positionCode1 = [0, 0, 0, 0]
    let positionCode2 = [0, 0, 0, 0]
    if (coordinates['1'].x < xMin)
        positionCode1[0] = 1
    if (coordinates['1'].x > xMax)
        positionCode1[1] = 1   
    if (coordinates['1'].y < yMin)
        positionCode1[2] = 1
    if (coordinates['1'].y > yMax)
        positionCode1[3] = 1
    if (coordinates['2'].x < xMin)
        positionCode2[0] = 1
    if (coordinates['2'].x > xMax)
        positionCode2[1] = 1   
    if (coordinates['2'].y < yMin)
        positionCode2[2] = 1
    if (coordinates['2'].y > yMax)
        positionCode2[3] = 1
    
    let checkSum1 = 0
    let checkSum2 = 0
    for (let i = 0; i < 4; i++) {
        if (positionCode1[i]==1 & positionCode2[i]==1){
            return [{ x: -1, y: -1 }]
        }
        checkSum1+= positionCode1[i]
        checkSum2+=positionCode2[i]
    }
    if (checkSum1 == 0 & checkSum2 == 0)
    {
        return drawSegmentBresenhem(coordinates)
    }
    let newCoordinates = {}
    if (coordinates['1'].x == coordinates['2'].x){
        newCoordinates['1'].x = coordinates['1'].x
        newCoordinates['1'].y = yMin
        newCoordinates['2'].x = coordinates['1'].x
        newCoordinates['2'].y = yMax
        return drawSegmentBresenhem(newCoordinates)
    }
    if (coordinates['1'].y == coordinates['2'].y){
        newCoordinates['1'].x = xMin
        newCoordinates['1'].y = coordinates['1'].y
        newCoordinates['2'].x = xMax
        newCoordinates['2'].y = coordinates['1'].y
        return drawSegmentBresenhem(newCoordinates)
    }
    const angle = (coordinates['2'].y-coordinates['1'].y)/(coordinates['2'].x-coordinates['1'].x)
    const leftCross = angle * (xMin-coordinates['1'].x) + coordinates['1'].y
    if (leftCross < yMax & leftCross > yMin) {
        newCoordinates = setCoordinates(xMin, leftCross, newCoordinates)
    }
    const rightCross = angle * (xMax-coordinates['1'].x) + coordinates['1'].y
    if (rightCross < yMax & rightCross > yMin) {
        newCoordinates = setCoordinates(xMax, rightCross, newCoordinates)
    }
    const upCross = (yMax-coordinates['1'].y)/angle + coordinates['1'].x
    if (upCross < xMax & upCross > xMin) {
        newCoordinates = setCoordinates(upCross, yMax, newCoordinates)
    }
    const downCross = (yMin-coordinates['1'].y)/angle + coordinates['1'].x
    if (downCross < xMax & downCross > xMin) {
        newCoordinates = setCoordinates(downCross, yMin, newCoordinates)
    }
    return drawSegmentBresenhem(newCoordinates)    
}

const setCoordinates = function (x, y, coordinates) {
    const position = {x, y}
    if ('1' in coordinates) {
        coordinates['2'] = position
      } else {
        coordinates['1'] = position
      }
    return coordinates
}

export default clipLine