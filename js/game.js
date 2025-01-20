
let canvas;
let world;
let keyboard = new Keyboard();
let sounds = new Sounds();
let music = true;
let intervalIDs = [];

function init() {
    canvas = document.getElementById('canvas');
    gameScreen = document.getElementById('gameScreen');
    introButtons = document.getElementById('introButtons');
    introScreen = document.getElementById('introScreen');
    gameScreen.classList.remove('disNone');
    introButtons.classList.add('disNone');
    introScreen.classList.add('disNone');
    resultBoard.classList.add('disNone');
    world = new World(canvas, keyboard, sounds);
    world.sounds.WINNING.pause();
    world.sounds.LOST.pause();
    level = level1;
    music = false;
    toggleMusic();
}

function setstoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIDs.push(id);
}

function stopGame() {
    intervalIDs.forEach(clearInterval);
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

function restart() {
    window.location.reload();
    return false;
}

function lostGameOver() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
    world.character.y = 184;
    music = true;
    toggleMusic();
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
    resultBoard.src = "img/9_intro_outro_screens/win/won_2.png";
}

function gameLost() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
    music = true;
    toggleMusic();
    world.sounds.LOST.play();
    world.sounds.LOST.loop = true;
    resultBoard.classList.remove('disNone');
    resultBoard.classList.remove('result');
    introButtons.classList.remove('disNone');
    resultBoard.src = "img/9_intro_outro_screens/game_over/game over.png";
}

function toggleFullScreen() {
    let introFullscreen = document.getElementById('introScreen');
    let canvas = document.getElementById('canvas');
    enterFullscreen(introFullscreen);
    enterFullscreen(canvas);
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
    let musicIcon = document.getElementById('musicIcon');
    if (music == true) {
        sounds.NORMAL_GAME.pause();
        sounds.BOSS.pause();
        musicIcon.src = "img/icons/mute.png";
        music = false;
    } else {
        if (world.endboss.x - world.character.x >= 450) {
            sounds.NORMAL_GAME.play();
            sounds.NORMAL_GAME.loop = true;
        } else {
            sounds.BOSS.play();
            sounds.BOSS.loop = true;
        }
        musicIcon.src = "img/icons/volume.png";
        music = true;
    }
}

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
});


window.addEventListener('keyup', (event) => {
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});