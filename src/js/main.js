function initGame() {
    try {
        streetViewManager.initialize();
        mapsManager.initializeGuessMap();
        initializeEventListeners();
        
        console.log('TerraQuest initialized successfully!');
    } catch (error) {
        console.error('Failed to initialize TerraQuest:', error);
        alert('Failed to load the game. Please refresh the page and try again.');
    }
}

window.initGame = initGame;

document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    startScreen.classList.add('active');
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden && gameState.gameActive) {
        gameState.stopTimer();
    } else if (!document.hidden && gameState.gameActive) {
        gameState.startTimer();
    }
});

window.addEventListener('beforeunload', (event) => {
    if (gameState.gameActive && gameState.currentRound > 1) {
        event.preventDefault();
        event.returnValue = 'You have a game in progress. Are you sure you want to leave?';
        return event.returnValue;
    }
});