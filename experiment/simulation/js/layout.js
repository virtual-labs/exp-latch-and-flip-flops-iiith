import { simulateFA, deleteFA } from "./fa.js";
import { simulate, deleteElement } from "./gate.js";
import { bindEvent1, bindEvent2, unbindEvent, initRSFlipFlop, initFullAdder, initRippleAdder, refreshWorkingArea } from "./main.js";

// Wires
export const wireColours = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ff8000", "#00ff80", "#80ff00", "#ff0080", "#8080ff", "#c0c0c0"];

// Contextmenu
const menu = document.querySelector(".menu");
const menuOption = document.querySelector(".menu-option");
let menuVisible = false;

const toggleMenu = command => {
  menu.style.display = command === "show" ? "block" : "none";
  menuVisible = !menuVisible;
};

export const setPosition = ({ top, left }) => {
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  toggleMenu("show");
};

window.addEventListener("click", e => {
  if (menuVisible) toggleMenu("hide");
  window.selectedComponent = null;
  window.componentType = null;
});

menuOption.addEventListener("click", e => {
  if (e.target.innerHTML == "Delete") {
    if (window.componentType == "gate") {
      deleteElement(window.selectedComponent);
    }
    else if (window.componentType == "fullAdder") {
      deleteFA(window.selectedComponent);
    }
  }
  window.selectedComponent = null;
  window.componentType = null;
});

// Tabs

function changeTabs(e) {
  const task = e.target.parentNode.id;
  if (window.currentTab == task) {
    return;
  }

  if (window.currentTab != null) {
    document.getElementById(window.currentTab).classList.remove("is-active");
  }
  window.currentTab = task;
  document.getElementById(task).classList.add("is-active");

  // Half adder
  if (task == "Task1") {
    unbindEvent();
    bindEvent1();
    refreshWorkingArea();
    initRSFlipFlop();
    window.simulate = simulate
  }
  else if (task == "Task2") {
    unbindEvent();
    bindEvent1();
    refreshWorkingArea();
    initFullAdder();
    window.simulate = simulate
  }
  else if (task == "Task3") {
    unbindEvent();
    bindEvent2();
    refreshWorkingArea();
    initRippleAdder();
    window.simulate = simulateFA;
  }
  updateInstructions();
  updateToolbar();
  clearObservations();

}

window.changeTabs = changeTabs;

function updateInstructions() {
  if (window.currentTab == "Task1") {
    document.getElementById("TaskTitle").innerHTML = "RS Flip-Flop";
    document.getElementById("TaskDescription").innerHTML = 'Implement an RS Flip-Flop'
  }
  else if (window.currentTab == "Task2") {
    document.getElementById("TaskTitle").innerHTML = "Full Adder";
    document.getElementById("TaskDescription").innerHTML = 'Implement a 1-bit full adder using logic gates.'
  }
  else if (window.currentTab == "Task3") {
    document.getElementById("TaskTitle").innerHTML = "Ripple Adder";
    document.getElementById("TaskDescription").innerHTML = 'Implement a 4-bit ripple carry adder using 4 full adders.';

  }
}

// Toolbar

function updateToolbar() {
  let elem = "";
  if (window.currentTab == "Task1") {
    elem = '<div class="column is-one-half"><div class="component-button AND" onclick="Add(event)">AND</div><div class="component-button OR" onclick="Add(event)">OR</div><div class="component-button NOT" onclick="Add(event)">NOT</div><div class="component-button NAND" onclick="Add(event)">NAND</div></div><div class="column is-one-half"><div class="component-button NOR" onclick="Add(event)">NOR</div><div class="component-button XOR" onclick="Add(event)">XOR</div><div class="component-button XNOR" onclick="Add(event)">XNOR</div><div class="component-button CLOCK" id="AddClock">CLOCK</div></div>'
  }
  else if (window.currentTab == "Task2") {
    elem = '<div class="column is-one-half"><div class="component-button AND" onclick="Add(event)">AND</div><div class="component-button OR" onclick="Add(event)">OR</div><div class="component-button NOT" onclick="Add(event)">NOT</div><div class="component-button NAND" onclick="Add(event)">NAND</div></div><div class="column is-one-half"><div class="component-button NOR" onclick="Add(event)">NOR</div><div class="component-button XOR" onclick="Add(event)">XOR</div><div class="component-button XNOR" onclick="Add(event)">XNOR</div></div>'
  }
  else if (window.currentTab == "Task3") {
    elem = '<div class="column is-one-half"><div class="component-button FullAdder" onclick="AddFA(event)"></div></div><div class="column is-one-half"></div>'
  }

  document.getElementById("toolbar").innerHTML = elem;
}

// Clear observations
function clearObservations() {

  document.getElementById("table-body").innerHTML = "";
  let head = ''

  if (window.currentTab == "Task1") {
    head = '<tr><th colspan="2">Inputs</th><th colspan="2">Expected Values</th><th colspan="2">Observed Values</th></tr><tr><th>A</th><th>B</th><th>Sum</th><th>Carry</th><th>Sum</th><th>Carry</th></tr>'
  }
  else if (window.currentTab == "Task2") {
    head = '<tr><th colspan="3">Inputs</th><th colspan="2">Expected Values</th><th colspan="2">Observed Values</th></tr><tr><th>A</th><th>B</th><th>Cin</th><th>Sum</th><th>Carry</th><th>Sum</th><th>Carry</th></tr>'
  }
  else if (window.currentTab == "Task3") {
    head = ''
  }

  document.getElementById("table-head").innerHTML = head;
  document.getElementById('result').innerHTML = "";

}

// Modal

const modal = document.querySelector(".modal");
const trigger = document.getElementById("AddClock")
const closeButton = document.querySelector(".close-button");

export function toggleModal() {
  modal.classList.toggle("show-modal");
  document.getElementById('frequency-input').value = ""
  document.getElementById('dutycycle-input').value = ""
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);


// Simulation

const simButton = document.getElementById("simulate-button");
function toggleSimulation() {
    if (window.simulate == 0) {
    window.simulate = 1;
    simButton.innerHTML = "Simulate";
  }
  else {
    window.simulate = 0;
    simButton.innerHTML = "Stop";
    window.sim();
  }
}

simButton.addEventListener("click", toggleSimulation);