

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
            document.getElementById('leftBtn').addEventListener(event, (e) => {
                e.preventDefault();
                this.LEFT = true;
            });
        });


        ["touchend", "mouseup"].forEach((event) => {
            document.getElementById('leftBtn').addEventListener(event, (e) => {
                e.preventDefault();
                this.LEFT = false;
            });
        });

        ["touchstart", "mousedown"].forEach((event) => {
            document.getElementById('rightBtn').addEventListener(event, (e) => {
                e.preventDefault();
                this.RIGHT = true;
            });
        });

        ["touchend", "mouseup"].forEach((event) => {
            document.getElementById('rightBtn').addEventListener(event, (e) => {
                e.preventDefault();
                this.RIGHT = false;
            });
        });

        ["touchstart", "mousedown"].forEach((event) => {
            document.getElementById('jumpBtn').addEventListener(event, (e) => {
                e.preventDefault();
                this.SPACE = true;
            });
        });

        ["touchend", "mouseup"].forEach((event) => {
            document.getElementById('jumpBtn').addEventListener(event, (e) => {
                e.preventDefault();
                this.SPACE = false;
            });
        });

        ["touchstart", "mousedown"].forEach((event) => {
            document.getElementById('throwBtn').addEventListener(event, (e) => {
                e.preventDefault();
                this.D = true;
            });
        });

        ["touchend", "mouseup"].forEach((event) => {
            document.getElementById('throwBtn').addEventListener(event, (e) => {
                e.preventDefault();
                this.D = false;
            });
        });

    }
}