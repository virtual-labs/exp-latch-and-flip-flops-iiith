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

"use strict";
const svg = document.querySelector(".svg");
const inputpath1 = document.querySelector("#inputpath1");
const svgns = "http://www.w3.org/2000/svg";
gsap.registerPlugin(MotionPathPlugin);


let textSet = document.createElementNS(svgns, "text");
let textReset = document.createElementNS(svgns, "text");
let textClock = document.createElementNS(svgns, "text");
let textOutput1 = document.createElementNS(svgns, "text");
let textOutput2 = document.createElementNS(svgns, "text");
textOutput1.textContent = 0;
textOutput2.textContent = 1;// THIS IS IN THE RESET STATE
textSet.textContent = 2;
textReset.textContent = 2;
textClock.textContent = 2;
gsap.set(textOutput1, {
    x: 946,
    y: 234
});
gsap.set(textOutput2, {
    x: 946,
    y: 494
});
svg.appendChild(textSet);
svg.appendChild(textReset);
svg.appendChild(textClock);
svg.appendChild(textOutput1);
svg.appendChild(textOutput2);
const SET = document.getElementById("SET");
const RESET = document.getElementById("RESET");
const CLOCK = document.getElementById("CLOCK");
const OUTPUT1 = document.getElementById("OUTPUTQ1");
const OUTPUT2 = document.getElementById("OUTPUTQ2");
const BUTTON = document.getElementById("play/pause");
const OBSERV = document.getElementById("Observations");


let setDot = document.createElementNS(svgns, "circle");
gsap.set(setDot, {
    attr: { cx: 20, cy: 20, r: 15, fill: "#FF0000" }
});
let clockDot1 = document.createElementNS(svgns, "circle");
gsap.set(clockDot1, {
    attr: { cx: 20, cy: 360, r: 15, fill: "#FF0000" }
});
let clockDot2 = document.createElementNS(svgns, "circle");
gsap.set(clockDot2, {
    attr: { cx: 20, cy: 360, r: 15, fill: "#FF0000" }
});
let resetDot = document.createElementNS(svgns, "circle");
gsap.set(resetDot, {
    attr: { cx: 20, cy: 700, r: 15, fill: "#FF0000" }
});
svg.appendChild(setDot);
svg.appendChild(clockDot1);
svg.appendChild(clockDot2);
svg.appendChild(resetDot);

function myFunction() {
    OBSERV.innerHTML = "Initially the flip flop is in the reset state"
}
function setDotDisappear() {
    TweenLite.to(setDot, 0, { autoAlpha: 0 });
}
function resetDotDisappear() {
    TweenLite.to(resetDot, 0, { autoAlpha: 0 });
}
function clockDotDisappear() {
    TweenLite.to(clockDot1, 0, { autoAlpha: 0 });
    TweenLite.to(clockDot2, 0, { autoAlpha: 0 });
}
function setDotVisible() {
    TweenLite.to(setDot, 0, { autoAlpha: 1 });
}
function resetDotVisible() {
    TweenLite.to(resetDot, 0, { autoAlpha: 1 });
}
function clockDotVisible() {
    TweenLite.to(clockDot1, 0, { autoAlpha: 1 });
    TweenLite.to(clockDot2, 0, { autoAlpha: 1 });
}
function outputDisappear() {
    TweenLite.to(textOutput1, 0, { autoAlpha: 0 });
    TweenLite.to(textOutput2, 0, { autoAlpha: 0 });
}
function outputVisible() {
    TweenLite.to(textOutput1, 0, { autoAlpha: 1 });
    TweenLite.to(textOutput2, 0, { autoAlpha: 1 });
}
function setDisappear() {
    TweenLite.to(textSet, 0, { autoAlpha: 0 });
}
function clockDisappear() {
    TweenLite.to(textClock, 0, { autoAlpha: 0 });
}
function free() {
    OBSERV.innerHTML = "";
}
function setVisible() {
    TweenLite.to(textSet, 0, { autoAlpha: 1 });
}
function clockVisible() {
    TweenLite.to(textClock, 0, { autoAlpha: 1 });
}

function resetDisappear() {
    TweenLite.to(textReset, 0, { autoAlpha: 0 });
}
function resetVisible() {
    TweenLite.to(textReset, 0, { autoAlpha: 1 });
}
function nand1() {
    if (textSet.textContent == 0 && textClock.textContent == 1) {
        setter(1, setDot);
    }
    else if (textSet.textContent == 1 && textClock.textContent == 1) {
        setter(0, setDot);
    }
}
function nand2() {
    if (textReset.textContent == 0 && textClock.textContent == 1) {
        setter(1, resetDot);
    }
    else if (textReset.textContent == 1 && textClock.textContent == 1) {

        setter(0, resetDot);
    }

}
function allDisappear() {
    setDisappear();
    setDotDisappear();
    resetDisappear();
    resetDotDisappear();
    clockDisappear();
    clockDotDisappear();
    outputDisappear();
    gsap.set(SET, {

        fill: "#008000"
    });
    gsap.set(RESET, {

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
    if (textSet.textContent == 1 && textReset.textContent == 0) {
        textOutput1.textContent = 1;
        textOutput2.textContent = 0;
    }
    else if (textSet.textContent == 0 && textReset.textContent == 1) {
        textOutput1.textContent = 0;
        textOutput2.textContent = 1;
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
function appendSet() {
    if (textSet.textContent != 0 && tl.progress()==0) {
        setDisappear();
        textSet.textContent = 0;
        svg.appendChild(textSet);
        gsap.set(textSet, {
            x: 16,
            y: 24
        });
        gsap.set(SET, {

            fill: "#eeeb22"
        });
        free();
        setVisible();
        errno();
        setter(textSet.textContent, setDot);
        OBSERV.innerHTML = "Set bit is equal to 0";
    }
    else if (textSet.textContent != 1 && tl.progress()==0) {
        appendSetTo1();
    }


    // set(SET);

}
function appendClock() {
    if (textClock.textContent != 0 && tl.progress()==0) {
        clockDisappear();
        textClock.textContent = 0;
        svg.appendChild(textClock);
        gsap.set(textClock, {
            x: 16,
            y: 364
        });
        gsap.set(CLOCK, {

            fill: "#eeeb22"
        });
        free();
        clockVisible();
        setter(textClock.textContent, clockDot1);
        setter(textClock.textContent, clockDot2);
        errno();
        OBSERV.innerHTML = "";
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
        y: 364
    });
    gsap.set(CLOCK, {

        fill: "#29e"
    });
    free();
    clockVisible();
    setter(textClock.textContent, clockDot1);
    setter(textClock.textContent, clockDot2);
    errno();
    OBSERV.innerHTML = "Clocked is turned ON";
}
function reboot() {
    textSet.textContent = 2;
    textReset.textContent = 2;
    textClock.textContent = 2;

}



function appendSetTo1() {
    setDisappear();
    textSet.textContent = 1;
    svg.appendChild(textSet);
    gsap.set(textSet, {
        x: 16,
        y: 24
    });
    gsap.set(SET, {

        fill: "#29e"
    });
    free();
    setVisible();
   
    setter(textSet.textContent, setDot);
    if (textReset.textContent != 1) {
        OBSERV.innerHTML = "Set bit is equal to 1";
    }
    errno();

}
function appendReset() {
    if (textReset.textContent != 0 && tl.progress()==0) {
        resetDisappear();
        textReset.textContent = 0;
        svg.appendChild(textReset);
        gsap.set(textReset, {
            x: 16,
            y: 704
        });
        gsap.set(RESET, {

            fill: "#eeeb22"
        });
        free();
        resetVisible();
        setter(textReset.textContent, resetDot);
        errno();
        OBSERV.innerHTML = "Reset bit is equal to 0";
    }
    else if (textReset.textContent != 1 && tl.progress()==0) {
        appendResetTo1();
    }
}
function appendResetTo1() {
    resetDisappear();
    textReset.textContent = 1;
    svg.appendChild(textReset);
    gsap.set(textReset, {
        x: 16,
        y: 704
    });
    gsap.set(RESET, {

        fill: "#29e"
    });
    free();
    resetVisible();
    setter(textReset.textContent, resetDot);
   
    if (textSet.textContent != 1) {
        OBSERV.innerHTML = "Reset bit is equal to 1";
    }
    errno();
}
function outputSetter() {
    setter(textOutput1.textContent, OUTPUT1);
    setter(textOutput2.textContent, OUTPUT2);
}

function errno() {
    if (textSet.textContent == 1 && textReset.textContent == 1) {
        OBSERV.innerHTML = "This case is forbidden";
        setDisappear();
        clockDisappear();
        reboot();
        allDisappear();

        resetDisappear();
        gsap.set(SET, {

            fill: "#008000"
        });
        gsap.set(RESET, {

            fill: "#008000"
        });
        gsap.set(CLOCK, {

            fill: "#008000"
        });

    }
}
function batado() {
    OBSERV.innerHTML = "Simulation has finished. Press Restart to start again"
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
    if (textClock.textContent == 1 && textSet.textContent != 2 && textReset.textContent != 2 && tl.progress() != 1 &&tl.progress()!=0) {
        tl.resume();
        tl.timeScale(4);
        OBSERV.innerHTML = "4x speed";
        decide=1;
        BUTTON.innerHTML = "Halt";
    }
}
function doubleSpeed() {
    if (textClock.textContent == 1 && textSet.textContent != 2 && textReset.textContent != 2 && tl.progress() != 1 &&tl.progress()!=0) {
        tl.resume();
        tl.timeScale(2);
        OBSERV.innerHTML = "2x speed";
        decide=1;
        BUTTON.innerHTML = "Halt";
    }
}
function setSpeed(speed) {
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
function restartCircuit() {
    tl.seek(0);
    tl.pause();
    allDisappear();
    reboot();
    myFunction();
    OBSERV.innerHTML="Successfully Restored";
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
var decide = 0;
function button() {
    if (decide == 0) {
        startCircuit();

    }
    else if (decide == 1) {
        stopCircuit();

    }
}
function startCircuit() {

    if (textClock.textContent == 1 && textSet.textContent != 2 && textReset.textContent != 2 && tl.progress() != 1) {
        tl.play();
        tl.timeScale(1);
        OBSERV.innerHTML = "Simulation has started.";
        decide = 1;
        BUTTON.innerHTML = "Halt";
        SPEED.selectedIndex=0;
    }
    else if (textSet.textContent == 2 || textReset.textContent == 2 || textClock.textcontent == 2) {
        OBSERV.innerHTML = "Please select the values";
    }
    else if (textClock.textContent == 0) {
        OBSERV.innerHTML = "Please setup the clock.";
    }
    else if (tl.progress() == 1) {
        OBSERV.innerHTML = "Please Restart the simulation";
;    }

}
tl.add(setDotVisible, 0);
tl.add(resetDotVisible, 0);
tl.add(clockDotVisible, 0);
tl.add(clockDotDisappear, 10);
tl.add(nand1, 10);
tl.add(nand2, 10);
tl.add(setDotDisappear, 20);
tl.add(resetDotDisappear, 20);
tl.add(outputVisible, 22);
tl.add(outputHandler, 20);

tl.add(outputSetter, 22);
tl.eventCallback("onComplete", outputVisible);
tl.eventCallback("onComplete", batado);

tl.to(setDot, {
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
tl.to(clockDot1, {
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
tl.to(clockDot2, {
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
tl.to(resetDot, {
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
tl.to(setDot, {
    motionPath: {
        path: "#path5",
        align: "#path5",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 10);
tl.to(resetDot, {
    motionPath: {
        path: "#path6",
        align: "#path6",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 10);
tl.pause();

setDotDisappear();
resetDotDisappear();
clockDotDisappear();



