const gameContainer = document.getElementById("game");
let scoreCard = document.querySelector("#score");
let winner = document.querySelector(".winner");
let reset = document.querySelector("#reset");
let hScore = document.querySelector("#hScore");
let start = document.querySelector('#start');
let mainDiv = document.querySelector('#mainDiv');

var count = 0;
var dataZero = "";
var dataOne = "";
var prevDiv;
var latestScore = 0;
var finalScore = 0;
var match = 50;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let i=0; i < colorArray.length ; i++) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(colorArray[i]);
    newDiv.id = i;

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
    // you can use event.target to see which element was clicked
    if (count == 0 && match != event.target.id){
      console.log("you just clicked", event.target.classList.value);
      event.target.style.backgroundColor = event.target.classList.value;
      dataZero= event.target.classList.value;
      prevDiv = event.target;
      count = 1;
      console.log(count);
      latestScore++;
      scoreCard.textContent = latestScore;
    }
    else if(count == 1 && match != event.target.id)
    {
      count = 2;
      console.log("you just clicked", event.target.classList.value);
      event.target.style.backgroundColor = event.target.classList.value;
      dataOne= event.target.classList.value;
      setTimeout(function(){
        if(dataOne == dataZero)
        {
          count = 0;
          latestScore++;
          scoreCard.textContent = latestScore;
          finalScore++;
          if (finalScore == 6)
          {
            winner.textContent = "Winner!! Your score is: " + latestScore ;
            if (localStorage.getItem('highscore') !== null)
            {
              if( localStorage.getItem('highscore') > latestScore )
              {
                hScore.textContent = latestScore;
                localStorage.setItem('highscore', latestScore);
              }
            }
            else
            {
                hScore.textContent = latestScore;
                localStorage.setItem('highscore', latestScore);
                
            }
          }
        }
        else
        {
          event.target.style.backgroundColor = "";
          prevDiv.style.backgroundColor = "";
          count = 0;
          latestScore++;
          scoreCard.textContent = latestScore;
        }
        match =50;

      },1000)
    
      
    }
    match = event.target.id;
}

start.addEventListener('click', function(e){
e.preventDefault();
mainDiv.style.display = "";
e.target.remove();
});


hScore.textContent = localStorage.getItem('highscore') ;

reset.addEventListener('click', function(e){
  e.preventDefault();
  window.location.reload();
});

// when the DOM loads
createDivsForColors(shuffledColors);
