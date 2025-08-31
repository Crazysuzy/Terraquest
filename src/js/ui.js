function showRoundResult(result) {
    const modal = document.getElementById('round-result-modal');
    const distanceElement = document.getElementById('round-distance');
    const pointsElement = document.getElementById('round-points');
    
    distanceElement.textContent = formatDistance(result.distance);
    pointsElement.textContent = result.score.toLocaleString();
    mapsManager.initializeResultMap();
    
    setTimeout(() => {
        mapsManager.showRoundResult(result.actualLocation, result.guessLocation);
    }, 100);
    
    modal.classList.add('active');
    gameState.updateScoreDisplay();
}

function hideRoundResult() {
    const modal = document.getElementById('round-result-modal');
    modal.classList.remove('active');
}

function showFinalResults() {
    const results = gameState.getFinalResults();
    const finalScoreElement = document.getElementById('final-score');
    const breakdownElement = document.getElementById('round-breakdown');
    
    finalScoreElement.textContent = results.totalScore.toLocaleString();
    breakdownElement.innerHTML = '';
    results.roundScores.forEach((round, index) => {
        const roundItem = document.createElement('div');
        roundItem.className = 'round-item';
        
        const performance = getPerformanceRating(round.score);
        
        roundItem.innerHTML = `
            <span class="round-number">Round ${round.round}</span>
            <span class="round-details">${formatDistance(round.distance)} • ${performance.emoji}</span>
            <span class="round-score">${round.score.toLocaleString()}</span>
        `;
        
        breakdownElement.appendChild(roundItem);
    });
    
    transitionToScreen('game-screen', 'results-screen');
}

function initializeEventListeners() {
    document.getElementById('start-game-btn').addEventListener('click', () => {
        startNewGame();
    });
    
    document.getElementById('submit-guess-btn').addEventListener('click', () => {
        submitCurrentGuess();
    });
    
    document.getElementById('next-round-btn').addEventListener('click', () => {
        hideRoundResult();
        
        if (gameState.nextRound()) {
            startNewRound();
        } else {
            showFinalResults();
        }
    });
    
    document.getElementById('play-again-btn').addEventListener('click', () => {
        resetGame();
        transitionToScreen('results-screen', 'start-screen');
    });
}

function startNewGame() {
    gameState.reset();
    transitionToScreen('start-screen', 'game-screen');
    
    setTimeout(() => {
        startNewRound();
    }, 300);
}

function startNewRound() {
    mapsManager.resetGuessMap();
    
    const location = gameState.startNewRound();
    streetViewManager.loadLocation(location);
}

function submitCurrentGuess() {
    const guessLocation = mapsManager.getGuessLocation();
    
    if (!guessLocation) {
        alert('Please place a pin on the map first!');
        return;
    }
    
    const result = gameState.submitGuess(guessLocation.lat, guessLocation.lng);
    
    if (result) {
        showRoundResult(result);
    }
}

function resetGame() {
    gameState.reset();
    streetViewManager.reset();
    mapsManager.resetGuessMap();
}

function handleResize() {
    if (mapsManager.guessMap) {
        google.maps.event.trigger(mapsManager.guessMap, 'resize');
    }
    if (mapsManager.resultMap) {
        google.maps.event.trigger(mapsManager.resultMap, 'resize');
    }
}

window.addEventListener('resize', handleResize);