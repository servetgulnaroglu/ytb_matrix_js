const canvas = document.getElementById("canvas");
const canvas2D = canvas.getContext("2d");

let fallArr = [];
let fontSize = 12;
let frames = 0;
let limit = 275;

let maxColumns;
let screenHeight;
let screenWidth; 

let charArr = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", //Roman Alphabet
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "A", "B", "Г", "Δ", "Є", "Z", "H", "Ѳ", "I", "K", "Λ", "M", //Greek Alphabet
    "N", "Ξ", "O", "П", "P", "Σ", "T", "Y", "Φ", "X", "	Ψ", "Ω"
];


//sets height and width of display
function displayOn() {
    screenHeight = window.innerHeight;
    screenWidth = window.innerWidth;
    canvas.height = screenHeight;
    canvas.width = screenWidth;
    maxColumns = screenWidth / fontSize;
}

//Returns a random number within a chosen range
function randomRange(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
//Math.floor() rounds down to the nearest whole number  e.i. 10 = 0 - 9  
//Math.random() returns a random decimal between 0 - 0.99
}

class Fall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(canvas2D) {
        this.value = charArr[randomRange(0, charArr.length - 1)];

        this.speed = ((Math.random() * fontSize * 3) / 4) + ((fontSize * 3) / 4);

        canvas2D.fillStyle = "rgba(0,255,0)";
        canvas2D.font = fontSize + "px sans-serif";
        canvas2D.fillText(this.value, this.x, this.y);
        this.y += this.speed;

        if(this.y > screenHeight) {
            this.y = ((Math.random() * screenHeight) / 2) - 50;
            this.x = Math.floor(Math.random() * maxColumns) * fontSize;
            this.speed = ((-Math.random() * fontSize * 3) / 4) + (fontSize * 3) / 4;
        }
    }
}

let update = () => {
    if(fallArr.length < limit) {

        let character = new Fall(Math.floor(Math.random() * maxColumns) * fontSize, ((Math.random() * screenHeight) / 2) - 50 );

        fallArr.push(character);
    }

    canvas2D.fillStyle = "rgba(0,0,0,0.05)";
    canvas2D.fillRect(0, 0, screenWidth, screenHeight);

    for(let i = 0; i < fallArr.length && frames % 2 == 0; i++) {

        fallArr[i].draw(canvas2D);
    }

    requestAnimationFrame(update);
    frames++;
};


//reassigns values if screen size changes
window.addEventListener("resize", function() {

   displayOn();

});


window.onload = function() {

    displayOn();

    update();
};
