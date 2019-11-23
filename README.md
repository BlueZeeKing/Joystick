# Joystick #

You can use this almost anywhere!

To use add this line to your HTML
```html
<canvas id="joystick" width=300 height=300></canvas>
```
But you can change the width and height to match what you want. They have to be the same!

Then add joystick.js to your rot or static file and it will work.

You can call on the variable `direction` to see the direction of the joystick in degrees.

Directly up is 0 and to the left is 90.

##### It also must be on a background with color or you have to change the color #####

#### To change the color change the lines:####

```javascript
var bigColor = "rgba(255, 255, 255, 0.17)";
var smallColor = "rgba(255, 255, 255, 0.3)";
```

#### To whatever you want! ####

`bigColor` is the outer ring and `smallColor` is the inner ball.