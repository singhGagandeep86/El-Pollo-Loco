

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

    /** 
     * Initializes the Keyboard class by attaching key press events
     * for both keyboard and mobile panel button interactions. 
     */
    constructor() {
        this.attachKeyPressEvents();
        this.mobilePanelEvents();
    }

    /**
     * Attaches event listeners to the window for keydown and keyup events.
     * Maps key codes to actions based on the keyMap and updates the corresponding action state.
     * @param {KeyboardEvent} event - The keyboard event triggered by key press or release.
     * @param {boolean} isPressed - Indicates whether the key is pressed (true) or released (false). 
     */
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


    /** 
     * Initializes the mobile panel with button event listeners.
     * Attaches 'touchstart' and 'mousedown' event listeners to the mobile panel buttons.
     */
    mobilePanelEvents() {
        this.createButtonEvent('leftBtn', 'LEFT');
        this.createButtonEvent('rightBtn', 'RIGHT');
        this.createButtonEvent('jumpBtn', 'SPACE');
        this.createButtonEvent('throwBtn', 'D');
    }

    /** 
     * Creates event listeners for a mobile panel button to map touch and mouse events
     * to a specific action state. Sets the action state to true on "touchstart" and "mousedown",
     * and to false on "touchend" and "mouseup".
     * @param {string} buttonId - The ID of the button element to attach events to.
     * @param {string} action - The action to be updated based on the button interaction. 
     */
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