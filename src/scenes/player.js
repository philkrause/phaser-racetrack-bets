class Player {
    constructor() {
        //defaults
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
    }
    background
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
    }

    isFirstGame() {
        return localStorage.getItem("firstgame");  
    }

    setFirstGameStatus(status) {
        localStorage.setItem("firstgame", status);  
   }

}

export default Player;
