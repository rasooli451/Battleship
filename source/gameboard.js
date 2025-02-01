



import ship from "./ship";

class gameboard{

    constructor(){
        this.board = [[0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]];
        this.ships = this.shipFactory();
        this.horizontal = false;
    }



    shipFactory(){
        let ships = [];
        let size = 0;
        let x = 0;
        let y = 0;
        let newship = null;
        for (let i = 0; i < 10; i++){
            size = getRandomNumber(1, 4);
            x = getRandomNumber(0, 9);
            y = getRandomNumber(0, 9);
            while (!this.checkavailability(size, x, y, "hor") && !this.checkavailability(size, x, y, "ver")){
                size = getRandomNumber(1, 4);
                x = getRandomNumber(0, 9);
                y = getRandomNumber(0, 9);
            }
            newship = new ship(size, x, y, this.horizontal ? "hor" : "ver");
            ships.push(newship);
            this.fillboard(newship);
        }
        return ships;
    }


    checkavailability(size, x, y, direction){
            let checkx = true;
            let checky = true;
            if (size + y > 10){
                checkx = false;
            }
            if (size + x > 10){
                checky = false;
            }
            for (let i = 0; i < size; i ++){
                if (direction === "hor" && checkx){
                    if (this.board[x][y + i] === 1){
                        return false;
                    }
                    else{
                        if (!reduceRepetition(x, y, i, this.board, direction, size)){
                            return false;
                    }
                }
            }
                else if(direction === "ver" && checky){
                    if (this.board[x + i][y] === 1){
                        checky = false;
                    }
                    else{
                        if (!reduceRepetition(x, y, i, this.board, direction, size)){
                            return false;
                        }
                    }
                }
            }
            if (direction === "hor"){
                if (checkx){
                    this.horizontal = true;
                    return true;
                }
            }
            else{
                if (checky){
                    this.horizontal = false;
                    return true;
                }
            }
            return false;
    }


    fillboard(ship){

        if (this.horizontal){
            for (let i = 0; i < ship.length; i ++){
                this.board[ship.x][ship.y + i] = 1;
            }
        }
        else{
            for (let i = 0; i < ship.length ; i++){
                this.board[ship.x + i][ship.y] = 1;
            }
        }
    }

    recieveAttack(x, y){
        //idea : go through ships, each ship object should have an array property with all of its coordinates, then pass the new coordinates and see if it exists in the ship parts array, if it does, then it's a hit, otherwise, register the hit as 'missed'. it's important to stringify the ship parts array and the array with the new coordinates, then use indexof method on the stringified version of ship parts array and pass in the stringified array with the new coordinates, if it doesn't return -1, it's a hit. if you don't stringify, this method won't work.
    }
}



function getRandomNumber(min, max){
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}


function checksurrounding(x, y, array){
    if (array[x]!= undefined){
        if (array[x][y] != undefined){
            if (array[x][y] === 1){
                return false;
            }
        }
    }
    return true;
}

function reduceRepetition(x, y, i, array, dir, size){
    if (dir === "hor"){
        if (i === 0 && !checksurrounding(x, y + i - 1, array)){
            return false;
        }
        if (!checksurrounding(x-1, y + i, array)){
            return false;
        }
        if (!checksurrounding(x + 1, y + i, array)){
            return false;
        }
        if (i === size - 1 && !checksurrounding(x, y + i + 1, array)){
            return false;
        }
    }
    else{
        if (i === 0 && !checksurrounding(x + i - 1, y, array)){
            return false;
        }
        if (!checksurrounding(x + i, y - 1, array)){
            return false;
        }
        if (!checksurrounding(x + i, y + 1, array)){
            return false;
        }
        if (i === size - 1 && !checksurrounding(x + i + 1, y, array)){
            return false;
        }   
    }
    return true;
}

export default gameboard;