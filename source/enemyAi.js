




class enemyAi{



    constructor(){
        this.hits = [];
        this.wins = [];
        this.lastwaswin = false;
        this.triedhorleft = false;
        this.triedhorright = false;
        this.triedvertop = false;
        this.triedverbot = false;
        this.alreadytried = [];
    }


    play(){
        let x = 0;
        let y = 0;
        if (!this.lastwaswin){
            x = getRandomNumber(0, 8);
            y = getRandomNumber(0, 8);
            let previoushits = JSON.stringify(this.hits);
            let newcoord = JSON.stringify([x,y]);
            while(previoushits.indexOf(newcoord) != -1){
                x = getRandomNumber(0, 8);
                y = getRandomNumber(0, 8);
                newcoord = JSON.stringify([x, y]);
            }
        }
        else{
            let lastwin = this.wins[this.wins.length - 1];
            let coordfound = false;
            if (!this.triedhorleft){
                if (lastwin[1] > 0){
                    x = lastwin[0];
                    y = lastwin[1] - 1;
                    if (!pairExists(x, y, this.hits)){
                        coordfound = true;
                        this.alreadytried.push("horleft");
                    }
                }
                else{
                    this.triedhorleft = true;
                }
            }
            if(!this.triedhorright && !coordfound){
                if (lastwin[1] < 9){
                    x = lastwin[0];
                    y = lastwin [1] + 1;
                    if (!pairExists(x, y, this.hits)){
                        coordfound = true;
                        this.alreadytried.push("horright");
                    }
                }
                else{
                    this.triedhorright = true;
                }
            }
            if (!this.triedvertop && !coordfound){
                if (lastwin[0] > 0){
                    x = lastwin[0] - 1;
                    y = lastwin[1];
                    if (!pairExists(x,y, this.hits)){
                        coordfound = true;
                        this.alreadytried.push("vertop");
                    }
                }
                else{
                    this.triedvertop = true;
                }
            }
            if (!this.triedverbot && !coordfound){
                if (lastwin[0] < 9){
                    x = lastwin[0] + 1;
                    y = lastwin[1];
                    if (!pairExists(x,y,this.hits)){
                        coordfound = true;
                        this.alreadytried.push("verbot");
                    }
                }
                else{
                    this.triedverbot = true;
                }
            }

            //checkhor first, if possible, left and right, else do ver top and bottom, only then switch lastwaswin to false
        }
        this.hits.push([x,y]);
        return [x, y];
    }

    registerWin(){
        if (!this.lastwaswin){
            this.lastwaswin = true;
        }
        else{
            //set a trend that ai should follow for next attack, using the alreadytried array
            if (this.alreadytried[this.alreadytried.length - 1] === "horleft"){
                this.triedhorleft = false;
            }
            else if(this.alreadytried[this.alreadytried.length - 1] === "horright"){
                this.triedhorright = false;
            }
            else if(this.alreadytried[this.alreadytried.length - 1] === "vertop"){
                this.triedvertop = false;
            }
            else{
                this.triedverbot = false;
            }
        }
        this.wins.push(this.hits[this.hits.length - 1]);
    }

    registerMiss(){
        if (this.lastwaswin){
            if (this.triedhorleft && this.triedhorright && this.triedvertop && this.triedverbot){
                this.lastwaswin = false;
                this.alreadytried = [];
                this.triedhorleft = false;
                this.triedhorright = false;
                this.triedvertop = false;
                this.triedverbot = false;
            }
            else{
                let lastmove = this.alreadytried[this.alreadytried.length - 1];
                if (lastmove === "horleft"){
                    this.triedhorleft = true;
                }
                else if(lastmove === "horright"){
                    this.triedhorright = true;
                }
                else if(lastmove === "vertop"){
                    this.triedvertop = true;
                }
                else if(lastmove === "verbot"){
                    this.triedverbot = true;
                }
            }
        }
        else{

        }
    }
}



function getRandomNumber(min, max){
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function pairExists(x,y,hits){
    let Hits = JSON.stringify(hits);
    let pair = JSON.stringify([x,y]);

    if (Hits.indexOf(pair) !=-1){
        return true;
    }
    return false;
}




export default enemyAi;