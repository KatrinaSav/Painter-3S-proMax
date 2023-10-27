import multiplyMatrix from "../utils/multyMatrix.js"
import drawCanvas from "../utils/drawCanvas.js"

class ThreeDObject {
    constructor(){
        this.keyPoints = {P1: [10, 100, 100],
        P2: [200, 100, 100],
        P3: [200, 100, 200],
        P4: [10, 100, 200],
        P5: [150, 0, 200],}
        this.planeDistance = 200
        this.coordinateMatrix = this.convertCoordinatesToMatrix()
        this.connections = {
            P1: ["P2", "P4", "P5"],
            P2: ["P3", "P5"],
            P3: ["P4", "P5"], 
            P4: ["P5"], 
            P5: []}
        this.drawObject()

    }
    convertCoordinatesToMatrix () {
        const promisingMatrix = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 1/this.planeDistance],
            [0, 0, 0, 1],
        ]
        let result = []
        for (let key in this.keyPoints){
            this.keyPoints[key].push(1)
            result.push(this.keyPoints[key])
        }
        result = multiplyMatrix(result, promisingMatrix)
        //Тут настраивается перспектива,
        // result = multiplyMatrix(result, infFarDot)
        return result
    }
    convertMatrixToCoordinates () {
        let dot = 0
        for (let key in this.keyPoints){
            this.keyPoints[key] = [this.coordinateMatrix[dot][0], this.coordinateMatrix[dot][1], this.coordinateMatrix[dot][2]]
            dot++
        }
    }
    projection (value, z) {
        return Math.floor(value * this.planeDistance/z)
    }
    drawObject () {
        window.ctx.beginPath()
        drawCanvas()
        for (let key in this.keyPoints){
            const x = this.projection(this.keyPoints[key][0], this.keyPoints[key][2])
            const y = this.projection(this.keyPoints[key][1], this.keyPoints[key][2])
            window.ctx.fillRect(x, y, 1, 1)
                for (let dot = 0; dot < this.connections[key].length; dot++){
                    window.ctx.moveTo(x, y)
                    const secondX = this.projection(this.keyPoints[this.connections[key][dot]][0],
                         this.keyPoints[this.connections[key][dot]][2])
                    const secondY = this.projection(this.keyPoints[this.connections[key][dot]][1],
                         this.keyPoints[this.connections[key][dot]][2])
                    window.ctx.lineTo(secondX, secondY)
                }
        }
        window.ctx.stroke()
    } 
    moveObject (deltaX, deltaY, deltaZ) {
        const translation = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [deltaX, deltaY, deltaZ, 1],
            ]
            
        console.log(this.coordinateMatrix)
        this.coordinateMatrix = multiplyMatrix(this.coordinateMatrix, translation)
        console.log(this.coordinateMatrix)
        this.convertMatrixToCoordinates()
        this.drawObject()
    }
    scaleObject (sX, sY, sZ) {
        const translation = [
            [sX, 0, 0, 0],
            [0, sY, 0, 0],
            [0, 0, sZ, 0],
            [0, 0, 0, 1],
        ]
        console.log(this.coordinateMatrix)
        this.coordinateMatrix = multiplyMatrix(this.coordinateMatrix, translation)
        console.log(this.coordinateMatrix)
        this.convertMatrixToCoordinates()
        this.drawObject()
    }
    mirrorX() {
        const translation = [
            [-1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]
        this.coordinateMatrix = multiplyMatrix(this.coordinateMatrix, translation)
        let deltaX = this.coordinateMeaning(0)
        this.moveObject(deltaX, 0, 0)
    }
    mirrorY(){
        const translation = [
            [1, 0, 0, 0],
            [0, -1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]
        this.coordinateMatrix = multiplyMatrix(this.coordinateMatrix, translation)
        let deltaY = this.coordinateMeaning(1)
        this.moveObject(0, deltaY, 0)
    }
    mirrorZ(){
        const translation = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, -1, 0],
            [0, 0, 0, 1],
        ]
        this.coordinateMatrix = multiplyMatrix(this.coordinateMatrix, translation)
        let deltaZ = this.coordinateMeaning(2)
        this.moveObject(0, 0, deltaZ)
    }
    rotateX(angle){
        const translation = [
            [1, 0, 0, 0],
            [0, Math.cos(angle), Math.sin(angle), 0],
            [0, -Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 0, 1],
        ]
        let deltaY = this.coordinateMeaning(1)
        let deltaZ = this.coordinateMeaning(2)
        this.moveObject(0, -deltaY, -deltaZ)
        this.coordinateMatrix = multiplyMatrix(this.coordinateMatrix, translation)
        this.moveObject(0, deltaY, deltaZ)
    }
    rotateY(angle){
        const translation = [
            [Math.cos(angle), 0, -Math.sin(angle), 0],
            [0, 1, 0, 0],
            [Math.sin(angle), 0, Math.cos(angle), 0],
            [0, 0, 0, 1],
        ]
        let deltaX = this.coordinateMeaning(0)
        let deltaZ = this.coordinateMeaning(2)
        this.moveObject(-deltaX, 0, -deltaZ)
        this.coordinateMatrix = multiplyMatrix(this.coordinateMatrix, translation)
        this.moveObject(deltaX, 0, deltaZ)
    }
    rotateZ(angle){
        const translation = [
            [Math.cos(angle), Math.sin(angle), 0, 0],
            [-Math.sin(angle), Math.cos(angle), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]
        let deltaY = this.coordinateMeaning(1)
        let deltaX = this.coordinateMeaning(0)
        this.moveObject(-deltaX, -deltaY, 0)
        this.coordinateMatrix = multiplyMatrix(this.coordinateMatrix, translation)
        this.moveObject(deltaX, deltaY, 0)
    }
    outLook(dx, dy, dz){
        const infFarDot = [
            [1, 0, 0, 1/dx],
            [0, 1, 0, 1/dy],
            [0, 0, 1, 1/dz],
            [0, 0, 0, 1],
        ]
        this.coordinateMatrix = multiplyMatrix(this.coordinateMatrix, infFarDot)
        this.convertMatrixToCoordinates()
        this.drawObject()
    }
    coordinateMeaning(i){
        let avg = 0
        let amount = 0
        for (let key in this.keyPoints){
            avg += this.keyPoints[key][i]
            amount++
        }
        return Math.floor(avg/amount)
    }
}

export default ThreeDObject