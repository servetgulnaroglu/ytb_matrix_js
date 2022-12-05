const canvas = document.getElementById("canvas");
const canvas2D = canvas.getContext("2d");
const charArray = ["T", "A", "B", "A"];

/*[
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 
    "1", "2", "3", "4", "5", "6", "7", "8", 
    "A", "B", "Г", "Δ", "Є", "Z", "H", "Ѳ", "I", "K", "Λ", "M", //Greek Alphabet
    "N", "Ξ", "O", "П", "P", "Σ", "T", "Y", "Φ", "X", "	Ψ", "Ω",
]*/

let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;

let maxChar = 300;
let fallArray = [];
let fontSize = 13;
let maxColumns = screenWidth / fontSize;
let frames = 0;

canvas.width = screenWidth;
canvas.height = screenHeight;

class Falling {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(canvas2D) {
        this.value = charArray[ Math.floor(Math.random() * charArray.length) ].toUpperCase();

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
    if(fallArray.length < maxChar) {

        let character = new Falling(Math.floor(Math.random() * maxColumns) * fontSize, ((Math.random() * screenHeight) / 2) - 50 );

        fallArray.push(character);
    }

    canvas2D.fillStyle = "rgba(0,0,0,0.05)";
    canvas2D.fillRect(0, 0, screenWidth, screenHeight);

    for(let i = 0; i < fallArray.length && frames % 2 == 0; i++) {

        fallArray[i].draw(canvas2D);
    }

    requestAnimationFrame(update);
    frames++;
};


//reassigns value to screenWidth if screen size changes
window.addEventListener("resize", function() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    canvas.width = screenWidth
    canvas.height = screenHeight;
    maxColumns = screenWidth / fontSize;
});


window.onload = function() {

    update();

};
