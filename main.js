

const CANVAS_HEIGHT = 350
const CANVAS_WIDTH = 435

const PLAYER_IDLE_HEIGHT = 175
const PLAYER_IDLE_WIDTH = 85

const PLAYER_JUMP_WIDTH = 110

const PLAYER_GAME_HEIGHT = 175
const PLAYER_GAME_WIDTH = 85
const PLAYER_ANIMATE_FRAME_DURATION = 200;

const JUMP_HEIGHT = 130;
const JUMP_VELOCITY = 8
const GRAVITY = 7;

const FLOOR_Y = 300

drawGameInitScreen()

var gameStarted = false

var playerX = 60;
var playerY = FLOOR_Y - PLAYER_GAME_HEIGHT;
var playerJumping = false;
var playerTotalCollisions = 0
var playerTotalJumps = 0

var blockX = CANVAS_WIDTH
var blockWidth = 30
var blockHeight = 20
var blockSpeed = 10
var blockCollided = false

var blockRespawnExtraMax = 900


var lastRender = Date.now();

function draw() {
    let dt = Date.now() - lastRender

    var ctx = GameCanvas.getContext("2d")

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // clear canvas

    // draw the player in the starting spot

    let img = Avatar1;
    let width = PLAYER_GAME_WIDTH;
    const framesElapsed = Math.floor(dt / PLAYER_ANIMATE_FRAME_DURATION);
    if (framesElapsed % 2 != 0) {
        img = Avatar2;
    }
    if (playerJumping) {
        img = Avatar3;
        width = PLAYER_JUMP_WIDTH
    }

    ctx.drawImage(img, playerX, playerY, width, PLAYER_GAME_HEIGHT)
    ctx.save()

    // draw the block to jump over
    ctx.beginPath()
    ctx.rect(blockX, FLOOR_Y - blockHeight, blockWidth, blockHeight)
    ctx.stroke()
    ctx.save()

    if (playerTotalCollisions > 0) {
        GameMessage.innerText = `Run! (${playerTotalJumps}/${playerTotalCollisions + playerTotalJumps})`
    }

    // ---- Update shit ----

    // detect if the players total x area is ontop of the block's height
    let hasCollidedX = playerX + width > blockX
    let hasCollidedY = (playerY + PLAYER_GAME_HEIGHT) > FLOOR_Y - blockHeight
    if (hasCollidedX && hasCollidedY && !blockCollided) {
        blockCollided = true
    }

    // add gravity
    if (FLOOR_Y - PLAYER_GAME_HEIGHT - JUMP_HEIGHT >= playerY) {
        playerJumping = false;
    }

    if (playerJumping) {
        playerY -= JUMP_VELOCITY
    } else if (playerY < FLOOR_Y - PLAYER_GAME_HEIGHT){
        playerY += GRAVITY
    }
    
    // move block to the left
    blockX -= blockSpeed
    // reset the block and have it wrap around if off the screen
    if (blockX <= 0) {
        let extraDistance = Math.floor(Math.random() * blockRespawnExtraMax - 70) + 70
        blockX = CANVAS_WIDTH + extraDistance
        if (blockCollided) {
            blockCollided = false
            playerTotalCollisions++
        } else {
            playerTotalJumps++
        }
    }

    window.requestAnimationFrame(draw);
    
}


function setupKeyEvents() {
    document.addEventListener('keydown', (e) => {
        console.log(e.keyCode)
        if (e.keyCode == 32) {//space
            playerJumping = true;
        }
    }, false)
}

function drawGameInitScreen() {
    var ctx = GameCanvas.getContext("2d")
    // Avatar.height = PLAYER_IDLE_HEIGHT
    // Avatar.width = PLAYER_IDLE_WIDTH
    const imgX = (CANVAS_WIDTH - PLAYER_IDLE_WIDTH)/2
    const imgY = (CANVAS_HEIGHT - PLAYER_IDLE_HEIGHT)/2
    ctx.drawImage(Avatar1, imgX, imgY, PLAYER_IDLE_WIDTH, PLAYER_IDLE_HEIGHT)
    GameMessage.innerText = "Click to Play"

    GameCanvas.addEventListener('click', () => {
        GameMessage.innerText = "Run!"
        // TODO: Animate player to the starting position
        ctx.drawImage(Avatar1, imgX, imgY, PLAYER_GAME_WIDTH, PLAYER_GAME_HEIGHT)
        // add event handler
        setupKeyEvents()

        if (!gameStarted) {
            // start the game
            window.requestAnimationFrame(draw)
            gameStarted = true
        } else {
            playerJumping = true;
        }
    });
}

