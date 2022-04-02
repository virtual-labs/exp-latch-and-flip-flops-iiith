import { registerGate } from "./main.js";
import { setPosition } from "./layout.js";
import { gates, getResult } from './gate.js';
import { jsPlumbInstance } from "./main.js";

let flipFlops = {};

function clearFlipFlops() {

    for (let ffID in flipFlops) {
        delete flipFlops[ffID];
    }
    flipFlops = {};
}

class RSFlipFlop {
    constructor() {
        this.id = "FlipFlop-" + window.numComponents++;
        this.R = [];  // Takes 2 items in a list : Gate, Output endpoint of gate
        this.S = [];
        this.Clk = [];
        this.Q = null;
        this.Qbar = null;
        this.inputPoints = [];
        this.outputPoints = [];
        this.QIsConnected = false;
        this.QbarIsConnected = false;
        this.component = '<div class="drag-drop FlipFlop" id=' + this.id + '></div>';
    }
    registerComponent(workingArea, x = 0, y = 0) {
        const parent = document.getElementById(workingArea);
        parent.insertAdjacentHTML('beforeend', this.component);
        document.getElementById(this.id).style.left = x + "px";
        document.getElementById(this.id).style.top = y + "px";

        const el = document.getElementById(this.id);
        el.addEventListener('contextmenu', function (ev) {
            ev.preventDefault();
            let left = ev.pageX - document.getScroll()[0];
            let top = ev.pageY - document.getScroll()[1];
            const origin = {
                left: left,
                top: top
            };
            setPosition(origin);
            window.selectedComponent = this.id;
            window.componentType = "flipFlop";
            // deleteElement(this.id);
            return false;
        }, false);

        flipFlops[this.id] = this;
        registerGate(this.id, this);
    }

    setR(R) {
        this.R = R;
    }
    setS(S) {
        this.S = S;
    }
    setClk(Clk) {
        this.Clk = Clk;
    }
    setQ(Q) {
        this.Q = Q;
    }
    setQbar(Qbar) {
        this.Qbar = Qbar;
    }
    addInputPoints(input) {
        this.inputPoints.push(input);
    }

    addOutputPoints(output) {
        this.outputPoints.push(output);
    }

    setConnected(val, pos) {
        console.log(val, pos);
        if (pos == "Q") {
            this.QIsConnected = val;
        }
        else if (pos == "Q'") {
            this.QbarIsConnected = val;
        }
    }

    generateOutput() {
        const R = getOutputRS(this.R[0], this.R[1]);
        const S = getOutputRS(this.S[0], this.S[1]);
        const Clk = getOutputRS(this.Clk[0], this.Clk[1]);

        if (Clk == false) {
            return;
        }
        else {
            if (S == false && R == false) {
                return;
            }
            else if (S == false && R == true) {
                this.Q = false;
                this.Qbar = true;
            }
            else if (S == true && R == false) {
                this.Q = true;
                this.Qbar = false;
            }
            else if (S == true && R == true) {
                this.Q = true;
                this.Qbar = true;
            }
        }
    }
}

function addRSFlipFlop(x, y) {
    const ff = new RSFlipFlop();
    ff.registerComponent("working-area", x, y);
}

window.addRSFlipFlop = addRS;

function getOutputRS(gate, pos) {
    if (pos == "Q") {
        return gate.Q;
    }
    else if (pos == "Q'") {
        return gate.Qbar;
    }
    // But if the gate is not an FA, but an input bit, then return the value of the input
    else {
        return gate.output
    }
}

function getResultRS(ff) {
    // check if fa type is Gate object
    if (ff.constructor.name == "Gate") {
        let gate = ff;
        if (gate.output != null) {
            return;
        }
        for (let i = 0; i < gate.inputs.length; i++) {
            if (gate.inputs[i].output == null) {
                getResult(gate.inputs[i]);
            }
        }
        gate.generateOutput();
    }

    if (ff.Q != null && ff.Qbar != null) {
        return;
    }

    if (getOutputRS(ff.R[0], ff.R[1]) == null) {
        getResultRS(ff.R[0]);
    }
    if (getOutputRS(ff.S[0], ff.S[1]) == null) {
        getResultRS(ff.S[0]);
    }
    if (getOutputRS(ff.Clk[0], ff.Clk[1]) == null) {
        getResultRS(ff.Clk[0]);
    }

    ff.generateOutput();

    return;
}

function checkConnectionsRS() {
    let flag = 0;
    for (let ffID in flipFlops) {
        const gate = flipFlops[ffID];
        // For Full Adder objects
        // Check if all the outputs are connected
        if (gate.QIsConnected == false) {
            flag = 1;
            break;
        }
        if (gate.QbarIsConnected == false) {
            flag = 1;
            break;
        }
        // Check if all the inputs are connected
        if (gate.R == null || gate.R.length == 0) {
            flag = 1;
            break;
        }
        if (gate.S == null || gate.S.length == 0) {
            flag = 1;
            break;
        }
        if (gate.Clk == null || gate.Clk.length == 0) {
            flag = 1;
            break;
        }
    }
    for (let gateId in gates) {
        const gate = gates[gateId];
        if (gate.isInput == true) {
            if (gate.isConnected == false) {
                flag = 1;
                break;
            }
        }
        else if (gate.isOutput == true) {
            if (gate.inputs.length == 0) {
                flag = 1;
                break;
            }
        }
        else {
            if (gate.inputPoints.length != gate.inputs.length) {
                flag = 1;
            }
            else if (gate.isConnected == false && gate.isOutput == false) {
                flag = 1;
            }
        }
    }



    if (flag == 0) {
        return true;
    }
    else {
        alert("Connections are not correct");
        return false;
    }
}

