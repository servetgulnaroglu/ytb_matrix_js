const body = document.querySelector(".body");
const canvas = document.getElementById("canvas");
const canvas2D = canvas.getContext("2d");
const textArea = document.getElementById("text-area");

let allow = true; //use for Interval
let fallArr = [];
let fontSize = 13;
let frames = 0;
let limit = 275; //limit of characters on screen

let maxColumns;
let screenHeight;
let screenWidth;
let time; //used to time interval
let off; //use to set and clear interval
let user; //for user input

//alphabets of different languages
let arabic = "ضصثقفغعهخحجشسيبلاتنمكةءظطذدزروى".split(""); 
let arabicNum = "01234567890123456789".split("");
let chinese = "诶比西迪伊艾弗吉尺杰开勒马娜哦屁吾儿丝提伊吾维豆贝尔维克斯吾贼德".split("");
let greek = "ABГΔЄZHѲIKΛMNΞOПPΣTYΦXΨΩ".split("");
let hindi = "औऐआईऊभऋघधझढओएअइउफृखथछठँऑज्ञणक्ष़शषौौैाी".split("");
let japanese = "あかさたなはまやらわ".split("");
let korean = "ㅂㅈㄷㄱ쇼ㅕㅑㅐㅔㅁㄴㅇㄹ호ㅓㅏㅣㅋㅌㅊ퓨ㅜㅡ".split("");
let roman = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let russian = "ЙЦУКЕНГШЩЗХФЫВАПРОЛДЖЭЯЧСМИТЬБЮ".split("");

//makes for a modifiable array
let matrix = (arabic + arabicNum + chinese + greek + hindi + japanese + korean + roman + russian).split(",");

//charcters displayed on screen
let charArr = matrix;

//sets height and width of display
function displayOn() {
    screenHeight = document.documentElement.scrollHeight;
    screenWidth = document.documentElement.scrollWidth; 
    canvas.height = screenHeight;
    canvas.width = screenWidth;
    maxColumns = screenWidth / fontSize;
    textArea.style.visibility = "hidden";

    console.log(screenWidth);
}


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


class Artitect {
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

const keymaker = () => {

    if(fallArr.length < limit) {

        let character = new Artitect(Math.floor(Math.random() * maxColumns) * fontSize, ((Math.random() * screenHeight) / 2) - 50 );

        fallArr.push(character);
    }

    canvas2D.fillStyle = "rgba(0,0,0,0.05)";
    canvas2D.fillRect(0, 0, screenWidth, screenHeight);

    for(let i = 0; i < fallArr.length && frames % 2 == 0; i++) {

        fallArr[i].draw(canvas2D);
    }

    requestAnimationFrame(keymaker);
    frames++;
};


//textarea becomes visible on click
body.addEventListener("click", function() {

    time = 10000; //sets & resets time

    if(textArea.style.visibility == "hidden") {
        textArea.style.visibility = "visible";

        if(allow) {

            allow = false; //prevents multiple intervals

            off = setInterval(() => {
                time -= 1000;
            
                if(time <= 0) {
                    textArea.style.visibility = "hidden";
                    clearInterval(off);
                    allow = true;
                }

            }, 1000);
        }
    }
});

 
textArea.addEventListener("input", function() {

    user = textArea.value; //user input
    time = 10000; //resets time to hide textarea

    if(user == "") {

        charArr = matrix; //original array

    } else if(user != undefined) {

        charArr = user.split(""); //user input fed to array
    }
});


//reassigns values if screen size changes
window.addEventListener("resize", function() {

   displayOn();

});


//on screenload runs program
window.onload = function() {

    displayOn();

    keymaker();
};
