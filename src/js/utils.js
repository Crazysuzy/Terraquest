function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function getRandomLocation() {
    const locations = CONFIG.LOCATIONS;
    const randomIndex = Math.floor(Math.random() * locations.length);
    return locations[randomIndex];
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function formatDistance(distance) {
    if (distance < 1) {
        return `${Math.round(distance * 1000)} m`;
    } else if (distance < 100) {
        return `${distance.toFixed(1)} km`;
    } else {
        return `${Math.round(distance)} km`;
    }
}

function transitionToScreen(fromScreenId, toScreenId) {
    const fromScreen = document.getElementById(fromScreenId);
    const toScreen = document.getElementById(toScreenId);
    
    fromScreen.classList.remove('active');
    
    setTimeout(() => {
        toScreen.classList.add('active');
    }, 150);
}

function showLoading() {
    const overlay = document.getElementById('loading-overlay');
    overlay.classList.add('active');
}

function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    overlay.classList.remove('active');
}