class Player {
    constructor() {
        this.stats = {
            cash: 1000,
            horsebeton: "",
            firstgame: true
        };
    }

    setUpPlayer(){
        localStorage.setItem("cash", this.stats.cash);
        localStorage.setItem("horsebeton", this.stats.horsebeton);
        localStorage.setItem("firstgame", this.stats.firstgame);      
        localStorage.setItem("bet", 0);
    }

    getCash() {
        return localStorage.getItem("cash");
    }

    getBetCash() {
        return localStorage.getItem("bet");
    }

    setCash(amount) {
        localStorage.setItem("cash",amount);
    }

    betCash(amount) {
        localStorage.setItem("bet",amount);
    }

    getHorseBetOn() {
        return localStorage.getItem("horsebeton");
    }

    setHorseBetOn(horse) {
        localStorage.setItem("horsebeton", horse);
        this.stats.horsebeton = horse;
    }

    isFirstGame() {
        return localStorage.getItem("firstgame");  
    }

    setFirstGameStatus(status) {
        localStorage.setItem("firstgame", status);  
   }

}

export default Player;
