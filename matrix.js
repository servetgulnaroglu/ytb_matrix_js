const body = document.querySelector(".body");
const canvas = document.getElementById("canvas");
const canvas2D = canvas.getContext("2d");
const textArea = document.getElementById("text-area");

let fallArr = [];
let fontSize = 13;
let frames = 0;
let limit = 275;
let time = 0;

let maxColumns;
let screenHeight;
let screenWidth;
let user; 

let arabicNumbers = "012345678901234567890123456789012345678901234567890123456789".split("");
let chineseAlphabet = "诶比西迪伊艾弗吉尺杰开勒马娜哦屁吾儿丝提伊吾维豆贝尔维克斯吾贼德".split("");
let greekAlphabet = "ABГΔЄZHѲIKΛMNΞOПPΣTYΦXΨΩABГΔЄZHѲIKΛMNΞOПPΣTYΦXΨΩ".split("");
let romanAlphabet = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz".split("");
let romanCap = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

let matrix = arabicNumbers + greekAlphabet + romanAlphabet + chineseAlphabet + romanCap;

matrix = matrix.split(",");

let charArr = matrix;

//sets height and width of display
function displayOn() {
    screenHeight = document.documentElement.scrollHeight;
    screenWidth = document.documentElement.scrollWidth; 
    canvas.height = screenHeight;
    canvas.width = screenWidth;
    maxColumns = screenWidth / fontSize;
    textArea.style.visibility = "hidden";
}


textArea.addEventListener("input", function() {

    user = textArea.value;
    time += 1000;

    if(user == "") {

        charArr = matrix;

    } else if(user != undefined) {

        charArr = user.split("");
        
    }
    
    setTimeout(function() {

        textArea.style.visibility = "hidden";

    }, 10000 + time); //ten seconds + extra
});
    

//Returns a random number within a chosen range
function randomRange(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
//Math.floor() rounds down to the nearest whole number  e.i. 10 = 0 - 9  
//Math.random() returns a random decimal between 0 - 0.99
}


function randomShades() {

    let dice = randomRange(1,100);

    if(dice == 1) {
        return "chartreuse";
    } else if(dice == 2) {
        return "green";
    } else {
        return "rgb(0,255,0)";
    }
}


class Fall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(canvas2D) {
        this.value = charArr[randomRange(0, charArr.length - 1)];

        this.speed = ((Math.random() * fontSize * 3) / 4) + ((fontSize * 3) / 4);

        canvas2D.fillStyle = randomShades();
        canvas2D.font = `${fontSize}px sans-serif`;
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


//text box becomes visible on click
body.addEventListener("click", function() {

    if(textArea.style.visibility == "hidden") {
        textArea.style.visibility = "visible";

        setTimeout(function() {
            if(user == undefined) {

                textArea.style.visibility = "hidden";
            }
        }, 10000);
    } 
});


//reassigns values if screen size changes
window.addEventListener("resize", function() {

   displayOn();
});


window.onload = function() {

    displayOn();

    update();
};
