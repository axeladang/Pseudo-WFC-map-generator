
var id = document.getElementById.bind(document)
var cell = id("cell")
var size = id("size")
var e_tile = id("empty_tile")
var submit = id("submit")

var preset = [
  [
    [1,1,1],
    [1,3,1],
    [1,1,1]
  ],
  [
    [3,3,3],
    [3,1,3],
    [3,3,3]
  ],
  [
    [3,3,3],
    [3,6,3],
    [3,3,3]
  ],
  [
    [5,5]
  ],
  [
    [6,6,6],
    [6,5,6],
    [6,6,6]
  ],
  
  [
    [6,6,6,6],
    [6,4,4,6],
    [6,5,4,6],
  ],
  [
    [4,4],
    [4,5]
  ],
 
  [
    [8,8],
    [8,8]
  ],
  [
    [9,9],
    [9,9]
  ],
  [
    [10,10],
    [10,10]
  ],
  [
    [11,11],
    [11,11]
  ],
  [
    [1,1,1],
    [1,8,1],
    [1,1,1]
  ],
  [
    [1,1,1],
    [1,9,1],
    [1,1,1]
  ],
  [
    [1,1,1],
    [1,11,1],
    [1,1,1]
  ],
  [
    [3,3,3],
    [3,10,3],
    [3,3,3]
  ],
  [
    [3,7],
    [7,3]
  ],
  [
    [10,7],
    [7,10]
  ],
  [
    [7,2],
    [2,7]
  ],
  [
    [2,2],
    [2,2]
  ],
];
var sprite = [
  "ressource/t1.png",
  "ressource/t2.png",
  "ressource/t3.png",
  "ressource/t4.png",
  "ressource/t5.png",
  "ressource/t6.png",
  "ressource/t7.png",
  "ressource/t8.png",
  "ressource/t9.png",
  "ressource/t10.png",
  "ressource/t11.png"
]

let level;

function setup() {
  initializeLevel();
}

function initializeLevel() {
  level = new wfc(parseInt(cell.value), parseInt(size.value), preset, sprite, parseInt(e_tile.value));
  level.init();
  level.generate();
  createCanvas(level.cell * level.size, level.cell * level.size);
}

function reset() {
  level = new wfc(parseInt(cell.value), parseInt(size.value), preset, sprite, parseInt(e_tile.value));
  level.init();
  level.generate();
  resizeCanvas(level.cell * level.size, level.cell * level.size);
}

function draw() {
  clear();
  background("white");
  level.draw();
}

submit.onclick = (event) => {
  event.preventDefault(); // Prevent form submission if submit is in a form
  reset();
}