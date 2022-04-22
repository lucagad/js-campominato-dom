// Esercizio di oggi: **Campo Minato**
// nome repo: js-campominato-dom


const containerGame = document.querySelector('.container_game_grid');
console.log(containerGame);

// Array che contiene i numeri già usciti
let listNumbers = [];

// Boleana che indica se una partita è già stata fatta o meno
let played = false;

// Boleana che indica se la partita è conclusa
let gameOver = false;

// Numero massimo di bombe presenti
const BOMBS_NUMBER = 16;

// Array che contiene i cellNumber delle bombe
let bombs = [];

// Contatore delle giocate
let clickNumber = 0;

// numero di celle
let numberOfCells = 0;


//console.log(document.querySelector('#game_difficult').value);
document.querySelector("#start_game").addEventListener("click",play);

// funzione scatenata dal click del tasto Play
function play(){
  if(!played){
    document.querySelector("h2").classList.add("hide")
    init();
    played = true;

  } else {
    listNumbers = [];
    reset(containerGame);
    console.log(listNumbers);
    init();
  }

}

// Funzione che inizializza il campo di gioco
function init(){
  const level = document.querySelector('#game_difficult').value;
  const gridLevels = [100,81,49];
  const cellNumbers = gridLevels[level];
  numberOfCells = gridLevels[level];

  bombs = generateBombs (cellNumbers);
  console.log ('bombs', bombs);

  for(let i = 0; i < cellNumbers; i++){
    const square = createSquare(containerGame,cellNumbers,i);
    //console.log(square);
    square.addEventListener('click', handleClickCell);
  }
}

// Funzione scatenata dal click della cella
function handleClickCell(){

  /*
  1."leggere" il numero della cella
  2. verificare se il numero è presente nell'array delle bombe
  3. se NO aggiungere la classe clicked
  4. se SI attivare la procedura di fine gioco :-)
  */
  
  this.classList.add('clicked');

  // if this.myNumber è contenuto nell'array
  if(bombs.includes(this.cellNumber)){
    let mySound = new Audio('audio/bomb.mp3');
    mySound.play();
    this.innerHTML = `<img class="bomb_icon" src="img/bomb.png" alt=""></img>`;
    this.classList.add('bomb');
    gameOver = true;
    endGame(gameOver);

  } else {
    let mySound = new Audio('audio/flower.mp3');
    mySound.play();
    this.innerHTML = `<img class="flower_icon" src="img/flower.png" alt=""></img>`;
    this.classList.add('flower');
    clickNumber ++;

    console.log('Numero Click',clickNumber);
    console.log('Numero Massimo di Click',numberOfCells-BOMBS_NUMBER);

    if(clickNumber === (numberOfCells-BOMBS_NUMBER)){
    endGame(gameOver);  
    }
  }

}

function endGame(gameOver){

  const resultBox = document.querySelector('.result');
  if (gameOver){
    // Mostro in pagina il risultato ottenuto
    resultBox.innerHTML = `<h4>Game Over! Hai fatto ${clickNumber} tentativi</h4>`;
    //Azzero la variabile che conteggia il numero di click
    clickNumber = 0;

  } else {
    // Mostro in pagina il risultato ottenuto
    resultBox.innerHTML = `<h4>Complimenti! Hai fatto ${clickNumber} tentativi ed hai vinto!</h4>`;
    clickNumber = 0;
  }
  
  
  // for (let i = 0; i < BOMBS_NUMBER; i++){
  //   const bombId = bombs[i];
  //   console.log(bombId);

  //   const SquareBomb = document.querySelector("[cellNumber='"+bombId+"']");
  //   console.log(SquareBomb);

  //   SquareBomb.innerHTML += `<img src="img/bomb.png" alt=""></img>`;
  //   SquareBomb.classList.add('bomb');

  // }

}

/**
 * Genera l'elemento HTML e lo restituisce
 * @param {HTMLDivElement} target 
 * @returns 
 */
function createSquare(target,dimension,cellId){
  const newSquare = document.createElement('div');

  newSquare.className = 'square'+dimension;

  newSquare.classList.add('d-flex','flex-column', 'justify-content-center', 'align-content-center');

  const number = getUniqueRandomNumber(1,dimension);

  newSquare.innerHTML = `<img src="https://yt3.ggpht.com/ytc/AKedOLTO2XVhtyMr24Dnz6QJ-Lsj_05XHim-qMoF6PRc=s900-c-k-c0x00ffffff-no-rj" alt="" height="15px" class="logo_card">`;

  newSquare.innerHTML += `<span class="square_number">${cellId+1}</span>`;
  // creo la proprietà cellNumber per andarla a leggere al click
  newSquare.cellNumber = cellId;

  target.append(newSquare);

  return newSquare;
}

function generateBombs (cellNumbers) {
  const generatedBombs = [];
  // effettuo il ciclo fino a quando la lunghezza de
  while (generatedBombs.length < BOMBS_NUMBER){
    const bomb = getRandomNumber(1,cellNumbers);
    console.log('bomb',bomb);

    if(!generatedBombs.includes(bomb)){
    generatedBombs.push(bomb);
    }
  }

  return generatedBombs;
}

function getUniqueRandomNumber(min, max){
  let number = null;
  let valid = false;

  while(!valid){
    number = getRandomNumber(min, max);

    if(!listNumbers.includes(number)){
      valid = true;
      listNumbers.push(number)
    }
  }
  return number;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function reset(element) { 
  element.innerHTML = ""; 
} 