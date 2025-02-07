




import gameboard from "./gameboard";


import {enemyAi} from "./enemyAi";

import "./style.css";

import { populateBoard, updateOverview, clear , x, y} from "./DOM";

import cannonShot from "./cannonShot.mp3";


import shipHit from "./shipHit.mp3";

export default UserCoordinate;


let playerboard = document.querySelector(".player .board");
let playershipsoverview = document.querySelector(".player .ships");

let aishipsoverview = document.querySelector(".computer .ships");
let aiboard = document.querySelector(".computer .board");

let startbtn = document.querySelector(".play");
let randomize = document.querySelector(".rndmze");
let restartbtn = document.querySelector(".restart");
let guidance = document.querySelector(".guidance");

let UserTurn  = true;


let usergame = null;
let aigame = null;
let enemy = null;
let gamestarted = false;
let lastplayercell = null;
let lastcomputercell = null;



document.addEventListener("DOMContentLoaded", ()=>{
    usergame = new gameboard();
    aigame = new gameboard();
    enemy = new enemyAi();
    guidance.innerHTML = "Press Start to Play...";
    initialize();
})


randomize.addEventListener("click", ()=>{
    usergame = new gameboard();
    aigame = new gameboard();
    clear(playerboard);
    clear(aiboard);
    clear(playershipsoverview);
    clear(aishipsoverview);
    guidance.innerHTML = "Press Start to Play..";
    UserTurn = true;
    initialize();
})


startbtn.addEventListener("click", ()=>{
    randomize.disabled = "true";
    startbtn.disabled = "true";
    guidance.innerHTML = "Your turn";
    gamestarted = true;
})


restartbtn.addEventListener("click", ()=>{
    usergame = new gameboard();
    aigame = new gameboard();
    enemy = new enemyAi();
    clear(playerboard);
    clear(aiboard);
    clear(playershipsoverview);
    clear(aishipsoverview);
    initialize();
    guidance.innerHTML = "Press Start to Play..";
    randomize.removeAttribute("disabled");
    startbtn.removeAttribute("disabled");
    gamestarted = false;
    UserTurn = true;
})

function initialize(){
    populateBoard(usergame, playerboard);
    populateBoard(aigame, aiboard);
    updateOverview(usergame, playershipsoverview);
    updateOverview(aigame, aishipsoverview);
}



async function UserCoordinate(x,y, gameboard, cell){
    let cannonShotsound = new Audio(cannonShot);
    let shipHitsound = new Audio(shipHit);
    if (UserTurn && gamestarted){
        UserTurn = false;
        let result = gameboard.recieveAttack(x, y);
        if (lastplayercell != null){
            lastplayercell.classList.remove("current");
        }
        lastplayercell = cell;
        lastplayercell.classList.add("current");
        if (result[0]){
            UserTurn = true;
            cell.classList.add("hit");
            shipHitsound.play();
            updateOverview(gameboard, aishipsoverview);
            if (result[1]){
                let ship = result[2];
                Highlightsunkships(ship, aiboard);
            }
            if (gameboard.allsunk){
                gamestarted = false;
                guidance.innerHTML = "You Won!!";
            }
        }
        else{
            cannonShotsound.play();
            cell.classList.add("miss");
            guidance.innerHTML = "Opponent's turn";
            await pause();
            enemyturn();
        }
    }
}



async function enemyturn(){
    UserTurn = false;
    let cannonShotsound = new Audio(cannonShot);
    while (!UserTurn){
        let enemycoord = enemy.play();
        let cell = getCell(enemycoord[0], enemycoord[1], playerboard);
        if (lastcomputercell != null){
            lastcomputercell.classList.remove("current");
        }
        lastcomputercell = cell;
        lastcomputercell.classList.add("current");
        let result = usergame.recieveAttack(enemycoord[0], enemycoord[1]);
        if (result[0]){
            let shipHitsound = new Audio(shipHit);
            enemy.registerWin();
            cell.classList.add("hit");
            shipHitsound.play();
            updateOverview(usergame, playershipsoverview);
            if (result[1]){
                enemy.registerMoveOn();
                let ship = result[2];
                Highlightsunkships(ship, playerboard);
            }
            if (usergame.allsunk){
                gamestarted = false;
                guidance.innerHTML = "You lost!";
                UserTurn = true;
            }
            await pause();
        }
        else{
            cannonShotsound.play();
            enemy.registerMiss();
            cell.classList.add("miss");
            guidance.innerHTML = "Your turn";
            UserTurn = true;
        }
    }
}


function pause() {
    return new Promise(resolve => setTimeout(() => {
      resolve();
    }, 1700)); 
  }




function getCell(x, y, board){
    let index = x * 10 + y;
    return board.children[index];
}


function Highlightsunkships(ship, board){
    let shipParts = ship.parts;
    for (let i = 0; i < shipParts.length; i++){
        let cell = getCell(shipParts[i][0], shipParts[i][1], board);
        cell.classList.add("sunk");
    }
}

























