import { setCoordinates,fillInputDots,fillColor,objectDisappear,objectAppear,setter, calculateNot, calculateAnd} from "./animation-utility.js";

'use strict'

window.appendSet = appendSet;
window.appendClock = appendClock;
window.appendReset = appendReset;
window.simulationStatus = simulationStatus;
window.restartCircuit = restartCircuit;
window.setSpeed=setSpeed;



// Dimensions of working area
const circuitBoard = document.getElementById("circuit-board");
const sidePanels = document.getElementsByClassName("v-datalist-container");
// Distance of working area from top
const circuitBoardTop = circuitBoard.offsetTop;
// Full height of window
const windowHeight = window.innerHeight;
const width = window.innerWidth;

const svg = document.querySelector(".svg");
const svgns = "http://www.w3.org/2000/svg";

const EMPTY="";
// stroing the necessary div elements in const
const status = document.getElementById("play-or-pause");
const observ = document.getElementById("observations");
const speed = document.getElementById("speed");

// global varaibles declared here
const objects = [
    document.getElementById("set"),
    document.getElementById("clock"),
    document.getElementById("reset"),
    document.getElementById("output-q"),
    document.getElementById("output-qbar")
];
const textInput = [
    document.createElementNS(svgns, "text"),
    document.createElementNS(svgns, "text"),
    document.createElementNS(svgns, "text")
];
const textOutput = [
    document.createElementNS(svgns, "text"),
    document.createElementNS(svgns, "text")
];
const dots = [
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle")
];
// First dot emerges from Set
// Next 2 dots emerge from Clock
// Third dot is from Reset



// decide help to decide the speed
let decide = false;
// circuitStarted is initialised to 0 which depicts that demo hasn't started whereas circuitStarted 1 depicts that the demo has started.
let circuitStarted = false;


// function to take care of width
function demoWidth() {
    if (width < 1024) {
        circuitBoard.style.height = "600px";
    } else {
        circuitBoard.style.height = `${windowHeight - circuitBoardTop - 20}px`;
    }
    sidePanels[0].style.height = circuitBoard.style.height;
}

// function to initialise the input text i.e. either 0/1 that gets displayed after user click on them
function textIOInit() {
    for( const text of textInput){
        text.textContent = 2;
    }
}


// function to mark the output coordinates
function outputCoordinates() {
    setCoordinates(946,234,textOutput[0]);
    svg.append(textOutput[0]);
    setCoordinates(946,494,textOutput[1]);
    svg.append(textOutput[1]);
}

// function to mark the input dots
function inputDots() {
    for(const dot of dots){
        fillInputDots(dot,20,550,15,"#FF0000");
        svg.append(dot);
    }
}

// function to disappear the input dots
function inputDotDisappear() {
    for(const dot of dots){
        objectDisappear(dot);
    }
}

// function to appear the input dots
function inputDotVisible() {
    for(const dot of dots){
        objectAppear(dot);
    }
}
// function to disappear the output text
function outputDisappear() {
    for(const text of textOutput){
        objectDisappear(text);
    }
}
// function to appear the output text
function outputVisible() {
    for(const text of textOutput){
        objectAppear(text);
    }
}
// function to diappear the input text
function inputTextDisappear() {
    for(const text of textInput){
        objectDisappear(text);
    }
}

function clearObservation() {
    observ.innerHTML = EMPTY;
}
function allDisappear() {
    inputDotDisappear();
    outputDisappear();
    inputTextDisappear();
    for(const object of objects){
        fillColor(object,"#008000");
    }
}

function appendSet() {
    if (textInput[0].textContent !== "0" && timeline.progress() === 0) {
        changeto0(16,24,0,0);
        observ.innerHTML = "Set bit is equal to 0";
    }
    else if (textInput[0].textContent !== "1" && timeline.progress() === 0) {
        changeto1(16,24,0,0);
        observ.innerHTML = "Set bit is equal to 1";
    }
    else
    {
        observ.innerHTML = "Cannot change the set bit once the simulation has started";
    }
    setter(textInput[0].textContent,dots[0]);
}
function appendClock() {
    if (textInput[1].textContent !== "0" && timeline.progress() === 0) {
        changeto0(16,364,1,1);
    }
    else if (textInput[1].textContent !== "1" && timeline.progress() === 0) {
        changeto1(16,364,1,1);
        observ.innerHTML = "Clock is turned ON";
    }
    else
    {
        observ.innerHTML = "Cannot change the clock bit once the simulation has started";
    }
    setter(textInput[1].textContent,dots[1]);
    setter(textInput[1].textContent,dots[2]);
}
function appendReset() {
    if (textInput[2].textContent !== "0" && timeline.progress() === 0) {
        changeto0(16,704,2,2);
        observ.innerHTML = "Reset bit is equal to 0";
    }
    else if (textInput[2].textContent !== "1" && timeline.progress() === 0) {
        changeto1(16,704,2,2);
        observ.innerHTML = "Reset bit is equal to 1";
    }
    else
    {
        observ.innerHTML = "Cannot change the reset bit once the simulation has started";
    }
    setter(textInput[2].textContent,dots[3]);
}

function changeto1(coordinateX,coordinateY,object,textObject) {
    textInput[textObject].textContent = 1;
    svg.appendChild(textInput[textObject]);
    setCoordinates(coordinateX,coordinateY,textInput[textObject]);
    fillColor(objects[object],"#29e");
    clearObservation();
    objectAppear(textInput[textObject]);
}

function changeto0(coordinateX,coordinateY,object,textObject) {
    textInput[textObject].textContent = 0;
    svg.appendChild(textInput[textObject]);
    setCoordinates(coordinateX,coordinateY,textInput[textObject]);
    fillColor(objects[object],"#eeeb22");
    clearObservation();
    objectAppear(textInput[textObject]);
}

let nand1 = "0";
let nand2 = "0";


function stage1() {
    nand1 = calculateNot(calculateAnd(textInput[0].textContent,textInput[1].textContent));
    nand2 = calculateNot(calculateAnd(textInput[1].textContent,textInput[2].textContent));
    setter(nand1,dots[0]);
    setter(nand2,dots[2]);
    objectDisappear(dots[1]);
    objectDisappear(dots[3]);   
}

function outputSetter(){
    if(textInput[1].textContent === "1" )
    {
        if(textInput[0].textContent === "1" && textInput[2].textContent === "0")
        {
            textOutput[0].textContent = "1";
            textOutput[1].textContent = "0";
        }
        else if(textInput[0].textContent === "0" && textInput[2].textContent === "1")
        {
            textOutput[0].textContent = "0";
            textOutput[1].textContent = "1";
        }
        else
        {
            console.debug("error! Invalid state");
        }
        
    }
    setter(textOutput[0].textContent,objects[3]);
    setter(textOutput[1].textContent,objects[4]);
    objectDisappear(dots[0]);
    objectDisappear(dots[2]);
}

function display() {
    observ.innerHTML = "Simulation has finished. Press Restart to start again"
}

function reboot() {
    for(const text of textInput){
        text.textContent = 2;
    }
}

function setSpeed(speed) {
    if (circuitStarted) {
        timeline.timeScale(parseInt(speed));
        observ.innerHTML = `${speed}x speed`;
    }
}

function restartCircuit() {
    if (circuitStarted) {
        circuitStarted = false;
    }
    timeline.seek(0);
    timeline.pause();
    allDisappear();
    reboot();
    clearObservation();
    decide = false;
    status.innerHTML = "Start";
    observ.innerHTML = "Successfully restored";
    speed.selectedIndex = 0;
}

function simulationStatus() {
    if (!decide) {
        startCircuit();
    }
    else {
        stopCircuit();
    }
}
function stopCircuit() {
    if (timeline.progress() !== 1) {
        timeline.pause();
        observ.innerHTML = "Simulation has been stopped.";
        decide = false;
        status.innerHTML = "Start";
        speed.selectedIndex = 0;
    }
    else {
        observ.innerHTML = "Please Restart the simulation";
    }
}
function startCircuit() {
    if(textInput[1].textContent==="0")
    {
        observ.innerHTML = "Please set the Clock as 1";
        return;
    }

    if(textInput[0].textContent==="1" && textInput[2].textContent==="1")
    {
        observ.innerHTML = "Invaid State, Set and Reset both cannot be 1";
        return;
    }


    for(const text of textInput){
        if (text.textContent === "2") {
            observ.innerHTML = "Please set the input values";
            return;
        }
    }
    if (timeline.progress() !== 1) {
        circuitStarted = true;
        timeline.play();
        timeline.timeScale(1);
        observ.innerHTML = "Simulation has started.";
        decide = true;
        status.innerHTML = "Pause";
        speed.selectedIndex = 0;
    }
    else {
        observ.innerHTML = "Please Restart the simulation";
    }
}



// all the execution begin here
let timeline = gsap.timeline({ repeat: 0, repeatDelay: 0 });
gsap.registerPlugin(MotionPathPlugin);
demoWidth();
// calling all the functions that are going to initialise 
textIOInit();
outputCoordinates();
inputDots();
outputDisappear();

timeline.add(inputDotVisible, 0);
timeline.add(stage1,10);
timeline.add(outputSetter,18);
timeline.add(outputVisible,18);
timeline.eventCallback("onComplete", outputVisible);
timeline.eventCallback("onComplete", display);

timeline.to(dots[0], {
    motionPath: {
        path: "#path1",
        align: "#path1",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[1], {
    motionPath: {
        path: "#path2",
        align: "#path2",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[2], {
    motionPath: {
        path: "#path3",
        align: "#path3",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[3], {
    motionPath: {
        path: "#path4",
        align: "#path4",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[0], {
    motionPath: {
        path: "#path5",
        align: "#path5",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },
    
    duration: 7,
    delay: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

},0);
timeline.to(dots[2], {
    motionPath: {
        path: "#path6",
        align: "#path6",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 7,
    delay: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);

timeline.pause();
inputDotDisappear();