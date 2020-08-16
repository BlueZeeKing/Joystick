class Joystick {
    constructor(canvasDOM, bigColor = "rgba(255, 255, 255, 0.17)", smallColor = "rgba(255, 255, 255, 0.3)", smallSize = (canvasDOM.width*.16)) {
        this.canvasDOM = canvasDOM
        this.canvas = canvasDOM.getContext('2d')
        
        this.bigColor = bigColor
        this.bigSize = this.canvasDOM.width/2 - smallSize
        this.smallColor = smallColor
        this.smallSize = smallSize

        this.value = 0

        this.clicked = false

        this.drawCircle(this.canvasDOM.width / 2, this.canvasDOM.height / 2, this.bigSize, this.bigColor)
        this.drawCircle(this.canvasDOM.width / 2, this.canvasDOM.height / 2, this.smallSize, this.smallColor)

        document.addEventListener('mousemove', this.move.bind(this))
        canvasDOM.addEventListener('mousedown', function (e) {
            this.clicked = true
            console.log('down')
            this.move(e)
        }.bind(this))
        document.addEventListener('mouseup', function (e) {
            this.clicked = false
            console.log('up')
            this.clear()
            this.drawCircle(this.canvasDOM.width / 2, this.canvasDOM.height / 2, this.bigSize, this.bigColor)
            this.drawCircle(this.canvasDOM.width / 2, this.canvasDOM.height / 2, this.smallSize, this.smallColor)
        }.bind(this))
    }

    clear() {
        this.canvas.clearRect(0, 0, this.canvasDOM.width, this.canvasDOM.height)
    } 

    drawCircle(x, y, r, color) {
        this.canvas.beginPath();
        this.canvas.fillStyle = color;
        this.canvas.arc(x, y, r, 0, 2 * Math.PI);
        this.canvas.fill();
    }
    
    move(e) {
        if (this.clicked == true) {
            this.clear()
            this.drawCircle(this.canvasDOM.width / 2, this.canvasDOM.height / 2, this.bigSize, this.bigColor)
            let rawX = e.pageX - this.canvasDOM.offsetLeft
            let rawY = e.pageY - this.canvasDOM.offsetTop

            let x = rawX - this.canvasDOM.width / 2;
            let y = rawY - this.canvasDOM.height / 2;

            if (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) < this.bigSize) {
                this.drawCircle(x + (this.canvasDOM.width / 2), y + (this.canvasDOM.height / 2), this.smallSize, this.smallColor)
            } else {
                let scalingFactor = this.bigSize / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
                console.log(scalingFactor)
                let nX = x * scalingFactor
                let nY = y * scalingFactor
                this.drawCircle(nX + (this.canvasDOM.width / 2), nY + (this.canvasDOM.height / 2), this.smallSize, this.smallColor)
            }
        }
    }
}