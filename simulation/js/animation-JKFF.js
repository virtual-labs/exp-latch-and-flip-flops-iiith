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
// Fifth dot is from Reset



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

// colours the dots of every input as per the value of that input
function inputDotColours() {
    setter(textInput[0].textContent,dots[0]);
    for(let i=1;i<5;i++){
        setter(textInput[1].textContent,dots[i]);
    }
    setter(textInput[2].textContent,dots[5]);
}

// sets the inputs to their starting values: J = 0, Clock = 1, K = 0
function initInputs() {
    textIOInit();
    appendSet();
    appendClock();
    appendClock();
    appendReset();
}

function appendSet() {
    toggleInput(0,16,124);
}
function appendClock() {
    toggleInput(1,16,324);
}
function appendReset() {
    toggleInput(2,16,524);
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
    if (textInput[1].textContent !== "0")
    changeto0(16,324,1,1);
    setter(textInput[1].textContent,dots[3]);
    setter(textInput[1].textContent,dots[4]);
    objectAppear(dots[3]);
    objectAppear(dots[4]);
}


// the flip-flop keeps its state between the runs; it starts in the SET state (Q = 1, Q' = 0), like the Practice tasks
let stateQ = "1";
let stateQbar = "0";
// state before the run that is going on (or has just finished)
let previousQ = "1";
let previousQbar = "0";

// shows the stored state on the output bits Q and Q'
function showState() {
    textOutput[0].textContent = stateQ;
    textOutput[1].textContent = stateQbar;
    setter(stateQ,objects[3]);
    setter(stateQbar,objects[4]);
    outputVisible();
}

// returns true if the inputs can be changed; a finished simulation is rewound so that new inputs can be tried
function inputsEditable() {
    if (timeline.progress() === 1) {
        rewind();
    }
    if (timeline.progress() !== 0) {
        observ.innerHTML = "Inputs cannot be changed while the simulation is running. Please click on Reset to change them.";
        return false;
    }
    return true;
}

// toggles the value of an input bit between 0 and 1
function toggleInput(index,coordinateX,coordinateY) {
    if (!inputsEditable()) {
        return;
    }
    if (textInput[index].textContent !== "0") {
        changeto0(coordinateX,coordinateY,index,index);
    }
    else {
        changeto1(coordinateX,coordinateY,index,index);
    }
    inputDotColours();
}

function stage1() {
    // NAND(J, Clock, Q') and NAND(Clock, K, Q) of the master latch
    if(textInput[0].textContent==="0" || textInput[1].textContent==="0" || stateQbar==="0"){
        nand1 = "1";
    }
    else{
        nand1 = "0";
    }

    if(textInput[1].textContent==="0" || textInput[2].textContent==="0" || stateQ==="0"){
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
    else if(nand1 ==="0" && nand2 ==="0") {
        nand3 = "1";
        nand4 = "1";
    }
    else {
        // the master latch holds its state, which is the stored state of the flip-flop
        nand3 = stateQ;
        nand4 = stateQbar;
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
    // the slave latch takes over the state of the master when the clock falls
    const j = textInput[0].textContent;
    const k = textInput[2].textContent;
    if(j === "0" && k === "1"){
        stateQ = "0";
        stateQbar = "1";
    }
    else if(j === "1" && k === "0"){
        stateQ = "1";
        stateQbar = "0";
    }
    else if(j === "1" && k === "1"){
        const temp = stateQ;
        stateQ = stateQbar;
        stateQbar = temp;
    }
    // J = K = 0: the state is held
    objectDisappear(dots[0]);
    objectDisappear(dots[5]);
    showState();
}

function display() {
    decide = false;
    status.innerHTML = "Start";
    const j = textInput[0].textContent;
    const k = textInput[2].textContent;
    let operation = "Hold: Q keeps its value";
    if (j === "0" && k === "1") {
        operation = "Reset: Q becomes 0";
    }
    else if (j === "1" && k === "0") {
        operation = "Set: Q becomes 1";
    }
    else if (j === "1" && k === "1") {
        operation = "Toggle: Q changes to its complement";
    }
    observ.innerHTML = `Simulation has finished.<br>J = ${j}, K = ${k}: ${operation}. The output changes when the clock falls (master-slave).<br>Q was ${previousQ} and is now ${stateQ}, Q' was ${previousQbar} and is now ${stateQbar}.<br>Change the inputs and click on Start to apply another clock pulse.`;
}

function setSpeed(speed) {
    timeline.timeScale(parseInt(speed));
    if (circuitStarted) {
        observ.innerHTML = `${speed}x speed`;
    }
}

// takes the timeline back to the beginning while keeping the selected input values and the stored state
function rewind() {
    timeline.seek(0);
    timeline.pause();
    inputDotDisappear();
    // the animation brings the clock down at the end of the run; it is high again for the next run
    changeto1(16,324,1,1);
    inputDotColours();
    showState();
    decide = false;
    status.innerHTML = "Start";
}

function restartCircuit() {
    if (circuitStarted) {
        circuitStarted = false;
    }
    timeline.seek(0);
    timeline.pause();
    allDisappear();
    stateQ = "1";
    stateQbar = "0";
    initInputs();
    showState();
    decide = false;
    status.innerHTML = "Start";
    observ.innerHTML = "Successfully restored. Initially the circuit is in the SET state, i.e. Q = 1 and Q' = 0.";
    speed.selectedIndex = 0;
    timeline.timeScale(1);
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
        observ.innerHTML = "Simulation has been Paused. Please click on the 'Start' button to Resume.";
        decide = false;
        status.innerHTML = "Start";
    }
}
function startCircuit() {
    if (timeline.progress() === 1) {
        rewind();
    }
    if (timeline.progress() === 0) {
        if (textInput[1].textContent === "0") {
            observ.innerHTML = "Please set the Clock as 1: the flip-flop changes its state only when the clock is applied.";
            return;
        }
        previousQ = stateQ;
        previousQbar = stateQbar;
    }
    if (timeline.progress() !== 1) {
        circuitStarted = true;
        timeline.play();
        timeline.timeScale(parseInt(speed.value));
        observ.innerHTML = "Simulation has started.";
        decide = true;
        status.innerHTML = "Pause";
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
initInputs();
showState();
