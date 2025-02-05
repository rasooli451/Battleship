




import gameboard from "./gameboard";


import {enemyAi} from "./enemyAi";

import "./style.css";

import { populateBoard, updateOverview, clear , x, y} from "./DOM";

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
    clear(playerboard);
    clear(aiboard);
    clear(playershipsoverview);
    clear(aishipsoverview);
    initialize();
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



function UserCoordinate(x,y, gameboard, cell){
    if (UserTurn && gamestarted){
        let result = gameboard.recieveAttack(x, y);
        if (lastplayercell != null){
            lastplayercell.classList.remove("current");
        }
        lastplayercell = cell;
        lastplayercell.classList.add("current");
        if (result){
            cell.classList.add("hit");
            updateOverview(gameboard, aishipsoverview);
            if (gameboard.allsunk){
                gamestarted = false;
                guidance.innerHTML = "You Won!!";
            }
        }
        else{
            cell.classList.add("miss");
            guidance.innerHTML = "Opponent's turn";
            enemyturn();
        }
    }
}



function enemyturn(){
    UserTurn = false;
    while (!UserTurn){
        let enemycoord = enemy.play();
        let cell = getCell(enemycoord[0], enemycoord[1]);
        if (lastcomputercell != null){
            lastcomputercell.classList.remove("current");
        }
        lastcomputercell = cell;
        lastcomputercell.classList.add("current");
        let result = usergame.recieveAttack(enemycoord[0], enemycoord[1]);
        if (result){
            enemy.registerWin();
            cell.classList.add("hit");
            updateOverview(usergame, playershipsoverview);
            if (playerboard.allsunk){
                gamestarted = false;
                guidance.innerHTML = "You lost!";
                UserTurn = true;
            }
        }
        else{
            enemy.registerMiss();
            cell.classList.add("miss");
            guidance.innerHTML = "Your turn";
            UserTurn = true;
        }
    }
}



function getCell(x, y){
    let index = x * 10 + y;
    return playerboard.children[index];
}



























