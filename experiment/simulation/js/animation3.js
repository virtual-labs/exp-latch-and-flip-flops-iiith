// Dimensions of working area
const circuitBoard = document.getElementById("circuit-board");
const sidePanels = document.getElementsByClassName("v-datalist-container");
// Distance of working area from top
const circuitBoardTop = circuitBoard.offsetTop;
// Full height of window
const windowHeight = window.innerHeight;
const width = window.innerWidth;
if (width < 1024) {
  circuitBoard.style.height = 600 + "px";
} else {
  circuitBoard.style.height = windowHeight - circuitBoardTop - 20 + "px";
}
sidePanels[0].style.height = circuitBoard.style.height;

// Instruction box
const instructionBox = document.getElementsByClassName("instructions-box")[0];
instructionBox.addEventListener("click", (e) => {
  instructionBox.classList.toggle("expand");
});

const svg = document.querySelector(".svg");
const inputpath1 = document.querySelector("#inputpath1");
const svgns = "http://www.w3.org/2000/svg";
gsap.registerPlugin(MotionPathPlugin);


let textToggle = document.createElementNS(svgns, "text");

let textClock = document.createElementNS(svgns, "text");
let textOutput1 = document.createElementNS(svgns, "text");
let textOutput2 = document.createElementNS(svgns, "text");
textOutput1.textContent = 0;
textOutput2.textContent = 1;// THIS IS IN THE RESET STATE
textToggle.textContent = 2;

textClock.textContent = 2;
gsap.set(textOutput1, {
    x: 896,
    y: 424
});
gsap.set(textOutput2, {
    x: 896,
    y: 604
});
svg.appendChild(textOutput1);
svg.appendChild(textOutput2);
const TOGGLE = document.getElementById("TOGGLE");

const CLOCK = document.getElementById("CLOCK");
const OUTPUT1 = document.getElementById("OUTPUTQ1");
const OUTPUT2 = document.getElementById("OUTPUTQ2");
const BUTTON = document.getElementById("play/pause");
const OBSERV = document.getElementById("Observations");

let toggleDot1 = document.createElementNS(svgns, "circle");
gsap.set(toggleDot1, {
    attr: { cx: 20, cy: 120, r: 15, fill: "#FF0000" }
});
let clockDot = document.createElementNS(svgns, "circle");
gsap.set(clockDot, {
    attr: { cx: 20, cy: 510, r: 15, fill: "#FF0000" }
});
let toggleDot2 = document.createElementNS(svgns, "circle");
gsap.set(toggleDot2, {
    attr: { cx: 20, cy: 120, r: 15, fill: "#FF0000" }
});

svg.appendChild(toggleDot1);
svg.appendChild(clockDot);
svg.appendChild(toggleDot2);

function myFunction() {
    OBSERV.innerHTML = "Initially the flip flop is in the reset state";
}
function toggleDotDisappear() {
    TweenLite.to(toggleDot1, 0, { autoAlpha: 0 });
    TweenLite.to(toggleDot2, 0, { autoAlpha: 0 });
}

function clockDotDisappear() {
    TweenLite.to(clockDot, 0, { autoAlpha: 0 });

}
function toggleDotVisible() {
    TweenLite.to(toggleDot1, 0, { autoAlpha: 1 });
    TweenLite.to(toggleDot2, 0, { autoAlpha: 1 });
}

function clockDotVisible() {
    TweenLite.to(clockDot, 0, { autoAlpha: 1 });

}
function outputDisappear() {
    TweenLite.to(textOutput1, 0, { autoAlpha: 0 });
    TweenLite.to(textOutput2, 0, { autoAlpha: 0 });
}
function outputVisible() {
    TweenLite.to(textOutput1, 0, { autoAlpha: 1 });
    TweenLite.to(textOutput2, 0, { autoAlpha: 1 });
}
function toggleDisappear() {
    TweenLite.to(textToggle, 0, { autoAlpha: 0 });
}
function clockDisappear() {
    TweenLite.to(textClock, 0, { autoAlpha: 0 });
}
function free() {
    OBSERV.innerHTML = "";
}
function toggleVisible() {
    TweenLite.to(textToggle, 0, { autoAlpha: 1 });
}
function clockVisible() {
    TweenLite.to(textClock, 0, { autoAlpha: 1 });
}


outputDisappear();
function allDisappear() {
    toggleDisappear();
    toggleDotDisappear();

    clockDisappear();
    clockDotDisappear();
    outputDisappear();
    gsap.set(TOGGLE, {

        fill: "#008000"
    });

    gsap.set(CLOCK, {

        fill: "#008000"
    });
    gsap.set(OUTPUT1, {

        fill: "#008000"
    });
    gsap.set(OUTPUT2, {

        fill: "#008000"
    });

}
function outputHandler() {
    if (textToggle.textContent == 1) {
        var temp = textOutput1.textContent;
        textOutput1.textContent = textOutput2.textContent;
        textOutput2.textContent = temp;
    }
    else if (textToggle.textContent == 0) {
        textOutput1.textContent = textOutput1.textContent;
        textOutput2.textContent = textOutput2.textContent;
    }

}
function set(a) {
    gsap.set(a, {

        fill: "#eeeb22"
    });
}//output 0
function unset(a) {
    gsap.set(a, {

        fill: "#29e"
    });
}//output 1
function appendToggle() {
    if (textToggle.textContent != 0 && tl.progress()==0) {
        toggleDisappear();
        textToggle.textContent = 0;
        svg.appendChild(textToggle);
        gsap.set(textToggle, {
            x: 16,
            y: 124
        });
        gsap.set(TOGGLE, {

            fill: "#eeeb22"
        });
        free();
        toggleVisible();
        errno();
        setter(textToggle.textContent, toggleDot1);
        setter(textToggle.textContent, toggleDot2);
        OBSERV.innerHTML = "Toggle bit is set to 0";
    }
    else if (textToggle.textContent != 1 && tl.progress()==0) {
        appendToggleTo1();
    }




}
function appendClock() {
    if (textClock.textContent != 0 && tl.progress()==0) {
        clockDisappear();
        textClock.textContent = 0;
        svg.appendChild(textClock);
        gsap.set(textClock, {
            x: 16,
            y: 514
        });
        gsap.set(CLOCK, {

            fill: "#eeeb22"
        });
        free();
        clockVisible();
        setter(textClock.textContent, clockDot);

        errno();
    }
    else if (textClock.textContent != 1 && tl.progress()==0) {
        appendClockTo1()
    }

}
function appendClockTo1() {
    clockDisappear();
    textClock.textContent = 1;
    svg.appendChild(textClock);
    gsap.set(textClock, {
        x: 16,
        y: 514
    });
    gsap.set(CLOCK, {

        fill: "#29e"
    });
    free();
    clockVisible();
    setter(textClock.textContent, clockDot);

    errno();
    OBSERV.innerHTML = "Clock is turned ON";

}
function reboot() {
    textToggle.textContent = 2;

    textClock.textContent = 2;

}



function appendToggleTo1() {
    toggleDisappear();
    textToggle.textContent = 1;
    svg.appendChild(textToggle);
    gsap.set(textToggle, {
        x: 16,
        y: 124
    });
    gsap.set(TOGGLE, {

        fill: "#29e"
    });
    free();
    toggleVisible();
    errno();
    setter(textToggle.textContent, toggleDot1);
    setter(textToggle.textContent, toggleDot2);
    OBSERV.innerHTML = "Toggle bit is set to 1";

}



function outputSetter() {
    setter(textOutput1.textContent, OUTPUT1);
    setter(textOutput2.textContent, OUTPUT2);
}

function errno() {

}
function batado() {
    OBSERV.innerHTML = "Simulation has finished. Press Restart to start again";
}
function setter(a, b) {
    if (a == 1) {
        unset(b);

    }
    else if (a == 0) {
        set(b);
    }
}
outputDisappear();
var tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });

function fourXspeed() {
    if (textClock.textContent == 1 && textToggle.textContent != 2 && tl.progress() != 1) {
        tl.resume();
        tl.timeScale(4);
        OBSERV.innerHTML = "4x speed";
        decide = 1;
        BUTTON.innerHTML = "Halt";
    }
}
function SetSpeed(speed) {
    if (speed == "1") {
        startCircuit();
    }
    else if (speed == "2") {
        doubleSpeed();
    }
    else if (speed == "4") {
        fourXspeed();
    }
    

}
const SPEED = document.getElementById("speed");
function doubleSpeed() {
    if (textClock.textContent == 1 && textToggle.textContent != 2 && tl.progress() != 1) {
        tl.resume();
        tl.timeScale(2);
        OBSERV.innerHTML = "2x speed";
        decide = 1;
        BUTTON.innerHTML = "Halt";
    }
}
var decide = 0;
function button() {
    if (decide == 0) {
        startCircuit();

    }
    else if (decide == 1) {
        stopCircuit();

    }
}
function restartCircuit() {
    tl.seek(0);
    tl.pause();
    allDisappear();
    reboot();

    myFunction();
    decide = 0;
    BUTTON.innerHTML = "Start";
    SPEED.selectedIndex=0;
}
function stopCircuit() {
    if (tl.time() != 0 && tl.progress() != 1) {
        tl.pause();
        OBSERV.innerHTML = "Simulation has been stopped.";
        decide = 0;
        BUTTON.innerHTML = "Start";
        SPEED.selectedIndex=0;
    }
    else if (tl.progress() == 1) {
        OBSERV.innerHTML = "Please Restart the simulation";
    }
}

function startCircuit() {
    if (textClock.textContent == 1 && textToggle.textContent != 2 && tl.progress() != 1) {
        tl.play();
        tl.timeScale(1);
        OBSERV.innerHTML = "Simulation has started.";
        decide = 1;
        BUTTON.innerHTML = "Halt";
        SPEED.selectedIndex=0;
    }
    else if (textToggle.textContent == 2 || textClock.textcontent == 2) {
        OBSERV.innerHTML = "Please select the values";
    }
    else if (textClock.textContent == 0) {
       OBSERV.innerHTML = "Please setup the clock.";
    }
    else if (tl.progress() == 1) {
       OBSERV.innerHTML = "Please Restart the simulation";
    }
}
tl.add(toggleDotVisible, 0);

tl.add(clockDotVisible, 0);

tl.add(clockDotDisappear, 10);

tl.add(toggleDotDisappear, 10);

tl.add(outputVisible, 12);
tl.add(outputHandler, 10);

tl.add(outputSetter, 12);
tl.eventCallback("onComplete", outputVisible);
tl.eventCallback("onComplete", batado);


tl.to(toggleDot1, {
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
tl.to(clockDot, {
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
tl.to(toggleDot2, {
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



tl.pause();

toggleDotDisappear();

clockDotDisappear();
