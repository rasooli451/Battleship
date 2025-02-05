

import gameboard from "./gameboard";




//Overall plan: ON Load, both board objects should be made, in case of the user's board, it should be fully rendered with ships and everything visible, and on the left side of user's board, should be an overview of all the boards the user has and on the right side of computer's board, there should be the same thing. these will help players know how many ships are left and what are their lengths. This is related to user interface so it should be implemented in this module, a method that populates the boards, make divs for each rectangle, if it's a ship, we pass a classname for it so we can style it using css. if it's not, we just pass a generic name. also we add event listener for each div that we make, if we can find a way to store div's coordinates somehow as a classname or something that could be used in event listener, that would also be great. 
// Start of the game: a button that starts the game, another button that goes through different placements if the user didn't like their board, These two should be implemented in index.js, once the player clicks start, then they can't change placements. Then in index.js, we use a variable to alternate turns between ai and user. 

export {populateBoard, updateOverview, clear};

import UserCoordinate from "./index";

import { pairExists } from "./enemyAi";




function populateBoard(Gameboard, div){
    let board = Gameboard.board;
    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board[i].length; j++){
            let cell = document.createElement("div");
            if (board[i][j] === 1){
                cell.classList.add("ship");
            }
            cell.classList.add("cell");
            cell.setAttribute("coord", i + "," + j);
            div.appendChild(cell);
            if (div.parentElement.classList.contains("computer")){
                cell.addEventListener("click", ()=>{
                    Clicked(cell, Gameboard);
                })
        }
    }
    }
}



function updateOverview(Gameboard, div){
    let ships = Gameboard.ships;
    if (div.children.length > 0){
        for (let i = 0; i < ships.length; i ++){
            if (ships[i].isSunk()){
                div.children[i].classList.add("destroyed");
            }
        }
    }
    else{
        for (let i = 0; i < ships.length; i ++){
            let shipdiv = document.createElement("div");
            shipdiv.classList.add("shipdiv");
            div.appendChild(shipdiv);
            for (let j = 0; j < ships[i].length; j++){
                let shippartdiv = document.createElement("div");
                shippartdiv.classList.add("shipPart");
                shipdiv.appendChild(shippartdiv);
            }
        }
    }
}





function Clicked(cell, Gameboard){
    let coordstring = cell.getAttribute("coord");
    let x = Number(coordstring.charAt(0));
    let y = Number(coordstring.charAt(2));
    if (!pairExists(x,y,Gameboard.hits) && !pairExists(x,y,Gameboard.missed)){
        UserCoordinate(x, y, Gameboard, cell);
    }
}




function clear(div){
    div.innerHTML = "";
}