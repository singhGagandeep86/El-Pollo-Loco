
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
let isFullscreen = false;

function init() {
    gameScreen.classList.remove('disNone');
    introButtons.classList.add('disNone');
    introScreen.classList.add('disNone');
    resultBoard.classList.add('disNone');
    iconsInGame.classList.remove('disNone');
    world = new World(canvas, keyboard, sounds);
    music = false;
    toggleMusic();
    keyboard.attachButtonPressEvents();
    world.sounds.WINNING.pause();
    world.sounds.LOST.pause();
}

function restart() {
    if (world) {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
        gameScreen.classList.add('disNone');
        introButtons.classList.remove('disNone');
        introScreen.classList.remove('disNone');
        resultBoard.classList.add('disNone');
        music = true;
        toggleMusic();
        world.sounds.WINNING.pause();
        world.sounds.LOST.pause();
        level = createLevel1();
    }
}

function gameWon() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
    music = true;
    toggleMusic();
    world.sounds.WINNING.play();
    world.sounds.WINNING.loop = true;
    resultBoard.classList.remove('disNone');
    resultBoard.classList.remove('resultLost');
    introButtons.classList.remove('disNone');
    iconsInGame.classList.add('disNone');
    resultBoard.src = "img/9_intro_outro_screens/win/won_2.png";
}

function gameLost() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
    // level = createLevel1();
    music = true;
    toggleMusic();
    world.sounds.LOST.play();
    world.sounds.LOST.loop = true;
    resultBoard.classList.remove('disNone');
    resultBoard.classList.add('resultLost');
    resultBoard.classList.remove('result');
    introButtons.classList.remove('disNone');
    iconsInGame.classList.add('disNone');
    resultBoard.src = "img/9_intro_outro_screens/game_over/game over.png";
}

function showGameScreen() {
    window.location.href = "index.html";
}

function showInstructions() {
    window.location.href = "instruction.html";
}

function showImpressum() {
    window.location.href = "impressum.html";
}


// function toggleFullScreen() {
//     if (isFullscreen) {
//         exitFullscreen();
//     } else {
//         enterFullscreen(gameScreen);
//     }
// }

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        if (gameScreen.requestFullscreen && canvas.requestFullscreen) {
            gameScreen.requestFullscreen();
            canvas.requestFullscreen();
        } else if (gameScreen.webkitRequestFullscreen) { // Safari
            gameScreen.webkitRequestFullscreen();
        } else if (gameScreen.msRequestFullscreen) { // IE11
            gameScreen.msRequestFullscreen();
        }
    } else {
        // Vollbildmodus verlassen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

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
    sounds.NORMAL_GAME.pause();
    sounds.BOSS.pause();
    musicIcon.src = "img/icons/mute.png";
    music = false;
}

function playBackgroundMusic() {
    let distanceToBoss = world.endboss.x - world.character.x;
    if (distanceToBoss < 450) {
        sounds.BOSS.play();
        sounds.BOSS.loop = true;
    } else {
        sounds.NORMAL_GAME.play();
        sounds.NORMAL_GAME.loop = true;
    }
    musicIcon.src = "img/icons/volume.png";
    music = true;
}

