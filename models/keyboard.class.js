

class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    constructor() {
        this.attachKeyPressEvents();
    }

    attachKeyPressEvents() {
        window.addEventListener('keydown', (event) => {
            if (event.keyCode == 40) {
                this.DOWN = true;
            }
            if (event.keyCode == 38) {
                this.UP = true;
            }
            if (event.keyCode == 37) {
                this.LEFT = true;
            }
            if (event.keyCode == 39) {
                this.RIGHT = true;
            }
            if (event.keyCode == 32) {
                this.SPACE = true;
            }
            if (event.keyCode == 68) {
                this.D = true;
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.keyCode == 40) {
                this.DOWN = false;
            }
            if (event.keyCode == 38) {
                this.UP = false;
            }
            if (event.keyCode == 37) {
                this.LEFT = false;
            }
            if (event.keyCode == 39) {
                this.RIGHT = false;
            }
            if (event.keyCode == 32) {
                this.SPACE = false;
            }
            if (event.keyCode == 68) {
                this.D = false;
            }
        });
    }

    attachButtonPressEvents() {
        ["touchstart", "mousedown"].forEach((event) => {
            document.getElementById('leftBtn').addEventListener(event, () => {
                this.LEFT = true;
            }, {passive: true});
        });


        ["touchend", "mouseup"].forEach((event) => {
            document.getElementById('leftBtn').addEventListener(event, () => {
                this.LEFT = false;
            }, {passive: true});
        });

        ["touchstart", "mousedown"].forEach((event) => {
            document.getElementById('rightBtn').addEventListener(event, () => {
                this.RIGHT = true;
            }, {passive: true});
        });

        ["touchend", "mouseup"].forEach((event) => {
            document.getElementById('rightBtn').addEventListener(event, () => {
                this.RIGHT = false;
            }, {passive: true});
        });

        ["touchstart", "mousedown"].forEach((event) => {
            document.getElementById('jumpBtn').addEventListener(event, () => {
                this.SPACE = true;
            }, {passive: true});
        });

        ["touchend", "mouseup"].forEach((event) => {
            document.getElementById('jumpBtn').addEventListener(event, () => {
                this.SPACE = false;
            }, {passive: true});
        });

        ["touchstart", "mousedown"].forEach((event) => {
            document.getElementById('throwBtn').addEventListener(event, () => {
                this.D = true;
            }, {passive: true});
        });

        ["touchend", "mouseup"].forEach((event) => {
            document.getElementById('throwBtn').addEventListener(event, () => {
                this.D = false;
            }, {passive: true});
        });

    }
}