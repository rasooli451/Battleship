







class ship{
    constructor(length, x, y, direction){
        this.length = length;
        this.HP = this.length;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.parts = addParts(x, y, length, direction);
    }


    hit(){
        this.HP -= 1;
    }

    isSunk(){
        if (this.HP <= 0){
            return true;
        }
        return false;
    }

}


function addParts(x, y, length, direction){
    let result = [];
    for (let i = 0; i < length; i ++){
        let coordinates = [];
        if (direction === "hor"){
            coordinates.push(x);
            coordinates.push(y + i);
        }
        else{
            coordinates.push(x + i);
            coordinates.push(y);
        }
        result.push(coordinates);
    }
    return result;
}

export default ship;