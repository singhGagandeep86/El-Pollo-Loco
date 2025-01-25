
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
let isFullscreen = false;

function init() {
    gameScreen.classList.remove('disNone');
    introButtons.classList.add('disNone');
    introScreen.classList.add('disNone');
    resultBoard.classList.add('disNone');
    iconsInGame.classList.remove('disNone');
    mobilePanel.classList.remove('disNone');
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
    resultBoard.classList.add('result !important');
    introButtons.classList.remove('disNone');
    iconsInGame.classList.add('disNone');
    resultBoard.src = "img/9_intro_outro_screens/win/won_2.png";
}

function gameLost() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
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
    document.querySelector("h1").classList.remove('disNone');
    instructions.classList.add('disNone');
    impressum.classList.add('disNone');
    gameCanvas.classList.remove('disNone');
}

function showInstructions() {
    document.querySelector("h1").classList.add('disNone');
    gameCanvas.classList.add('disNone');
    instructions.classList.remove('disNone');
}

function showImpressum() {
    document.querySelector("h1").classList.add('disNone');
    gameCanvas.classList.add('disNone');
    impressum.classList.remove('disNone');
}

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

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
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

