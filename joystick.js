class Joystick {
    constructor(canvasDOM, bigColor = "rgba(255, 255, 255, 0.17)", smallColor = "rgba(255, 255, 255, 0.3)", smallSize = (canvasDOM.width*.16)) { // create the constructor
        this.canvasDOM = canvasDOM
        this.canvas = canvasDOM.getContext('2d') // create the canvas objects
        
        this.bigColor = bigColor // set the color and size of the circles
        this.bigSize = this.canvasDOM.width/2 - smallSize
        this.smallColor = smallColor
        this.smallSize = smallSize

        this.value = 0 // set up the variable that hold data about the state of the joystick
        this.clicked = false

        this.drawCircle(this.canvasDOM.width / 2, this.canvasDOM.height / 2, this.bigSize, this.bigColor) // draw the circles
        this.drawCircle(this.canvasDOM.width / 2, this.canvasDOM.height / 2, this.smallSize, this.smallColor)

        document.addEventListener('mousemove', this.move.bind(this)) // bind the move function to when the mouse moves
        canvasDOM.addEventListener('mousedown', function (e) { // when the mouse pressed
            this.clicked = true // set clicked to true
            this.move(e) // and update the circles
        }.bind(this))
        document.addEventListener('mouseup', function (e) { // when the mouse is no longer pressed
            this.clicked = false // set clicked to false
            this.clear() // reset the circles
            this.drawCircle(this.canvasDOM.width / 2, this.canvasDOM.height / 2, this.bigSize, this.bigColor)
            this.drawCircle(this.canvasDOM.width / 2, this.canvasDOM.height / 2, this.smallSize, this.smallColor)
        }.bind(this))
    }

    clear() {
        this.canvas.clearRect(0, 0, this.canvasDOM.width, this.canvasDOM.height) // create a function that clears the screen
    } 

    drawCircle(x, y, r, color) { // draw a circle of a certain size at a certan position and with a certain color
        this.canvas.beginPath();
        this.canvas.fillStyle = color;
        this.canvas.arc(x, y, r, 0, 2 * Math.PI);
        this.canvas.fill();
    }

    radians(x) { // change x degrees to radians
        return x * (Math.PI / 180);
    }

    degrees(x) { // change x radians to degrees
        return x * (180 / Math.PI);
    }
    
    move(e) { // when the mouse is moved
        if (this.clicked == true) { // if it is clicked
            this.clear() // update the big circle and clear the screen
            this.drawCircle(this.canvasDOM.width / 2, this.canvasDOM.height / 2, this.bigSize, this.bigColor)
            let rawX = e.pageX - this.canvasDOM.offsetLeft // get the x and y coords of the mouse
            let rawY = e.pageY - this.canvasDOM.offsetTop

            let x = rawX - this.canvasDOM.width / 2; // make them relative to the center
            let y = rawY - this.canvasDOM.height / 2;

            if (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) < this.bigSize) { // if the mouse is inside the big circle
                this.drawCircle(rawX, rawY, this.smallSize, this.smallColor) // draw the small circle where the mouse is
            } else {
                let scalingFactor = this.bigSize / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) // otherwise draw the circle where the mouse would be if it is in the circle
                let nX = x * scalingFactor
                let nY = y * scalingFactor
                this.drawCircle(nX + (this.canvasDOM.width / 2), nY + (this.canvasDOM.height / 2), this.smallSize, this.smallColor)
            }
            if (x > 0) { // set the value to the angle between left and the circle
                this.value = Math.round(this.degrees(Math.asin((Math.sin(this.radians(90)) / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))) * y)))
            } else {
                this.value = Math.round(this.degrees(Math.asin((Math.sin(this.radians(90)) / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))) * y)))*-1 + 180
            }
            if (this.value < 0) { // clean up the value
                this.value = 360 + this.value
            }
        }
    }
}