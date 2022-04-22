// Esercizio di oggi: **Campo Minato**
// nome repo: js-campominato-dom
// **Consegna**
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).
// ****L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// **BONUS:**
// 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// ****2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste

// **Consigli del giorno:**
// ****Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
// Ad esempio:
// Di cosa ho bisogno per generare i numeri?
// Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
// Le validazioni e i controlli possiamo farli anche in un secondo momento.

const containerGame = document.querySelector('.container_game_grid');
console.log(containerGame);

// Array che contiene i numeri già usciti
let listNumbers = [];
// Boleana che indica se una partita è già stata fatta o meno
let played = false;
// Numero massimo di bombe presenti
const BOMBS_NUMBER = 16;
// Array che contiene i cellNumber delle bombe
let bombs = [];

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

  bombs = generateBombs (cellNumbers);
  console.log ('bombs', bombs);

  for(let i = 0; i < cellNumbers; i++){
    const square = createSquare(containerGame,cellNumbers,i);
    console.log(square);
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

    this.innerHTML += `<img src="img/bomb.png" alt=""></img>`;
    this.classList.add('bomb');

  } else {
    let mySound = new Audio('audio/flower.mp3');
    mySound.play();
    this.innerHTML += `<img src="img/flower.png" alt=""></img>`;
    this.classList.add('flower');
  }
}

/**
 * Genera l'elemento HTML e lo restituisce
 * @param {HTMLDivElement} target 
 * @returns 
 */
function createSquare(target,dimension,cellId){
  const newSquare = document.createElement('div');

  newSquare.className = 'square'+dimension;
  const number = getUniqueRandomNumber(1,dimension);

  newSquare.innerHTML = `<span class="square_number">${cellId+1}</span>`;

  // creo la proprietà myNymber per andarla a leggere al click
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