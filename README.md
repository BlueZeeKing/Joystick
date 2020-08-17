# Joystick
A simple JS library that creates a canvas joystick. The joystick.js file defines the class that can be used to create a joystick. The color of the joystick is white by default but you can change that. The joystick is mobile friendly.
## The Joystick Class
The joystick class takes a canvas DOM as an input but you can also input the background circle color, the color of the inner circle and the size of the inner circle(the outer circle will update to be compatible).
#### Example:
```javascript
var joystick = new Joystick(document.querySelector("canvas"), "lightgray", "gray", 10); // canvas dom, big circle color, smaller circle color, smaller circle size in pixels
```
### The Position Value
The position value shows the angle of the smaller circle relative to the center. Left is zero. This value will update automatically.
#### Example:
```javascript
console.log(joystick.pos);
```
### The Clicked Value
The clicked value will be true if the user is currently using the joystick
#### Example:
```javascript
console.log(joystick.clicked);
```