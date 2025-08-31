class GameState {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.currentRound = 1;
        this.totalScore = 0;
        this.roundScores = [];
        this.currentLocation = null;
        this.guessLocation = null;
        this.timeRemaining = CONFIG.ROUND_TIME_SECONDS;
        this.timerInterval = null;
        this.gameActive = false;
    }
    
    startNewRound() {
        this.currentLocation = getRandomLocation();
        this.guessLocation = null;
        this.timeRemaining = CONFIG.ROUND_TIME_SECONDS;
        this.gameActive = true;
        this.updateRoundDisplay();
        this.updateScoreDisplay();
        this.startTimer();
        
        return this.currentLocation;
    }
    
    submitGuess(guessLat, guessLng) {
        if (!this.gameActive) return null;
        
        this.gameActive = false;
        this.stopTimer();
        
        this.guessLocation = { lat: guessLat, lng: guessLng };
        
        const distance = calculateDistance(
            this.currentLocation.lat,
            this.currentLocation.lng,
            guessLat,
            guessLng
        );
        
        const roundScore = calculateScore(distance);
        this.roundScores.push({
            round: this.currentRound,
            score: roundScore,
            distance: distance
        });
        
        this.totalScore += roundScore;
        
        return {
            distance: distance,
            score: roundScore,
            actualLocation: this.currentLocation,
            guessLocation: this.guessLocation
        };
    }
    
    nextRound() {
        this.currentRound++;
        return this.currentRound <= CONFIG.ROUNDS_PER_GAME;
    }
    
    isGameComplete() {
        return this.currentRound > CONFIG.ROUNDS_PER_GAME;
    }
    
    startTimer() {
        this.stopTimer(); 
        
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();
            
            if (this.timeRemaining <= 0) {
                this.handleTimeUp();
            }
        }, 1000);
        
        this.updateTimerDisplay();
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    handleTimeUp() {
        if (!this.gameActive) return;
        const randomLat = (Math.random() - 0.5) * 180;
        const randomLng = (Math.random() - 0.5) * 360;
        
        const result = this.submitGuess(randomLat, randomLng);
        if (result) {
            showRoundResult(result);
        }
    }
    
    updateTimerDisplay() {
        const timerElement = document.getElementById('timer');
        timerElement.textContent = formatTime(this.timeRemaining);

        if (this.timeRemaining <= 30) {
            timerElement.style.color = '#ff6b6b';
        } else {
            timerElement.style.color = 'white';
        }
    }
    
    updateRoundDisplay() {
        const roundCounter = document.getElementById('round-counter');
        roundCounter.textContent = `Round ${this.currentRound}/${CONFIG.ROUNDS_PER_GAME}`;
    }
    
    updateScoreDisplay() {
        const totalScoreElement = document.getElementById('total-score');
        totalScoreElement.textContent = `Score: ${this.totalScore.toLocaleString()}`;
    }
    
    getFinalResults() {
        return {
            totalScore: this.totalScore,
            roundScores: this.roundScores,
            maxPossibleScore: CONFIG.ROUNDS_PER_GAME * CONFIG.MAX_SCORE_PER_ROUND
        };
    }
}

let gameState = new GameState();