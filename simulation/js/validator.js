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





// Puts a circuit built from gates into the state Q = 1, Q' = 0, which is the state in which every task starts.
// The output bits are not enough: the gates that drive them hold the state of the latch, so they are set as well.
// With force = false only the gates that have no value yet are set (used when a simulation is started).
export function presetLatchState(q, qbar, force) {
    const apply = (outputBit, value) => {
        if (!outputBit || !outputBit.inputs || outputBit.inputs.length === 0) {
            return;
        }
        const source = outputBit.inputs[0][0];
        // flip-flop blocks are initialised by their own code
        if (source && source.constructor.name === "Gate" && !source.isInput && (force || source.output === null)) {
            source.setOutput(value);
        }
    };
    apply(q, true);
    apply(qbar, false);
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
    let head = `<thead id="table-head">
    <tr>
      <th colspan="3">Inputs</th>
      <th colspan="2">Expected Values</th>
      <th colspan="2">Observed Values</th>
    </tr>
    <tr>
      <th>R</th>
      <th>S</th>
      <th>Clk</th>
      <th>Q</th>
      <th>Q'</th>
      <th>Q</th>
      <th>Q'</th>
    </tr>
  </thead>`
  document.getElementById("table-head").innerHTML = head;

    let q = gates_list[outputQ];
    let qbar = gates_list[outputQbar];
    for(let key in gates_list)
    {
        if(!gates_list[key].isInput)
        {
            gates_list[key].setOutput(null);
        }
    }
    q.setOutput(true);
    qbar.setOutput(false);
    
    presetLatchState(q, qbar, true);
    // each list element consists of 5 values, R,S,Clk,Q,Qbar
    const evaluator = [[0, 0, 0, 1, 0], [0, 1, 0, 1, 0], [1, 0, 0, 1, 0], [1, 1, 0, 1, 0], [1, 0, 1, 0, 1], [0, 0, 1, 0, 1], [0, 1, 1, 1, 0]]
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
    let head = `<thead id="table-head">
              <tr>
                <th colspan="3">Inputs</th>
                <th colspan="2">Expected Values</th>
                <th colspan="2">Observed Values</th>
              </tr>
              <tr>
                <th>J</th>
                <th>K</th>
                <th>Clk</th>
                <th>Q</th>
                <th>Q'</th>
                <th>Q</th>
                <th>Q'</th>
              </tr>
            </thead>`
            document.getElementById("table-head").innerHTML = head;

    let q = gates_list[outputQ];
    let qbar = gates_list[outputQbar];
    for(let key in gates_list)
    {
        if(!gates_list[key].isInput)
        {
            gates_list[key].setOutput(null);
        }
    }
    q.setOutput(true);
    qbar.setOutput(false);
    presetLatchState(q, qbar, true);
    // each list element consists of j, k, the clock, Q and Q'.
    // The clock is either 0 (it stays low) or "1->0": a clock pulse, i.e. the clock goes high and then low again.
    // In a master-slave JK flip-flop the master latch takes over J and K while the clock is high and the slave latch
    // changes the output when the clock falls, so Q is read after the whole pulse.
    const evaluator = [[0, 0, 0, 1, 0], [0, 1, 0, 1, 0], [1, 0, 0, 1, 0], [1, 1, 0, 1, 0], [0, 1, "1&rarr;0", 0, 1], [0, 0, "1&rarr;0", 0, 1], [1, 0, "1&rarr;0", 1, 0], [1, 1, "1&rarr;0", 0, 1], [1, 1, "1&rarr;0", 1, 0]]

    let incorrectConnections = false;
    evaluator.every((element, index) => {
        j.setOutput(element[0] === 1);
        k.setOutput(element[1] === 1);
        const clockLevels = element[2] === 0 ? [false] : [true, false];
        for (const level of clockLevels) {
            clk.setOutput(level);
            if(!testSimulation(gates_list))
            {
                incorrectConnections=true;
                return false;
            }
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
    let    head = `<thead id="table-head">
    <tr>
      <th colspan="2">Inputs</th>
      <th colspan="2">Expected Values</th>
      <th colspan="2">Observed Values</th>
    </tr>
    <tr>
      <th>D</th>
      <th>Clk</th>
      <th>Q</th>
      <th>Q'</th>
      <th>Q</th>
      <th>Q'</th>
    </tr>
  </thead>` 
  document.getElementById("table-head").innerHTML = head;
  

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
    let head = `<thead id="table-head">
              <tr>
                <th colspan="2">Inputs</th>
                <th colspan="2">Expected Values</th>
                <th colspan="2">Observed Values</th>
              </tr>
              <tr>
                <th>T</th>
                <th>Clk</th>
                <th>Q</th>
                <th>Q'</th>
                <th>Q</th>
                <th>Q'</th>
              </tr>
            </thead>`
            document.getElementById("table-head").innerHTML = head;

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