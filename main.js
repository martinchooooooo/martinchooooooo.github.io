

const CANVAS_HEIGHT = 350
const CANVAS_WIDTH = 400

const PLAYER_IDLE_HEIGHT = 220
const PLAYER_IDLE_WIDTH = 160

const PLAYER_GAME_HEIGHT = 110
const PLAYER_GAME_WIDTH = 80


drawGameInitScreen()

function drawGameInitScreen() {
    var ctx = GameCanvas.getContext("2d")
    // Avatar.height = PLAYER_IDLE_HEIGHT
    // Avatar.width = PLAYER_IDLE_WIDTH
    const imgX = (CANVAS_WIDTH - PLAYER_IDLE_WIDTH)/2
    const imgY = (CANVAS_HEIGHT - PLAYER_IDLE_HEIGHT)/2
    ctx.drawImage(Avatar, imgX, imgY, PLAYER_IDLE_WIDTH, PLAYER_IDLE_HEIGHT)

    GameCanvas.addEventListener('click', () => {
        console.log("start game")
        console.log(Avatar.style.height)
        // Animate player to the starting position
        ctx.drawImage(Avatar, imgX, imgY, PLAYER_GAME_WIDTH, PLAYER_GAME_HEIGHT)
        // add event handler
        setupKeyEvents()
        // start the game
        window.requestAnimationFrame(draw)
        
    });
}

const JUMP_HEIGHT = 60;
const JUMP_VELOCITY = 10
const GRAVITY = 10;

const FLOOR_Y = 200

var playerX = 0;
var playerY = FLOOR_Y;
var playerJumping = false;

var lastRender = Date.now();

function draw() {
    let dt = Date.now() - lastRender

    var ctx = GameCanvas.getContext("2d")

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // clear canvas

    // draw the player in the starting spot
    ctx.drawImage(Avatar, playerX, playerY, PLAYER_GAME_WIDTH, PLAYER_GAME_HEIGHT)
    ctx.save()


    // add gravity
    if (FLOOR_Y - JUMP_HEIGHT >= playerY) {
        console.log("1")
        playerJumping = false;
    }
    if (playerJumping) {
        console.log("3")
        playerY -= JUMP_VELOCITY
    } else if (playerY < FLOOR_Y){
        playerY += GRAVITY
    }
    

    window.requestAnimationFrame(draw);
}

function setupKeyEvents() {
    document.addEventListener('keydown', (e) => {
        console.log(e.keyCode)
        if (e.keyCode == 32) {//space
            playerJumping = true;
            // playerY -= JUMP_HEIGHT
        }
    }, false)

}

