var gunImg;
var gun;
var bullet;
var crosshair;
var crosshairImg;
var bot;
var botHead;
var newBot;
var botImg;
var invisbox;
var kills = 0;
var rebots = 30;
var score = 0;
var recoilImg;
var delay = 0;
var summon = true;
var gameState = "title";
var playButton;
var playImg;
var easy, medium, hard;
var easyImg, mediumImg, hardImg;
var bulletSound;

function preload() {
    gunImg = loadImage("1.png")
    crosshairImg = loadImage("crosshairimage.png")
    botImg = loadImage("bot.png")
    recoilImg = loadImage("2.png")
    playImg = loadImage("play.png")
    easyImg = loadImage("easy.png")
    mediumImg = loadImage("medium.png")
    hardImg = loadImage("hard.png")
    bulletSound = loadSound("Vandal.mp3")
}

function setup(){
    createCanvas(windowWidth-30, windowHeight-30)


    
    gun = createSprite(windowWidth-520, windowHeight - 320, 50, 50)
    gun.addImage(gunImg)
    gun.scale=2
    gun.visible = false

    crosshair = createSprite(windowWidth/2, windowHeight/2, 50, 50)
    crosshair.addImage(crosshairImg)
    crosshair.scale = 0.3
    crosshair.visible = false

    bot = createSprite (random(95, 1050), random(180,675) - 100, 40, 50)
    bot.addImage(botImg)
    bot.setCollider("rectangle", -6, 30, 51, 170)
    bot.scale = 0.7
    bot.visible= false

    botHead = createSprite (bot.x, bot.y, 50, 10)
    botHead.visible=false;
    botHead.setCollider("rectangle", -6, -26, 15, 15)

    playButton = createSprite(windowWidth/2 - 50, windowHeight/2 + 50, 100, 100);
    stroke("black")
    playButton.addImage(playImg)
    playButton.visible = false;

    easy = createSprite(windowWidth/2 - 350, windowHeight/2 + 50, 100, 100);
    easy.addImage(easyImg)
    easy.scale = 1.5
    easy.visible = false;

    medium = createSprite(windowWidth/2 - 30, windowHeight/2 + 50, 100, 100);
    medium.addImage(mediumImg)
    medium.scale = 1.5
    medium.visible = false;

    hard = createSprite(windowWidth/2 + 300, windowHeight/2 + 50, 100, 100);
    hard.addImage(hardImg)
    hard.scale = 1.5
    hard.visible = false;

    //invisbox = createSprite(windowWidth-300, windowHeight-260, 100, 100)
    
}

function draw(){
    background("yellow")
    console.log(gameState)

    if(gameState == "play"){
    textSize(30)
    text("Score: " + score, windowWidth/2-80, 40)
    text("Remaining: " + rebots, windowWidth/2 + 140, 40)
    text("Kills: "+ kills, windowWidth/2 - 320, 40)
    if(mousePressedOver(bot) && bot.visible == true && summon == true){
        bot.visible = false;
        bot.destroy()
        botHead.destroy()
        kills+=1
        rebots-=1
        score+=50
        if(mousePressedOver(botHead)){
            score+=50
        }
        if(rebots == 0){
            summon = false;
        }
        summonBot()
    }
    }
    

    crosshair.x = mouseX
    crosshair.y = mouseY
    /* if(crosshair.x > windowWidth-520 && crosshair.y > displayHeight - 460){
        crosshair.x = windowWidth-520
    }
    if(crosshair.y < displayHeight-460){
        crosshair.y = displayHeight - 460
    } */
    fire()
    

    if(gameState == "title"){
        textSize(50)
        stroke("black")
        text("FPS Shooter Game", windowWidth/2 - 250, windowHeight/2 - 130)
        playButton.visible = true;
        if(mousePressedOver(playButton)){
            gameState = "difficulties"
            playButton.visible = false
            playButton.destroy()
        }

    }
    if(gameState == "difficulties"){
        textSize(50)
        stroke("black")
        text("Choose a Difficulty", windowWidth/2 - 250, windowHeight/2 - 130)
        easy.visible = true;
        medium.visible = true;
        hard.visible = true;
        if(mousePressedOver(easy)){
            easy.destroy()
            medium.destroy()
            hard.destroy()
            gameState = "play"
            gun.visible = true;
            crosshair.visible = true;
            bot.visible = true;
        }
        if(mousePressedOver(medium)){
            easy.destroy()
            medium.destroy()
            hard.destroy()
            gameState = "play"
            gun.visible = true;
            crosshair.visible = true;
            bot.visible = true;
        }
       if(mousePressedOver(hard)){
            easy.destroy()
            medium.destroy()
            hard.destroy()
            gameState = "play"
            gun.visible = true;
            crosshair.visible = true;
            bot.visible = true;
        }
    }
    drawSprites()
}
function summonBot(){   
    bot = createSprite (random(95, 1050), random(180,675) - 100, 40, 50)
    bot.addImage(botImg)
    bot.setCollider("rectangle", -6, 30, 51, 170)
    bot.scale = 0.7

    botHead = createSprite (bot.x, bot.y, 50, 10)
    botHead.visible=false;
    botHead.setCollider("rectangle", -6, -26, 15, 15)
}
function fire(){
    if(mouseDown("leftButton") && gameState == "play"){
        recoil()
        bulletSound.play()
    }
}
function recoil(){
    if(gameState == "play"){
    gun.addImage(recoilImg)
    setTimeout(() => {
        gun.addImage(gunImg)
        }, 100) 
    }
    
}
