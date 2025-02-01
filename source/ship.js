







class ship{
    constructor(length, x, y, direction){
        this.length = length;
        this.HP = 2 * this.length;
        this.x = x;
        this.y = y;
        this.direction = direction;
    }


    hit(){
        this.HP -= 2;
    }

    isSunk(){
        if (this.HP <= 0){
            return true;
        }
        return false;
    }

}


export default ship;