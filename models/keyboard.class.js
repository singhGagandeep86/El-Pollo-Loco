

class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    keyMap = {
        40: 'DOWN',
        38: 'UP',
        37: 'LEFT',
        39: 'RIGHT',
        32: 'SPACE',
        68: 'D'
    };


    constructor() {
        this.attachKeyPressEvents();
        this.mobilePanelEvents();
    }

    attachKeyPressEvents() {

        const handleKeyEvent = (event, isPressed) => {
            const action = this.keyMap[event.keyCode];
            if (action !== undefined) {
                this[action] = isPressed;
            }
        };

        window.addEventListener('keydown', (event) => handleKeyEvent(event, true));
        window.addEventListener('keyup', (event) => handleKeyEvent(event, false));
    }


    mobilePanelEvents() {
        this.createButtonEvent('leftBtn', 'LEFT');
        this.createButtonEvent('rightBtn', 'RIGHT');
        this.createButtonEvent('jumpBtn', 'SPACE');
        this.createButtonEvent('throwBtn', 'D');
    }

    createButtonEvent(buttonId, action) {
        ["touchstart", "mousedown"].forEach((event) => {
            document.getElementById(buttonId).addEventListener(event, () => {
                this[action] = true;
            }, { passive: true });
        });

        ["touchend", "mouseup"].forEach((event) => {
            document.getElementById(buttonId).addEventListener(event, () => {
                this[action] = false;
            }, { passive: true });
        });
    }
}