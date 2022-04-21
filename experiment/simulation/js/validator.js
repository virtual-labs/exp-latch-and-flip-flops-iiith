import { gates, testSimulation } from './gate.js';
import {flipFlops} from './flipflop.js';

'use strict';

// Helper functions
export function computeXor(a, b) {
    return a != b;
}
export function computeAnd(a, b) {
    return a && b;
}
export function computeOr(a, b) {
    return a || b;
}
export function computeXnor(a, b) {
    return a == b;
}
export function computeNand(a, b) {
    return !(a && b);
}
export function computeNor(a, b) {
    return !(a || b);
}





// RS Flip FLop Tester
export function testRSFF(inputR, inputS, inputClk, outputQ, outputQbar)  // This function takes 4 ids of the respective Gates
{
    let gates_list = gates;

    let r = gates_list[inputR];
    let s = gates_list[inputS];
    let clk = gates_list[inputClk];
    let circuitIsCorrect = true;


    let q = gates_list[outputQ];
    let qbar = gates_list[outputQbar];
    q.setOutput(true);
    qbar.setOutput(false);

    // each list element consists of 5 values, R,S,Clk,Q,Qbar
    const evaluator = [[0, 0, 0, 1, 0], [0, 1, 0, 1, 0], [1, 0, 0, 1, 0], [1, 1, 0, 1, 0], [0, 1, 1, 0, 1], [0, 0, 1, 0, 1], [1, 0, 1, 1, 0]]

    evaluator.forEach(element => {
        r.setOutput(element[0] === 1);
        s.setOutput(element[1] === 1);
        clk.setOutput(element[2] === 1);
        testSimulation(gates_list);
        // check if output is correct
        if ((q.output != element[3] || qbar.output != element[4])) {
            circuitIsCorrect = false;
        }
    });

    const result = document.getElementById('result');

    if (circuitIsCorrect) {
        result.innerHTML = "<span>&#10003;</span> Success";
        result.className = "success-message";
    }
    else {
        result.innerHTML = "<span>&#10007;</span> Fail";
        result.className = "failure-message";
    }
}

// JK Flip FLop Tester
export function testJKFF(inputJ, inputK, inputClk, outputQ, outputQbar)  // This function takes 4 ids of the respective Gates
{
    let gates_list = gates;

    let j = gates_list[inputJ];
    let k = gates_list[inputK];
    let clk = gates_list[inputClk];
    let circuitIsCorrect = true;


    let q = gates_list[outputQ];
    let qbar = gates_list[outputQbar];
    q.setOutput(true);
    qbar.setOutput(false);
    // each list element consists of 5 values, j,k,Clk,Q,Qbar
    const evaluator = [[0, 0, 0, 1, 0], [0, 1, 0, 1, 0], [1, 0, 0, 1, 0], [1, 1, 0, 1, 0], [0, 1, 1, 0, 1], [0, 0, 1, 0, 1], [1, 0, 1, 1, 0], [1, 1, 1, 0, 1], [1, 1, 1, 1, 0]]

    evaluator.forEach(element => {
        j.setOutput(element[0] === 1);
        k.setOutput(element[1] === 1);
        clk.setOutput(element[2] === 1);
        testSimulation(gates_list);

        // check if output is correct
        if ((q.output != element[3] || qbar.output != element[4])) {
            circuitIsCorrect = false;
        }
    });

    const result = document.getElementById('result');

    if (circuitIsCorrect) {
        result.innerHTML = "<span>&#10003;</span> Success";
        result.className = "success-message";
    }
    else {
        result.innerHTML = "<span>&#10007;</span> Fail";
        result.className = "failure-message";
    }
}


// D Flip FLop Tester
export function testDFF(inputD, inputClk, outputQ, outputQbar)  // This function takes 4 ids of the respective Gates
{
    let gates_list = gates;
    let flipflops_list = flipFlops;

    let d = gates_list[inputD];
    let clk = gates_list[inputClk];
    let circuitIsCorrect = true;


    let q = gates_list[outputQ];
    let qbar = gates_list[outputQbar];
    q.setOutput(true);
    qbar.setOutput(false);
    // each list element consists of 4 values, D,Clk,Q,Qbar
    const evaluator = [[0, 0, 1, 0], [1, 0, 1, 0], [0, 1, 0, 1], [1, 1, 1, 0], [0, 0, 1, 0]]

    evaluator.forEach(element => {
        d.setOutput(element[0] === 1);
        clk.setOutput(element[1] === 1);
        testSimulation(gates_list,flipflops_list);

        // check if output is correct
        if ((q.output != element[2] || qbar.output != element[3])) {
            circuitIsCorrect = false;
        }
    });

    const result = document.getElementById('result');

    if (circuitIsCorrect) {
        result.innerHTML = "<span>&#10003;</span> Success";
        result.className = "success-message";
    }
    else {
        result.innerHTML = "<span>&#10007;</span> Fail";
        result.className = "failure-message";
    }
}



// T Flip FLop Tester
export function testTFF(inputT, inputClk, outputQ, outputQbar)  // This function takes 4 ids of the respective Gates
{
    let gates_list = gates;
    let flipflops_list = flipFlops;

    let t = gates_list[inputT];
    let clk = gates_list[inputClk];
    let circuitIsCorrect = true;


    let q = gates_list[outputQ];
    let qbar = gates_list[outputQbar];
    q.setOutput(true);
    qbar.setOutput(false);
    // each list element consists of 4 values, T,Clk,Q,Qbar
    const evaluator = [[0, 0, 1, 0], [1, 0, 1, 0], [0, 1, 1, 0], [1, 1, 0, 1], [1, 1, 1, 0], [0, 1, 1, 0]]

    evaluator.forEach(element => {
        t.setOutput(element[0] === 1);
        clk.setOutput(element[1] === 1);
        testSimulation(gates_list,flipflops_list);

        // check if output is correct
        if ((q.output != element[2] || qbar.output != element[3]) && circuitIsCorrect) {
            circuitIsCorrect = false;
            // console.log(element,q.output,qbar.output);
        }
    });

    const result = document.getElementById('result');

    if (circuitIsCorrect) {
        result.innerHTML = "<span>&#10003;</span> Success";
        result.className = "success-message";
    }
    else {
        result.innerHTML = "<span>&#10007;</span> Fail";
        result.className = "failure-message";
    }
}