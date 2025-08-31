class MapsManager {
    constructor() {
        this.guessMap = null;
        this.resultMap = null;
        this.guessMarker = null;
        this.actualMarker = null;
        this.guessResultMarker = null;
    }
    
    initializeGuessMap() {
        const mapElement = document.getElementById('guess-map');
        
        this.guessMap = new google.maps.Map(mapElement, {
            zoom: 2,
            center: { lat: 20, lng: 0 },
            mapTypeId: 'roadmap',
            disableDefaultUI: true,
            zoomControl: true,
            styles: [
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{ color: '#193341' }]
                },
                {
                    featureType: 'landscape',
                    elementType: 'geometry',
                    stylers: [{ color: '#2c5234' }]
                }
            ]
        });
        
        this.guessMap.addListener('click', (event) => {
            this.placeGuessMarker(event.latLng);
        });
    }
    
    initializeResultMap() {
        const mapElement = document.getElementById('result-map');
        
        this.resultMap = new google.maps.Map(mapElement, {
            zoom: 2,
            center: { lat: 20, lng: 0 },
            mapTypeId: 'roadmap',
            disableDefaultUI: true,
            zoomControl: true
        });
    }
    
    placeGuessMarker(latLng) {
        if (this.guessMarker) {
            this.guessMarker.setMap(null);
        }
        
        this.guessMarker = new google.maps.Marker({
            position: latLng,
            map: this.guessMap,
            title: 'Your Guess',
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="12" fill="#4ecdc4" stroke="white" stroke-width="3"/>
                        <circle cx="16" cy="16" r="4" fill="white"/>
                    </svg>
                `),
                scaledSize: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(16, 16)
            },
            draggable: true
        });
        
        const submitBtn = document.getElementById('submit-guess-btn');
        submitBtn.disabled = false;
        
        this.guessMarker.addListener('dragend', () => {
        });
    }
    
    showRoundResult(actualLocation, guessLocation) {
        if (this.actualMarker) this.actualMarker.setMap(null);
        if (this.guessResultMarker) this.guessResultMarker.setMap(null);
        
        this.actualMarker = new google.maps.Marker({
            position: actualLocation,
            map: this.resultMap,
            title: 'Actual Location',
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="12" fill="#ff6b6b" stroke="white" stroke-width="3"/>
                        <circle cx="16" cy="16" r="4" fill="white"/>
                    </svg>
                `),
                scaledSize: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(16, 16)
            }
        });
        
        this.guessResultMarker = new google.maps.Marker({
            position: guessLocation,
            map: this.resultMap,
            title: 'Your Guess',
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="12" fill="#4ecdc4" stroke="white" stroke-width="3"/>
                        <circle cx="16" cy="16" r="4" fill="white"/>
                    </svg>
                `),
                scaledSize: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(16, 16)
            }
        });
        
        const line = new google.maps.Polyline({
            path: [actualLocation, guessLocation],
            geodesic: true,
            strokeColor: '#ff6b6b',
            strokeOpacity: 0.8,
            strokeWeight: 3,
            map: this.resultMap
        });
        
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(actualLocation);
        bounds.extend(guessLocation);
        this.resultMap.fitBounds(bounds);
        
        const listener = google.maps.event.addListener(this.resultMap, 'bounds_changed', () => {
            if (this.resultMap.getZoom() > 10) {
                this.resultMap.setZoom(10);
            }
            google.maps.event.removeListener(listener);
        });
    }
    
    resetGuessMap() {
        if (this.guessMarker) {
            this.guessMarker.setMap(null);
            this.guessMarker = null;
        }
        
        this.guessMap.setCenter({ lat: 20, lng: 0 });
        this.guessMap.setZoom(2);
        
        const submitBtn = document.getElementById('submit-guess-btn');
        submitBtn.disabled = true;
    }
    
    getGuessLocation() {
        if (this.guessMarker) {
            const position = this.guessMarker.getPosition();
            return {
                lat: position.lat(),
                lng: position.lng()
            };
        }
        return null;
    }
}

let mapsManager = new MapsManager();