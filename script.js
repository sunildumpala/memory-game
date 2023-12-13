const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let selection1 = null;
let selection2 = null;
let selectionCount = 0;
let nomoreClicks = false;

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

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    //newDiv.removeEventListener("click", handleCardClick)

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target);
  //console.log(event.target.className);
  //console.log(event);
  
  
  //if no clicks allowed end here
  if(nomoreClicks) return;

  //if selection is already turned, end here
  if (event.target.classList.contains("turned")) return;


  // if none of the above then set the background color of the selection
  currentSelection = event.target;
  currentSelection.style.backgroundColor = event.target.className;


  // if at least one of the selections is still null

  if (!selection1 || !selection2){
    currentSelection.classList.add("turned");
    if (!selection1){
      selection1 = currentSelection;
    }
    else{
      selection2 = currentSelection;
    }

  }

  // if neither selection is null
  if (selection1 && selection2)
  {
    nomoreClicks = true;

    /*
    if selections match
      increment the selection count
      remove click event listeners on the selection
      reset selections
      reset nomoreClicks
    otherwise (if no match)
      reset background colors of both selections
      reset the classList
      reset selections
      reset nomoreClicks
    */

    if (selection1.className === selection2.className)
    { 
      selectionCount += 2;
      selection1.removeEventListener("click", handleCardClick);
      selection2.removeEventListener("click", handleCardClick);
      selection1 = null;
      selection2 = null;
      nomoreClicks = false;
    }else{
      setTimeout(function(){
        selection1.style.backgroundColor = "";
        selection2.style.backgroundColor = "";
        selection1.classList.remove("turned");
        selection2.classList.remove("turned");
        selection1 = null;
        selection2 = null;
        nomoreClicks = false;
      }, 1000);
    }
  }


  
}

// when the DOM loads
createDivsForColors(shuffledColors);
