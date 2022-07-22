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
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle")
];
// First dot emerges from Set
// Next 4 dots emerge from Clock
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
    setCoordinates(796,184,textOutput[0]);
    svg.append(textOutput[0]);
    setCoordinates(796,464,textOutput[1]);
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
        changeto0(16,124,0,0);
        observ.innerHTML = "Set bit is equal to 0";
    }
    else if (textInput[0].textContent !== "1" && timeline.progress() === 0) {
        changeto1(16,124,0,0);
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
        changeto0(16,324,1,1);
    }
    else if (textInput[1].textContent !== "1" && timeline.progress() === 0) {
        changeto1(16,324,1,1);
        observ.innerHTML = "Clock is turned ON";
    }
    else
    {
        observ.innerHTML = "Cannot change the clock bit once the simulation has started";
    }
    setter(textInput[1].textContent,dots[1]);
    setter(textInput[1].textContent,dots[2]);
    setter(textInput[1].textContent,dots[3]);
    setter(textInput[1].textContent,dots[4]);
}
function appendReset() {
    if (textInput[2].textContent !== "0" && timeline.progress() === 0) {
        changeto0(16,524,2,2);
        observ.innerHTML = "Reset bit is equal to 0";
    }
    else if (textInput[2].textContent !== "1" && timeline.progress() === 0) {
        changeto1(16,524,2,2);
        observ.innerHTML = "Reset bit is equal to 1";
    }
    else
    {
        observ.innerHTML = "Cannot change the reset bit once the simulation has started";
    }
    setter(textInput[2].textContent,dots[5]);
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
let nand3 = "0";
let nand4 = "0";
let not = "0";
let nand5 = "0";
let nand6 = "0";

function partialDotsDisappear() {
    objectDisappear(dots[3]);
    objectDisappear(dots[4]);
}

function partialDotsAppear() {
    objectAppear(dots[3]);
    objectAppear(dots[4]);
}


function stage1() {
    if(textInput[0].textContent==="0" || textInput[1].textContent==="0"){
        nand1 = "1";
    }
    else{
        nand1 = "0";
    }
    
    if(textInput[1].textContent==="0" || textInput[2].textContent==="0"){
        nand2 = "1";
    }
    else{
        nand2 = "0";
    }
    setter(nand1,dots[0]);
    setter(nand2,dots[5]);
    objectDisappear(dots[1]);
    objectDisappear(dots[2]);
}

function stage2() {
    if(nand1==="1" && nand2==="0"){
        nand3 = "0";
        nand4 = "1";
    }
    else if(nand1==="0" && nand2==="1"){
        nand3 = "1";
        nand4 = "0";
    }
    else {
        nand3 = "1";
        nand4 = "1";
    }
    setter(nand3,dots[0]);
    setter(nand4,dots[5]);
}

function stage3() {
    not = calculateNot(textInput[1].textContent);
    setter(not,dots[3]);
}
function stage4() {
    setter(not,dots[4]);
}

function stage5() {
    nand5 = calculateNot(calculateAnd(nand3,not));
    nand6 = calculateNot(calculateAnd(nand4,not));
    setter(nand5,dots[0]);
    setter(nand6,dots[5]);
    objectDisappear(dots[3]);
    objectDisappear(dots[4]);
}

function outputSetter(){
    if(textInput[1].textContent==="1"){
        if(textInput[0].textContent === "1" && textInput[2].textContent === "0"){
            textOutput[0].textContent = "0";
            textOutput[1].textContent = "1";
        }
        else if(textInput[0].textContent === "0" && textInput[2].textContent === "0"){
            textOutput[0].textContent = "1";
            textOutput[1].textContent = "0";
        }
        else if(textInput[0].textContent === "1" && textInput[2].textContent === "1"){
            const temp = textOutput[0].textContent;
            textOutput[0].textContent = textOutput[1].textContent;
            textOutput[1].textContent = temp;
        }
        else
        {
            // output remains the same  
        }
    }
    else
    {
        // output remains the same
        console.debug("Error! Clock is not turned ON");
    }
    objectDisappear(dots[0]);
    objectDisappear(dots[5]);
    setter(textOutput[0].textContent,objects[3]);
    setter(textOutput[1].textContent,objects[4]);
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
    observ.innerHTML = "Successfully restored. ";
    observ.innerHTML += "Initially the circuit is in reset state. i.e. Q = 0 and Q' = 1";
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
    textOutput[0].textContent = "0";
    textOutput[1].textContent = "1";


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
timeline.add(partialDotsDisappear, 0);
timeline.add(stage1,4);
timeline.add(partialDotsAppear,8);
timeline.add(stage2,10);
timeline.add(stage3,11);
timeline.add(stage4,12);
timeline.add(stage5,14);
timeline.add(outputSetter,20);
timeline.add(outputVisible,20);
timeline.eventCallback("onComplete", outputVisible);
timeline.eventCallback("onComplete", display);

timeline.to(dots[0], {
    motionPath: {
        path: "#path1",
        align: "#path1",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 20,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[1], {
    motionPath: {
        path: "#path3",
        align: "#path3",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 3.5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[2], {
    motionPath: {
        path: "#path4",
        align: "#path4",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 3.5,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[3], {
    motionPath: {
        path: "#path5",
        align: "#path5",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 5.5,
    delay: 8,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
timeline.to(dots[4], {
    motionPath: {
        path: "#path6",
        align: "#path6",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },
    
    duration: 5.5,
    delay: 8,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

},0);
timeline.to(dots[5], {
    motionPath: {
        path: "#path2",
        align: "#path2",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },
    
    duration: 20,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

},0);

observ.innerHTML = "Initially the circuit is in reset state. i.e. Q = 0 and Q' = 1";
timeline.pause();
inputDotDisappear();