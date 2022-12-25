const body = document.querySelector(".body");
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const footer = document.querySelector(".footer");
const textArea = document.getElementById("text-area");

let allow = true; //use for Interval
let alpha = 0.05;
let fallArr = [];
let fontSize = 13;
let frames = 0;

let off; //to set and clear interval
let columns;
let screenHeight;
let screenWidth;
let time; //used to time interval
let user; //for user input

//alphabets of different languages
const arabic = "ضصثقفغعهخحجشسيبلاتنمكةءظطذدزروى".split(""); 
const numbers = "01234567890123456789".split("");
const chinese = "诶比西迪伊艾弗吉尺杰开勒马娜哦屁吾儿丝提伊吾维豆贝尔维克斯吾贼德".split("");
const greek = "ABГΔЄZHѲIKΛMNΞOПPΣTYΦXΨΩ".split("");
const hindi = "औऐआईऊभऋघधझढओएअइउफृखथछठँऑज्ञणक्ष़शषौौैाी".split("");
const japanese = "あかさたなはまやらわ".split("");
const korean = "ㅂㅈㄷㄱ쇼ㅕㅑㅐㅔㅁㄴㅇㄹ호ㅓㅏㅣㅋㅌㅊ퓨ㅜㅡ".split("");
const roman = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const russian = "ЙЦУКЕНГШЩЗХФЫВАПРОЛДЖЭЯЧСМИТЬБЮ".split("");

//modifiable array, commas separate concantenated arrays properly
let keymaker = arabic +","+ numbers +","+ chinese +","+ greek +","+ hindi +","+ japanese +","+ korean +","+ roman +","+ russian;
keymaker = keymaker.split(",");

//charcters displayed on screen
let matrix = keymaker;

//sets height and width of display
function display() {
    screenHeight = window.innerHeight;
    screenWidth = window.innerWidth; 
    canvas.height = screenHeight;
    canvas.width = screenWidth;
    columns = screenWidth / fontSize;
    textArea.style.visibility = "hidden";
}


//Returns a random number within a chosen range
function randomRange(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
//Math.floor() rounds down to the nearest whole number  e.i. 10 = 0 - 9  
//Math.random() returns a random decimal between 0 - 0.99
}


class Artitect {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.i = 0;
    }

    //shades of green
    greenShade() {
        let dice = randomRange(1,100);

        if(dice == 1) {
            return "chartreuse";
        } else if(dice == 2) {
            return "green";
        } else {
            return "rgb(0,255,0)";
        }
    }

    draw() {
        c.fillStyle = this.greenShade();
        c.font = `${fontSize}px sans-serif`;
        c.fillText(this.value, this.x, this.y);
    }

    update() { 
        this.draw();

        //checks for user input
        if(user != undefined && user != "") {
            
            //also prevents undefined after deleted characters
            if(this.i > matrix.length - 1) {
                this.i = 0;
            }

            //displays in order what teh user writes
            this.value = matrix[this.i]; 
            this.i++;
            
        } else {
            //displays randomly all characters in the array
            this.value = matrix[randomRange(0, matrix.length - 1)];
        }

        this.speed = ((Math.random() * fontSize * 3) / 4) + (fontSize * 3) / 4;
        this.y += this.speed;    
    }
}

function animate() {
    
    requestAnimationFrame(animate);
    
    c.fillStyle = `rgba(0, 0, 0, ${alpha})`;
    c.fillRect(0, 0, screenWidth, screenHeight);

    if(screenWidth > 1000) {
        alpha = 0.03;
    } else {
        alpha = 0.05;
    }

    let key = new Artitect(Math.floor(Math.random() * columns) * fontSize, 0);

    fallArr.push(key);
    frames++;

    for(let i = 0; i < fallArr.length && frames % 2 == 0; i++) {

        fallArr[i].update();

        if(fallArr[i].y > screenHeight) {

            fallArr.splice(i,1); //deletes off screen characters
        }
    }
};


//textarea becomes visible on click
body.addEventListener("click", function() {

    time = 10000; //sets & resets time

    footer.style.visibility == "visible" ? footer.style.visibility = "hidden" : footer.style.visibility = "visible";

    if(textArea.style.visibility == "hidden") {
        textArea.style.visibility = "visible";

        if(allow) {

            allow = false; //prevents multiple intervals

            off = setInterval(() => {
                time -= 1000;
            
                if(time <= 0) {
                    textArea.style.visibility = "hidden";
                    footer.style.visibility = "hidden";
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

        matrix = keymaker; //original array

    } else if(user != undefined) {

        user = user.split("");

        matrix = user;
    }
});


//prevents infite loop when loading page on mobile
setTimeout(function() {
    window.addEventListener("resize", function() {
        
       //Only way found to avoid a canvas resize bug on mobile
        setTimeout(function() {

            display();

        },50);
    });
}, 25); 


//on screenload runs program
window.onload = function() {

    display();
    
    animate();
};
