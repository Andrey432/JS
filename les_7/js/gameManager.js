const gameManager = {
    gameStatus: null,
    scoreLabel: null,
    gameSpeedLabel: null,
    firstButton: null,
    secondButton: null,

    init(elements) {
        this.scoreLabel = document.querySelector('.' + elements.scoreLabelClass);
        this.gameSpeedLabel = document.querySelector('.' + elements.speedLabelClass);
        this.firstButton = document.getElementById(elements.firstButtonId);
        this.secondButton = document.getElementById(elements.secondButtonId);
        this.resetButtons();
        this.initEventHandlers();
    },

    resetButtons() {
        this.firstButton.innerText = 'Начать игру';
        this.secondButton.classList.toggle('unvisible');
    },

    initEventHandlers() {
        this.firstButton.addEventListener('click', () => this.handleButtonClick(this.firstButton));
        this.secondButton.addEventListener('click', () => this.handleButtonClick(this.secondButton));
    },

    getGameStatus() {
        return this.gameStatus;
    },

    startGame() {
        if (this.gameStatus !== 'paused')
            this.secondButton.classList.toggle('unvisible');
        this.gameStatus = 'run';
        this.firstButton.innerText = 'Пауза';
        this.secondButton.innerText = 'Заново';
    },

    pauseGame() {
        this.gameStatus = 'paused';
        this.firstButton.innerText = 'Продолжить';
        this.secondButton.innerText = 'Завершить';
    },

    finishGame() {
        this.gameStatus = 'finished';
    },

    resetGame() {
        this.gameStatus = 'reset';
    },

    resetGameInfo() {
        this.scoreLabel.innerText = '';
        this.gameSpeedLabel.innerText = '';
    },

    resetState() {
        this.gameStatus = null;
        this.resetGameInfo();
        this.resetButtons();
    },

    handleButtonClick(button) {
        switch (button.innerText) {
            case "Начать игру":
                this.startGame();
                break;
            case "Пауза":
                this.pauseGame();
                break;
            case "Заново":
                this.resetGame();
                break;
            case "Продолжить":
                this.startGame();
                break;
            case "Завершить":
                this.finishGame();
                break;
        }
    },

    update(score, speed) {
        this.scoreLabel.innerText = `Счёт: ${score}`;
        this.gameSpeedLabel.innerText = `Скорость: ${speed}`;
    }
}