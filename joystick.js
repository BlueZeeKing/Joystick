class Joystick {
    constructor(canvasDOM, bigColor = "rgba(255, 255, 255, 0.17)", smallColor = "rgba(255, 255, 255, 0.3)", smallSize = (canvasDOM.width*.6)) {
        this.canvasDOM = canvasDOM
        this.canvas = canvasDOM.getContext('2d')
        
        this.bigColor = bigColor
        this.smallColor = smallColor
        this.smallSize = smallSize

        this.value = -1
        this.clicked = false
        canvasDOM.addEventListener('mousedown', function () {
            this.clicked = true
            this.move()
        })
        canvasDOM.addEventListener('mouseup', function () {
            this.clicked = false
        })
        document.body.addEventListener('mousemove', function () {
            this.move()
        })
    }
}