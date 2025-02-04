




import gameboard from "./gameboard";


import enemyAi from "./enemyAi";

import "./style.css";

import { populateBoard, updateOverview, clear } from "./DOM";




let playerboard = document.querySelector(".player .board");
let playershipsoverview = document.querySelector(".player .ships");

let aishipsoverview = document.querySelector(".computer .ships");
let aiboard = document.querySelector(".computer .board");

let startbtn = document.querySelector(".play");
let randomize = document.querySelector(".rndmze");


let UserTurn  = true;


let usergame = null;
let aigame = null;
let enemy = null;


document.addEventListener("DOMContentLoaded", ()=>{
    usergame = new gameboard();
    aigame = new gameboard();
    enemy = new enemyAi();
    initialize();
})


randomize.addEventListener("click", ()=>{
    usergame = new gameboard();
    aigame = new gameboard();
    clear(playerboard);
    clear(aiboard);
    clear(playershipsoverview);
    clear(aishipsoverview);
    initialize();
})


startbtn.addEventListener("click", ()=>{
    randomize.disabled = "true";
})


function initialize(){
    populateBoard(usergame, playerboard);
    populateBoard(aigame, aiboard);
    updateOverview(usergame, playershipsoverview);
    updateOverview(aigame, aishipsoverview);
}


























