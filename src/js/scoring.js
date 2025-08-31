function calculateScore(distance) {
    const maxDistance = CONFIG.MAX_DISTANCE_KM;
    const maxScore = CONFIG.MAX_SCORE_PER_ROUND;
    
    if (distance >= maxDistance) {
        return 0;
    }
    
    const score = Math.round(maxScore * (1 - (distance / maxDistance)));
    return Math.max(0, score);
}

function getPerformanceRating(score) {
    const maxScore = CONFIG.MAX_SCORE_PER_ROUND;
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 90) {
        return { rating: 'Perfect!', emoji: '🎯', color: '#4ecdc4' };
    } else if (percentage >= 75) {
        return { rating: 'Excellent', emoji: '🌟', color: '#45b7d1' };
    } else if (percentage >= 60) {
        return { rating: 'Great', emoji: '👍', color: '#96ceb4' };
    } else if (percentage >= 40) {
        return { rating: 'Good', emoji: '👌', color: '#feca57' };
    } else if (percentage >= 20) {
        return { rating: 'Not bad', emoji: '🤔', color: '#ff9ff3' };
    } else {
        return { rating: 'Try again', emoji: '😅', color: '#ff6b6b' };
    }
}

function getFinalRating(totalScore) {
    const maxPossibleScore = CONFIG.ROUNDS_PER_GAME * CONFIG.MAX_SCORE_PER_ROUND;
    const percentage = (totalScore / maxPossibleScore) * 100;
    
    if (percentage >= 90) {
        return { 
            title: 'Geography Master!', 
            emoji: '🏆', 
            message: 'You have incredible geographical knowledge!' 
        };
    } else if (percentage >= 75) {
        return { 
            title: 'World Explorer', 
            emoji: '🌟', 
            message: 'Impressive! You know your way around the world.' 
        };
    } else if (percentage >= 60) {
        return { 
            title: 'Globe Trotter', 
            emoji: '✈️', 
            message: 'Great job! You have good geographical intuition.' 
        };
    } else if (percentage >= 40) {
        return { 
            title: 'Adventurer', 
            emoji: '🗺️', 
            message: 'Not bad! Keep exploring to improve your skills.' 
        };
    } else {
        return { 
            title: 'Wanderer', 
            emoji: '🧭', 
            message: 'Every expert was once a beginner. Keep practicing!' 
        };
    }
}