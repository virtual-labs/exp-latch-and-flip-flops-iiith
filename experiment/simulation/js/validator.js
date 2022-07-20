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
    let dataTable = ""


    let q = gates_list[outputQ];
    let qbar = gates_list[outputQbar];
    q.setOutput(true);
    qbar.setOutput(false);

    // each list element consists of 5 values, R,S,Clk,Q,Qbar
    const evaluator = [[0, 0, 0, 1, 0], [0, 1, 0, 1, 0], [1, 0, 0, 1, 0], [1, 1, 0, 1, 0], [0, 1, 1, 0, 1], [0, 0, 1, 0, 1], [1, 0, 1, 1, 0]]
    let incorrectConnections = false;
    evaluator.every((element, index) => {
        r.setOutput(element[0] === 1);
        s.setOutput(element[1] === 1);
        clk.setOutput(element[2] === 1);
        if(!testSimulation(gates_list))
        {
            incorrectConnections=true;
            return false;
        }
        // check if output is correct
        let className = "success-table";
        let observedQ = q.output ? 1 : 0;
        let observedQbar = qbar.output ? 1 : 0;
        if ((q.output != element[3] || qbar.output != element[4])) {
            circuitIsCorrect = false;
            className = "failure-table";
        }
        dataTable += `<tr class="bold-table"><th>${element[0]}</th><th>${element[1]}</th><th>${element[2]} </th><td> ${element[3]} </td><td> ${element[4]} </td><td class="${className}"> ${observedQ} </td><td class="${className}"> ${observedQbar}</td></tr>`;
        return true;
    });
    if(incorrectConnections)
    {
        return;
    }
    const table_elem = document.getElementById("table-body");
    table_elem.insertAdjacentHTML("beforeend", dataTable);
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
    let dataTable = "";


    let q = gates_list[outputQ];
    let qbar = gates_list[outputQbar];
    q.setOutput(true);
    qbar.setOutput(false);
    // each list element consists of 5 values, j,k,Clk,Q,Qbar
    const evaluator = [[0, 0, 0, 1, 0], [0, 1, 0, 1, 0], [1, 0, 0, 1, 0], [1, 1, 0, 1, 0], [0, 1, 1, 0, 1], [0, 0, 1, 0, 1], [1, 0, 1, 1, 0], [1, 1, 1, 0, 1], [1, 1, 1, 1, 0]]

    let incorrectConnections = false;
    evaluator.every((element, index) => {
        j.setOutput(element[0] === 1);
        k.setOutput(element[1] === 1);
        clk.setOutput(element[2] === 1);
        if(!testSimulation(gates_list))
        {
            incorrectConnections=true;
            return false;
        }
        // check if output is correct
        let className = "success-table";
        let observedQ = q.output ? 1 : 0;
        let observedQbar = qbar.output ? 1 : 0;
        if ((q.output != element[3] || qbar.output != element[4])) {
            circuitIsCorrect = false;
            className = "failure-table";
        }
        dataTable += `<tr class="bold-table"><th>${element[0]}</th><th>${element[1]}</th><th>${element[2]} </th><td> ${element[3]} </td><td> ${element[4]} </td><td class="${className}"> ${observedQ} </td><td class="${className}"> ${observedQbar}</td></tr>`;
        return true;
    });
    if(incorrectConnections)
    {
        return;
    }
    const table_elem = document.getElementById("table-body");
    table_elem.insertAdjacentHTML("beforeend", dataTable);
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
    let dataTable = "";


    let q = gates_list[outputQ];
    let qbar = gates_list[outputQbar];
    q.setOutput(true);
    qbar.setOutput(false);
    for(let key in flipflops_list)
    {
        flipflops_list[key].setQ(true);
        flipflops_list[key].setQbar(false);
    }
    // each list element consists of 4 values, D,Clk,Q,Qbar
    const evaluator = [[0, 0, 1, 0], [1, 0, 1, 0], [0, 1, 0, 1], [1, 1, 1, 0], [0, 0, 1, 0]]

    let incorrectConnections = false;
    evaluator.every((element, index) => {
        d.setOutput(element[0] === 1);
        clk.setOutput(element[1] === 1);
        if(!testSimulation(gates_list,flipflops_list))
        {
            incorrectConnections=true;
            return false;
        }
        // check if output is correct
        let className = "success-table";
        let observedQ = q.output ? 1 : 0;
        let observedQbar = qbar.output ? 1 : 0;
        if ((q.output != element[2] || qbar.output != element[3])) {
            circuitIsCorrect = false;
            className = "failure-table";
        }
        dataTable += `<tr class="bold-table"><th>${element[0]}</th><th>${element[1]}</th><td>${element[2]}</td><td> ${element[3]} </td><td class="${className}"> ${observedQ} </td><td class="${className}"> ${observedQbar}</td></tr>`;
        return true;
    });
    if(incorrectConnections)
    {
        return;
    }
    const table_elem = document.getElementById("table-body");
    table_elem.insertAdjacentHTML("beforeend", dataTable);
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
    let dataTable = "";


    let q = gates_list[outputQ];
    let qbar = gates_list[outputQbar];
    q.setOutput(true);
    qbar.setOutput(false);
    for(let key in flipflops_list)
    {
        flipflops_list[key].setQ(true);
        flipflops_list[key].setQbar(false);
    }
    // each list element consists of 4 values, T,Clk,Q,Qbar
    const evaluator = [[0, 0, 1, 0], [1, 0, 1, 0], [0, 1, 1, 0], [1, 1, 0, 1], [1, 1, 1, 0], [0, 1, 1, 0]]

    let incorrectConnections = false;
    evaluator.every((element, index) => {
        t.setOutput(element[0] === 1);
        clk.setOutput(element[1] === 1);
        if(!testSimulation(gates_list,flipflops_list))
        {
            incorrectConnections=true;
            return false;
        }
        // check if output is correct
        let className = "success-table";
        let observedQ = q.output ? 1 : 0;
        let observedQbar = qbar.output ? 1 : 0;
        if ((q.output != element[2] || qbar.output != element[3])) {
            circuitIsCorrect = false;
            className = "failure-table";
        }
        dataTable += `<tr class="bold-table"><th>${element[0]}</th><th>${element[1]}</th><td>${element[2]}</td><td> ${element[3]} </td><td class="${className}"> ${observedQ} </td><td class="${className}"> ${observedQbar}</td></tr>`;
        return true;
    });
    if(incorrectConnections)
    {
        return;
    }
    const table_elem = document.getElementById("table-body");
    table_elem.insertAdjacentHTML("beforeend", dataTable);
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