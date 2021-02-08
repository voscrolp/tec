class Player {
    constructor(){
        this.name = null;
        this.index = null;
        this.x1 =200 ;
        this.y1 =400 ;

        this.x2 =200 ;
        this.y2 =400 ;
    }

    readCount(){
        database.ref("playerCount").on("value",(data)=>{
            playerCount = data.val();
        })
    }

    updateCount(count){
        database.ref("/").update({
            playerCount: count
        })
    }

    readPosition1(){
        var playerPosition = "players/player1"
        database.ref(playerPosition).on("value",(data)=>{
            position1 = data.val();
            this.x1 = position1.x;
            this.y1 = position1.y;
        })
            
    }

    readPosition2(){
        var playerPosition = "players/player2"
        database.ref(playerPosition).on("value",(data)=>{
            position2 = data.val();
            this.x2 = position2.x;
            this.y2 = position2.y;
        })
            
    }

    writePosition1(x,y){
        var playerIndex = "players/player1";
        database.ref(playerIndex).update({
            x: position1.x+x,
            y: position1.y+y
        })
    }

    writePosition2(x,y){
        var playerIndex = "players/player2";
        database.ref(playerIndex).update({
            x: position2.x+x,
            y: position2.y+y
        })
    }
    

  /*  update(){
        var playerIndex = "players/player" + this.index;

        database.ref(playerIndex).update({
            name: this.name
        })
    }*/

    createPlayer(){
        var playerIndex = "players/player" + this.index;

        database.ref(playerIndex).set({
            name: this.name,
            x: this.x1,
            y: this.y1
        })
    }

    static getPlayerInfo(){
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value",(data)=>{
          allPlayers = data.val();
        })
      }



}