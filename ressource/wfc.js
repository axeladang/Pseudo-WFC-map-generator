//pour les tableaux 2d
  //verifit si le tableau est completement vide
  function empty (array, space) {
    for (let y = 0; y < array.length; y++) {
        for (let x = 0; x < array[0].length; x++) {
            if (array[y][x] != space) {
                return false
            }
        }   
    }
    return true
  }

  //recupere la bordure ou le contour d'un solide
  function corner (array,space) {
    let mx
    let my
    var corner = []
    let cell_corner
    var sum = [
        [-1,0],//top
        [1,0],//bottom
        [0,1],//right
        [0,-1]//left
    ]
    //si le tableau est vide il donne par defaut son milieu
    if (empty(array,space)) {
        my = Math.floor(array.length/2)
        mx = Math.floor(array[0].length/2)
        return [[mx,my]]
    }else {
        for (let y = 0; y < array.length; y++) {
            for (let x = 0; x < array[y].length; x++) {
                if (array[y][x] == space) {
                    cell_corner = []
                    for (let c = 0; c < 4; c++) { 
                        if (array[y+sum[c][0]] != undefined ) {
                            if (array[y+sum[c][0]][x+sum[c][1]] != undefined) {
                                if (array[y+sum[c][0]][x+sum[c][1]] != space) {
                                    cell_corner.push([x+sum[c][1],y+sum[c][0],c])//x,y,coast
                                }   
                            }
                        }
                    }

                    if (cell_corner.length > 0) {
                        corner.push([x,y,cell_corner]) //x,y,itself corner
                    }
                }
            }
        }
        return corner
    }
  }

  //verifit si le tableau contient de l'espace
  function spaced(array,space) {
    for (let y = 0; y < array.length; y++) {
        for (let x = 0; x < array[0].length; x++) {
            if (array[y][x] == space) {
                return true
            }
        }   
    }
    return false
  }

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//outils pour la correspondance
function choose(array) {
  return array[getRandomInt(array.length)]
}

function common(arrays) {
  if (arrays.length === 0) return [];
  return arrays.reduce((prev, curr) => prev.filter(x => curr.includes(x)));
}

//"Wave Function Collapse" fait selon ma compréhension de l'algorithme (pas "l'algorithme" elle même)
class wfc {
  constructor(cell = 10,size = 10, presets = [], sprite = [], empty_tile = 1) {
    this.cell = cell
    this.size = size
    this.presets = presets
    this.array = []
    this.tile = []
    this.sprite = sprite
    this.tile_nb = this.sprite.length
    this.loaded_sprite = []
    this.empty_tile = empty_tile
  }

  init() {
    // Chargement des sprites
    for (let index = 0; index < this.sprite.length; index++) {
      this.loaded_sprite.push(loadImage(this.sprite[index]));
    }
  
    // Initialisation des tableaux
    for (let y = 0; y < this.cell; y++) {
      this.array.push(Array(this.cell).fill(0));
    }
  
    for (let n = 0; n < this.tile_nb; n++) {
      this.tile.push([[], [], [], []]);
    }
  
    // Analyse des presets
    for (const preset of this.presets) {
      for (let y = 0; y < preset.length; y++) {
        for (let x = 0; x < preset[y].length; x++) {
          const index = preset[y][x] - 1;
  
          // Vérification des voisins
          if (y > 0) this.addNeighbor(index, 0, preset[y - 1][x]);
          if (y < preset.length - 1) this.addNeighbor(index, 1, preset[y + 1][x]);
          if (x < preset[y].length - 1) this.addNeighbor(index, 2, preset[y][x + 1]);
          if (x > 0) this.addNeighbor(index, 3, preset[y][x - 1]);
        }
      }
    }
  }
  
  addNeighbor(index, direction, neighbor) {
    //ajoute si la tile n'est pas déjà repertoriée comme voisin
    if (!this.tile[index][direction].includes(neighbor)) {
      this.tile[index][direction].push(neighbor);
    }
  }

  generate() {
    while (spaced(this.array,0)) {
    if (empty(this.array, 0)) {
      this.array[ corner(this.array,0)[0][1]][ corner(this.array,0)[0][0]] = getRandomInt(this.tile_nb) + 1 
    }else{
        let corne
        for (let corn of corner(this.array,0)) {
          corne = []
          var top = 0
          var bottom = 0
          var right = 0
          var left = 0
          for (let icorn of corn[2]) {
            
            if (this.array[icorn[1]][icorn[0]] < 10) {
              if (icorn[2] == 0) {
                top = this.array[icorn[1]][icorn[0]]-1
                corne.push(this.tile[top][1])
              }else if (icorn[2] == 1) {
                bottom = this.array[icorn[1]][icorn[0]]-1
                corne.push(this.tile[bottom][0])
              }else if (icorn[2] == 2) {
                right = this.array[icorn[1]][icorn[0]]-1
                corne.push(this.tile[right][3])
              }else if (icorn[2] == 3) {
                left = this.array[icorn[1]][icorn[0]]-1
                corne.push(this.tile[left][2])
              }
            }
          }
          var possibilities = common(corne)
          if (possibilities.length > 0) {
            this.array[corn[1]][corn[0]] = choose(possibilities);
          } else {
            this.array[corn[1]][corn[0]] = this.empty_tile;
          }
          
        }
    }
    } 
    
    
  }

  draw() {
    //rendre la carte
    stroke("black")
    for (let y = 0; y < this.cell; y++) {
      for (let x = 0; x < this.cell; x++) {
        if (this.array[y][x] > 0) {
          var t = this.array[y][x]-1
          image(this.loaded_sprite[t], this.size*x, this.size*y,this.size, this.size)
        }
      }  
    }
  
  }
}
