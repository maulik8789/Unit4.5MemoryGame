const gameContainer = document.getElementById("game");

var prevData;
var memory = "";
var test = "";
var temp = "";
var boxColor = "";
var prevBoxColor = "";
var score = 0;
var getImg = 0;
var match = 1000;
clickCount = 0;
scoreCount = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "magenta",
  "black",
  "grey",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "magenta",
  "black",
  "grey"
  
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
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.id = getImg;
    newDiv.innerText = getImg;
    getImg++; 

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


// TODO: Implement this function!
function handleCardClick(event) {
  event.preventDefault();
  scoreCount++;
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target.classList.value);
  clickCount++;
  boxColor = event.target.classList.value
  event.target.style.backgroundColor = boxColor;
  
  if (boxColor === prevBoxColor && match != event.target.innerText)
  {
    score++;
    console.log(score);
    event.target.style.backgroundColor = boxColor;
    prevData.style.backgroundColor = boxColor;
    if(score == 8)
    {
      var win = document.createElement('h2');
      win.textContent = "YOU ARE THE WINNER!!" + "  SCORE =" + scoreCount;
      document.body.appendChild(win);

      var newGame = document.createElement('button');
      newGame.innerText = "New Game";
      newGame.addEventListener ('click', function(){
        location.reload();
      });
      document.body.appendChild(newGame);
    }
    clickCount = 0;
      
  }
  else
  {
    match = parseInt(event.target.innerText);
    prevBoxColor = event.target.style.backgroundColor;
    
    //console.log(clickCount);
    if (clickCount ==1)
    {
      prevData = event.target;
    }
    else
    {
      setTimeout(bgCheck, 1000);
        
      
      function bgCheck()
      {
        event.target.style.backgroundColor = "";
        prevData.style.backgroundColor = "";
        prevData = event.target;
      }
      clickCount = 0;
      console.log("clickCount =", clickCount)
    }
    
    console.log(prevData);
    
  }  
}


// when the DOM loads
createDivsForColors(shuffledColors);

