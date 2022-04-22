// **Consegna**
// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.

// **Consigli del giorno:**
// **** Creiamo prima una griglia unica (es con 100 quadratini) per  poi dinamicizzare il dato con classi css dedicate
// **** Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
// Ad esempio:
// Di cosa ho bisogno per generare i numeri?
// Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
// Le validazioni e i controlli possiamo farli anche in un secondo momento.



// Una volta scelta la difficoltà, qualora si voglia modificarla occorre:
// Svuotare array dei numeri già usciti
// Svuotare il div che contiene i quadrati


const containerGame = document.querySelector('.container_game_grid');
let listNumbers = [];
let played = false;

console.log(document.querySelector('#game_difficult').value);

document.querySelector("#start_game").addEventListener("click", function(){

  if(!played){
    document.querySelector("h2").classList.add("hide")
    init(document.querySelector('#game_difficult').value);
    played = true;

  } else {
    listNumbers = [];
    clearBox(containerGame);
    console.log(listNumbers);
    init(document.querySelector('#game_difficult').value);
  }
});


function init(numberElement){
  const gridLevels = [100,81,49]
  for(let i = 0; i < gridLevels[numberElement]; i++){
    const square = createSquare(containerGame,gridLevels[numberElement],i);
    square.addEventListener('click', function(){
      this.classList.add('clicked');
      if(this.classList.contains("flower")){
        let mySound = new Audio('audio/flower.mp3')
        mySound.play()
      } else {
        let mySound = new Audio('audio/bomb.mp3')
        mySound.play()
      }
      })
  }
}

/**
 * Genera l'elemento HTML e lo restituisce
 * @param {HTMLDivElement} target 
 * @returns 
 */
function createSquare(target,dimension,externalNumber){
  const newSquare = document.createElement('div');

  newSquare.className = 'square'+dimension;
  const number = getUniqueRandomNumber(1,dimension);

  newSquare.innerHTML = `<span class="square_number">${externalNumber+1}</span>`;
  //newSquare.innerHTML += `<span class="secret_number">${number}</span>`;
  newSquare.classList.add(getFlowerBomb(number));

  if(getFlowerBomb(number)=== "flower"){
    newSquare.innerHTML += `<img src="img/flower.png" alt=""></img>`
  } else {
    newSquare.innerHTML += `<img src="img/bomb.png" alt=""></img>`

  }

  target.append(newSquare);

  return newSquare;
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

function getFlowerBomb(n){
    if(n % 2) return 'bomb';
    return 'flower';
}

function clearBox(element) { 
  console.log(element);
  element.innerHTML = ""; 
} 