const gameManager = {
    gameStatus: null,
    scoreLabel: null,
    gameSpeedLabel: null,
    firstButton: null,
    secondButton: null,

    init(elements) {
        this.timeLabel = document.querySelector('.' + elements.timeLabelClass);
        this.scoreLabel = document.querySelector('.' + elements.scoreLabelClass);
        this.maxScoreLable = document.querySelector('.' + elements.maxScoreLabelClass);
        this.gameSpeedLabel = document.querySelector('.' + elements.speedLabelClass);
        this.firstButton = document.getElementById(elements.firstButtonId);
        this.secondButton = document.getElementById(elements.secondButtonId);
        this.resetButtons();
        this.initEventHandlers();
    },

    // Начальное состояние кнопок
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
        this.firstButton.innerText = 'Снять с паузы';
        this.secondButton.innerText = 'Завершить';
    },

    finishGame() {
        this.gameStatus = 'finished';
    },

    gameOver() {
        this.gameStatus = 'gameover';
    },

    resetGame() {
        this.gameStatus = 'reset';
    },

    // Сброс статистики
    resetGameInfo() {
        this.scoreLabel.innerText = '';
        this.gameSpeedLabel.innerText = '';
    },

    // Устанавливает начальное состояние игры
    resetState() {
        this.gameStatus = null;
        this.resetGameInfo();
        this.resetButtons();
    },

    // Обработчик нажатий кнопки (1 на обе)
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
            case "Снять с паузы":
                this.startGame();
                break;
            case "Завершить":
                this.finishGame();
                break;
        }
    },

    // Обновление статистики
    update(score, speed, time) {
        this.timeLabel.innerText = `Время: ${Math.floor(time / 1000)}`;
        this.scoreLabel.innerText = `Счёт: ${score}`;
        this.gameSpeedLabel.innerText = `Скорость: ${speed}`;

        let currentMax = Number(this.maxScoreLable.dataset.record);
        currentMax = Math.max(currentMax, score);
        this.maxScoreLable.dataset.record = currentMax;
        this.maxScoreLable.innerText = `Рекорд: ${currentMax}`;
    }
}
