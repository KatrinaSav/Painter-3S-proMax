import multiplyMatrix from "../utils/multyMatrix.js"
import drawCanvas from "../utils/drawCanvas.js"
import transposeMatrix from "../utils/transposeMatrix.js"

class robertsonObject {
    constructor(){
        this.vertices = {P1: [-50, 50, -25],
            P2: [50, 50, -25],
            P3: [50, 50, 25],
            P4: [-50, 50, 25],
            P5: [-50, -50, -25],
            P6: [-50, -50, 25],
            P7: [50, -50, -25],
            P8: [50, -50, 25],}
        this.planeDistance = 200
        this.innerDot = [250, 150, 125]
        this.povVector = [[-1, -1, -1, 0.01]]
        this.edges = [{1: 'P1', 2: 'P2'}, //0 12
            {1: 'P3', 2: 'P2'},           //1 23
            {1: 'P3', 2: 'P4'},           //2 34
            {1: 'P4', 2: 'P1'},           //3 41
            {1: 'P1', 2: 'P5'},           //4 15
            {1: 'P2', 2: 'P7'},           //5 27
            {1: 'P3', 2: 'P8'},           //6 38
            {1: 'P4', 2: 'P6'},           //7 46
            {1: 'P5', 2: 'P7'},           //8 57
            {1: 'P7', 2: 'P8'},           //9 78
            {1: 'P8', 2: 'P6'},           //10 86
            {1: 'P6', 2: 'P5'},           //11 65
    ]
        this.faces = [['P4', 'P1', 'P5', 'P6'],
            ['P2', 'P7', 'P8', 'P3'],
            ['P5', 'P7', 'P8', 'P6'],
            ['P1', 'P2', 'P3', 'P4'],
            ['P4', 'P3', 'P8', 'P6'],
            ['P1', 'P2', 'P7', 'P5'],
        ]
        this.listToHide = []
        let coordinateMatrix = this.convertCoordinatesToMatrix()
        this.convertMatrixToCoordinates(coordinateMatrix)
        this.bodyMatrix = this.formBodyMatrix()
        this.findHiddenDots()
        // this.coordinateMatrix = this.convertCoordinatesToMatrix()
        this.drawObject()
        }

    countInnerDot() {
        const result = []
        for (let i = 0; i<3;i++){
            let avg = 0
            let amount = 0
            for (let key in this.vertices){

                avg += this.vertices[key][i]
                amount++
            }
            result.push(Math.floor(avg/amount))
            }
        return result
    }

    formBodyMatrix() {
        let resultMatrix = []
        let xMatrix = []
            let yMatrix = []
            let zMatrix = []
            let dMatrix = []
        for (let i = 0; i<this.faces.length;i++){
            let a = 0
            let b = 0
            let c = 0
            for (let j = 0; j<this.faces[i].length;j++){ 
                let nextIndex = 0
                if (j == this.faces[i].length-1){
                    nextIndex = 0
                }
                else {
                    nextIndex = j+1
                }
                const vertex = this.vertices[this.faces[i][j]]
                const nextVertex = this.vertices[this.faces[i][nextIndex]]
                a += (vertex[1]-nextVertex[1])*(vertex[2]+nextVertex[2])
                b += (vertex[2]-nextVertex[2])*(vertex[0]+nextVertex[0])
                c += (vertex[0]-nextVertex[0])*(vertex[1]+nextVertex[1])
            }
            let d = -(a*this.vertices[this.faces[i][0]][0]+b*this.vertices[this.faces[i][0]][1]+c*this.vertices[this.faces[i][0]][2])
            xMatrix.push(a/d)
            yMatrix.push(b/d)
            zMatrix.push(c/d)
            dMatrix.push(d/d)
        }

        resultMatrix.push(xMatrix, yMatrix, zMatrix, dMatrix)
        return resultMatrix
    }
    checkBodyMatrix(checkMatrix){
        const checkFaces = multiplyMatrix(this.innerDot, checkMatrix)
        for (let i = 0; i<checkFaces[0].length;i++) {
            if (checkFaces[0][i]<0){
                for(let j = 0; j<checkMatrix.length;j++ ){
                    checkMatrix[j][i] = -checkMatrix[j][i] 
                }
            }
        }
        return checkMatrix
    }
    findHiddenDots() {
        const hiddenFaces = multiplyMatrix(this.povVector, this.bodyMatrix)
        console.log(hiddenFaces)
        console.log(this.bodyMatrix)
        const hiddenDots = []
        function findDuplicates(arr) {
            let count = {};
            let result = [];
            for (let i = 0; i < arr.length; i++) {
              let el = arr[i];
              count[el] = (count[el] || 0) + 1;
            }
            for (let key in count) {
              if (count.hasOwnProperty(key) && count[key] > 0) {
                result.push(key)
              }
            }
            return result
          }
          
        for (let i = 0; i < hiddenFaces[0].length; i++){
            if (hiddenFaces[0][i]<0){
                hiddenDots.push(...this.faces[i])
            }
        }
        // console.log(hiddenDots)
        this.listToHide.push(...findDuplicates(hiddenDots))
    }
    convertCoordinatesToMatrix () {
        const promisingMatrix = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 1/this.planeDistance],
            [0, 0, 0, 1],
        ]
        let result = []
        for (let key in this.vertices){
            this.vertices[key].push(1)
            result.push(this.vertices[key])
        }
        result = multiplyMatrix(result, promisingMatrix)
        return result
    }
    convertMatrixToCoordinates (matrix) {
        let dot = 0
        for (let key in this.vertices){
            this.vertices[key] = [matrix[dot][0], matrix[dot][1], matrix[dot][2]]
            dot++
        }
    }
    projection (value, z) {
        return Math.floor(value * this.planeDistance/z)
    }
    drawObject () {
        window.ctx.beginPath()
        drawCanvas()
        const coordinatesMatrix = this.convertCoordinatesToMatrix()
        const newCoordinates = this.moveObject(this.innerDot[0], this.innerDot[1], this.innerDot[2], coordinatesMatrix)
        this.convertMatrixToCoordinates(newCoordinates)
        console.log(this.listToHide)
        for (let i=0; i<this.edges.length;i++){
            const vertex1 = this.edges[i]['1']
            const vertex2 = this.edges[i]['2']
            if (this.listToHide.indexOf(vertex1)!==-1)
            if (this.listToHide.indexOf(vertex2)!==-1){
                // console.log(vertex1, (this.listToHide.indexOf(vertex2)))
            const x = this.projection(this.vertices[vertex1][0], this.vertices[vertex1][2])
            const y = this.projection(this.vertices[vertex1][1], this.vertices[vertex1][2])
            const secondX = this.projection(this.vertices[vertex2][0], this.vertices[vertex2][2])
            const secondY = this.projection(this.vertices[vertex2][1], this.vertices[vertex2][2])
            window.ctx.fillRect(x, y, 1, 1)
            window.ctx.moveTo(x, y)
            window.ctx.lineTo(secondX, secondY)
        }
    }
        this.convertMatrixToCoordinates(coordinatesMatrix)
        window.ctx.stroke()
        this.listToHide = []
    } 
    moveObject (deltaX, deltaY, deltaZ, position) {
        const translation = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [deltaX, deltaY, deltaZ, 1],
            ]
            
        return multiplyMatrix(position, translation)
    }
    rotateX(angle){
        const translation = [
            [1, 0, 0, 0],
            [0, Math.cos(angle), Math.sin(angle), 0],
            [0, -Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 0, 1],
        ]
        let coordinatesMatrix = this.convertCoordinatesToMatrix()
        coordinatesMatrix = multiplyMatrix(coordinatesMatrix, translation)
        console.log(coordinatesMatrix)
        this.convertMatrixToCoordinates(coordinatesMatrix)
        console.log(this.vertices)
        this.bodyMatrix = multiplyMatrix(transposeMatrix(translation), this.formBodyMatrix())
        this.findHiddenDots()
        this.drawObject()
    }
    rotateY(angle){
        const translation = [
            [Math.cos(angle), 0, -Math.sin(angle), 0],
            [0, 1, 0, 0],
            [Math.sin(angle), 0, Math.cos(angle), 0],
            [0, 0, 0, 1],
        ]
        let coordinatesMatrix = this.convertCoordinatesToMatrix()
        coordinatesMatrix = multiplyMatrix(coordinatesMatrix, translation)
        console.log(coordinatesMatrix)
        this.convertMatrixToCoordinates(coordinatesMatrix)
        console.log(this.vertices)
        this.bodyMatrix = multiplyMatrix(transposeMatrix(translation), this.formBodyMatrix())
        this.findHiddenDots()
        this.drawObject()
    }
    rotateZ(angle){
        const translation = [
            [Math.cos(angle), Math.sin(angle), 0, 0],
            [-Math.sin(angle), Math.cos(angle), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]
        let coordinatesMatrix = this.convertCoordinatesToMatrix()
        coordinatesMatrix = multiplyMatrix(coordinatesMatrix, translation)
        console.log(coordinatesMatrix)
        this.convertMatrixToCoordinates(coordinatesMatrix)
        console.log(this.vertices)
        this.bodyMatrix = multiplyMatrix(transposeMatrix(translation), this.formBodyMatrix())
        this.findHiddenDots()
        this.drawObject()
    }
}

export default robertsonObject