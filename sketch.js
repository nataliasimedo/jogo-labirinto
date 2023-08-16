let grama
let anne
let livro
let obstaculo0
let obstaculo1
let tamanho = 64
let codigos = []
let anneX = 0
let anneY = 0
let restart
let up
let down
let left
let right

function setup() {
  createCanvas(tamanho * 9, tamanho * 9);
  grama = loadImage('grama.png')
  anne = loadImage('anne.png')
  livro = loadImage('livro.png')
  obstaculo0 = loadImage('obstaculo0.png')
  obstaculo1 = loadImage('obstaculo1.png')
  up = createButton('↑')
  up.position(tamanho, tamanho * 9 + 10)
  up.size(30, 30)
  up.mousePressed(moveUp)
  down = createButton('↓')
  down.position(tamanho, tamanho * 9 + 40)
  down.size(30, 30)
  down.mousePressed(moveDown)
  left = createButton('←')
  left.position(tamanho - 30, tamanho * 9 + 40)
  left.size(30, 30)
  left.mousePressed(moveLeft)
  right = createButton('→')
  right.position(tamanho + 30, tamanho * 9 + 40)
  right.size(30, 30)
  right.mousePressed(moveRight)
}

function draw() {
  background(0, 77, 26);
  for(let i = 0; i < 9; i++){
    for(let j = 0; j < 9; j++){
      image(grama, tamanho * i, tamanho * j, tamanho, tamanho)
    }
  }
  image(livro, tamanho * 8, tamanho * 8 + 5, tamanho, tamanho)
  image(anne, anneX * tamanho + 3, anneY * tamanho + 3, tamanho - 6, tamanho - 6)
  obstaculo(0, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8])
  obstaculo(0, 1, [1, 3, 4, 6])
  obstaculo(0, 2, [5, 7])
  obstaculo(0, 3, [5, 6, 7, 8])
  obstaculo(0, 4, [2, 3, 5, 6, 7])
  obstaculo(0, 5, [1, 2, 3, 6, 7])
  obstaculo(0, 6, [0, 1, 3, 7])
  obstaculo(0, 7, [4, 7, 8])
  obstaculo(0, 8, [1, 2, 3, 4, 5])
  obstaculo(0, 9, [0, 1, 2, 3, 4, 5, 6, 7])
  obstaculo(1, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8])
  obstaculo(1, 1, [2, 3, 4, 7])
  obstaculo(1, 2, [1, 2, 3, 6])
  obstaculo(1, 3, [0, 1, 2, 6, 7])
  obstaculo(1, 4, [2, 3, 4, 5])
  obstaculo(1, 5, [2, 4, 5, 6])
  obstaculo(1, 6, [1, 5, 6, 7, 8])
  obstaculo(1, 7, [6, 7])
  obstaculo(1, 8, [0, 1, 4, 8])
  obstaculo(1, 9, [0, 1, 2, 3, 4, 5, 6, 7])
  if(anneX === 8 && anneY === 8){
    fill(0, 77, 26)
    rect(tamanho * 2, tamanho * 3, tamanho * 5, tamanho * 2, 20)
    fill(255)
    textSize(45)
    text('Você ganhou!', 150, 270)
    restart = createButton('Reiniciar')
    restart.position(tamanho * 2, tamanho * 9 + 10)
    restart.size(tamanho * 2, 60)
    restart.mousePressed(reiniciar)
    noLoop()
  }
}

function moveUp(){
  if(! temObstaculo(1, anneX, anneY)){
    anneY -= 1
  }
}
function moveDown(){
  if(! temObstaculo(1, anneX, anneY +1)){
    anneY += 1
  }
}
function moveLeft(){
  if(! temObstaculo(0, anneX, anneY)){
    anneX -= 1
  }
}
function moveRight(){
  if(! temObstaculo(0, anneX + 1, anneY)){
    anneX += 1
  }
}

function obstaculo(tipo, numero, lista){
  if(tipo === 0){
    for(let posicao of lista){
      image(obstaculo0, numero * tamanho - 12, posicao * tamanho - 8, 24, tamanho + 16)
      codigos.push(tipo*100 + numero*10 + posicao)
    }
  } else if(tipo === 1){
    for(let posicao of lista){
      image(obstaculo1, posicao * tamanho, numero * tamanho - 12, tamanho, 24)
      codigos.push(tipo*100 + posicao*10 + numero)
    }
  }
}

function temObstaculo(tipo, x, y){
  if(codigos.includes(tipo*100 + x*10 + y)){
    return true
  } else{
    return false
  }
}

function keyPressed(){
  if(keyIsDown(LEFT_ARROW) && ! temObstaculo(0, anneX, anneY)){
     anneX -= 1
  }
  if(keyIsDown(RIGHT_ARROW) && ! temObstaculo(0, anneX + 1, anneY)){
    anneX += 1
  }
  if(keyIsDown(UP_ARROW) && ! temObstaculo(1, anneX, anneY)){
    anneY -= 1
  }
  if(keyIsDown(DOWN_ARROW) && ! temObstaculo(1, anneX, anneY + 1)){
    anneY += 1
  }
}

function reiniciar(){
  anneX = 0
  anneY = 0
  restart.remove()
  loop()
}