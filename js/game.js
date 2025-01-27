
let canvas = document.getElementById('canvas');
let world;
let keyboard = new Keyboard();
let sounds = new Sounds();
let music = true;
let gameScreen = document.getElementById('gameScreen');
let introButtons = document.getElementById('introButtons');
let introScreen = document.getElementById('introScreen');
let iconsInGame = document.getElementById('iconsInGame');
let musicIcon = document.getElementById('musicIcon');
let mobilePanel = document.getElementById('mobilePanel');
let instructions = document.getElementById("instructions");
let impressum = document.getElementById("impressum");
let gameCanvas = document.getElementById('gameCanvas');
let alertElement = document.getElementById('alert');
let isFullscreen = false;

/**
 * Hides or shows the alert message when the device is in  respective landscape or portrait mode.
 */
function handleOrientation() {
    if (window.matchMedia("(orientation: landscape)").matches) {
        alertElement.classList.add('disNone');
    } else {
        alertElement.classList.remove('disNone');
    }
}

window.addEventListener("resize", handleOrientation, true);
window.addEventListener("orientationchange", handleOrientation, true);

handleOrientation();

/**
 * Initializes and start the game meanwhile by showing the loading screen 
 */
async function init() {
    showLoadingScreen();
    await startGame();
    hideLoadingScreen();
}

/**
 * Displays the loading screen
 */
async function showLoadingScreen() {
    document.getElementById('loading').classList.remove('disNone');
}

/**
 * Hides the loading screen
 */
async function hideLoadingScreen() {
    document.getElementById('loading').classList.add('disNone');
}

/**
 * Initializes and starts the game. This function is called when the user presses the start button.
 * It shows the game screen, hides the intro screen, and initializes the game world.
 * It also starts the background music.
 */
async function startGame() {
    gameScreen.classList.remove('disNone');
    introButtons.classList.add('disNone');
    introScreen.classList.add('disNone');
    resultBoard.classList.add('disNone');
    iconsInGame.classList.remove('disNone');
    mobilePanel.classList.remove('disNone');
    world = new World(canvas, keyboard, sounds);
    keyboard.attachButtonPressEvents();
    world.sounds.WINNING.pause();
    world.sounds.LOST.pause();
}

/**
 * Restarts the game by clearing the intervals, hiding the game screen, and showing the intro screen.
 * It also resets the music and the level.
 */
function restart() {
    if (world) {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
        gameScreen.classList.add('disNone');
        introButtons.classList.remove('disNone');
        introScreen.classList.remove('disNone');
        resultBoard.classList.add('disNone');
        world.sounds.WINNING.pause();
        world.sounds.LOST.pause();
        world.sounds.NORMAL_GAME.pause();
        mobilePanel.classList.add('disNone');
        level = createLevel1();
    }
}

/**
 * Handles the game win scenario by stopping all intervals, toggling music, and playing the winning sound.
 * Updates the result board to display the winning image, hides in-game icons, and shows intro buttons.
 */

function gameWon() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
    world.sounds.WINNING.play();
    world.sounds.WINNING.loop = true;
    resultBoard.classList.remove('disNone');
    resultBoard.classList.remove('resultLost');
    resultBoard.classList.add('result');
    introButtons.classList.remove('disNone');
    iconsInGame.classList.add('disNone');
    resultBoard.src = "img/9_intro_outro_screens/win/won_2.png";
}

/**
 * Handles the game lost scenario by stopping all intervals, toggling music, and playing the losing sound.
 * Updates the result board to display the losing image, hides in-game icons, and shows intro buttons.
 */
function gameLost() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
    world.sounds.LOST.play();
    world.sounds.LOST.loop = true;
    resultBoard.classList.remove('disNone');
    resultBoard.classList.add('resultLost');
    resultBoard.classList.remove('result');
    introButtons.classList.remove('disNone');
    iconsInGame.classList.add('disNone');
    resultBoard.src = "img/9_intro_outro_screens/game_over/game over.png";
}

/**
 * Shows the game screen by removing the display-none class from the game canvas
 * and hiding the instructions and impressum by adding the display-none class.
 */
function showGameScreen() {
    document.querySelector("h1").classList.remove('disNone');
    instructions.classList.add('disNone');
    impressum.classList.add('disNone');
    gameCanvas.classList.remove('disNone');
}

/**
 * Displays the instructions screen by hiding the game canvas and the main header.
 */
function showInstructions() {
    document.querySelector("h1").classList.add('disNone');
    gameCanvas.classList.add('disNone');
    instructions.classList.remove('disNone');
}

/**
 * Displays the impressum screen by hiding the game canvas and the main header.
 */
function showImpressum() {
    document.querySelector("h1").classList.add('disNone');
    gameCanvas.classList.add('disNone');
    impressum.classList.remove('disNone');
}

/**
 * Toggles full screen mode on or off.
 * Currently, this works by calling the requestFullscreen() method on the
 * gameScreen and canvas elements. If that doesn't work, it falls back to calling
 * webkitRequestFullscreen() on the gameScreen element. If that doesn't work, it
 * falls back to calling msRequestFullscreen() on the gameScreen element.
 *
 * When exiting full screen mode, this function calls the exitFullscreen() method
 * on the document. If that doesn't work, it falls back to calling
 * webkitExitFullscreen().
 */
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        if (gameScreen.requestFullscreen && canvas.requestFullscreen) {
            gameScreen.requestFullscreen();
            canvas.requestFullscreen();
        } else if (gameScreen.webkitRequestFullscreen) {
            gameScreen.webkitRequestFullscreen();
        } else if (gameScreen.msRequestFullscreen) {
            gameScreen.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

/**
 * Requests full screen mode on the given element. This tries the requestFullscreen()
 * method first, then falls back to msRequestFullscreen(), and finally webkitRequestFullscreen().
 * @param {Element} element - The element to request full screen mode on.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits full screen mode on the given document. This tries the exitFullscreen() method
 * first, then falls back to webkitExitFullscreen().
 * @param {Document} document - The document to exit full screen mode on.
 */
function exitFullscreen(document) {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function toggleMusic() {
    if (music) {
        pauseBackgroundMusic();
    }
    else {
        playBackgroundMusic();
    }
}

function pauseBackgroundMusic() {
    for (let key in world.sounds) {
        if (world.sounds[key] instanceof Audio) {
            world.sounds[key].volume = 0;
            world.sounds[key].currentTime = 0; 
            world.sounds[key].muted = true;  
        }
    }
    musicIcon.src = "img/icons/mute.png";
    music = false;
}

function playBackgroundMusic() {
    for (let key in world.sounds) {
        if (world.sounds[key] instanceof Audio) {
            world.sounds[key].volume = 1;
            world.sounds[key].currentTime = 0; 
            world.sounds[key].muted = false;  
        }
    }
    musicIcon.src = "img/icons/volume.png";
    music = true;
}

