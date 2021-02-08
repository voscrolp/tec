class Game{
    constructor(){

    }

    getState(){
        database.ref('gameState').on("value",(data)=>{
            gameState = data.val();
        })
    }

    update(state){
        database.ref('/').update({
            gameState: state
        });
    }

    async start(){
        
        if(gameState === 0){
            player = new Player();

            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.readCount();
            }

        form = new Form();
        form.display();

        }

        player1 = createSprite(200,100);
        player1.addAnimation("gameFiles/playerIdle/frame_0_delay-0.5s.png","gameFiles/playerIdle/frame_1_delay-0.5s.png","gameFiles/playerIdle/frame_2_delay-0.5s.png");
        player1.scale = 0.1;
        //player1.visible = false;
         
        player2 = createSprite(200,300);
        player2.addAnimation("gameFiles/playerIdle/frame_0_delay-0.5s.png","gameFiles/playerIdle/frame_1_delay-0.5s.png","gameFiles/playerIdle/frame_2_delay-0.5s.png");
        player2.scale = 0.1;
        //player2.visible = false;

        players = [player1,player2];

       
    }

    play(){
        form.hide();1

        

        

        
       
        Player.getPlayerInfo();
        //read initial position 
        //on presseing key change value in database 
        
        if(allPlayers !== undefined){
            var index = 0;
           

            for(var plr in allPlayers){
                player.readPosition1();
                player.readPosition2();
                index = index + 1;

                console.log(players[1]);
   
                if(player.index == 1 && player.index !== 2){
                   if(keyDown('D') || keyDown('d') && index==player.index){
                    player.writePosition1(7,0);
                    players[0].x=player.x1;
                    players[0].y=player.y1;
                }
                if(keyDown('A') || keyDown('a') && index==player.index){
                    player.writePosition1(-7,0);
                    players[0].x=player.x1;
                    players[0].y=player.y1;
                }
            }

            if(player.index == 2 && player.index !== 1){
                if(keyDown('D') || keyDown('d') && index==player.index){
                 player.writePosition2(7,0);
                 players[1].x=player.x2;
                 players[1].y=player.y2;
             }
             if(keyDown('A') || keyDown('a') && index==player.index){
                 player.writePosition2(-7,0);
                 players[1].x=player.x2;
                 players[1].y=player.y2;
             }
         }

                /*
                
                if(keyDown('W') || keyDown('w') && index==player.index){
                    player.writePosition(0,-3);
                    player.readPosition();
                    players[index-1].x=player.x;
                    players[index-1].y=player.y;
                }
                
                if(keyDown('S') || keyDown('s') && index==player.index){
                    player.writePosition(0,3);
                    player.readPosition();
                    players[index-1].x=player.x;
                    players[index-1].y=player.y;
                }

                */
            } 
            }    
            
            drawSprites();
        }
    }

