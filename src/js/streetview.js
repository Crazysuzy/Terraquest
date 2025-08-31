class StreetViewManager {
    constructor() {
        this.panorama = null;
        this.service = null;
    }
    
    initialize() {
        const streetViewElement = document.getElementById('street-view');
        
        this.panorama = new google.maps.StreetViewPanorama(streetViewElement, {
            position: { lat: 0, lng: 0 },
            pov: { heading: 0, pitch: 0 },
            zoom: 1,
            addressControl: false,
            linksControl: true,
            panControl: true,
            enableCloseButton: false,
            fullscreenControl: false,
            motionTracking: false,
            motionTrackingControl: false,
            showRoadLabels: false
        });
        
        this.service = new google.maps.StreetViewService();
        
        this.panorama.addListener('pov_changed', () => {
            this.updateCompass();
        });
    }
    
    loadLocation(location) {
        return new Promise((resolve, reject) => {
            showLoading();
            
            this.service.getPanorama({
                location: location,
                radius: 50000,
                source: google.maps.StreetViewSource.OUTDOOR
            }, (data, status) => {
                hideLoading();
                
                if (status === 'OK' && data) {
                    const position = data.location.latLng;
                    
                    this.panorama.setPosition(position);
                    this.panorama.setPov({
                        heading: Math.random() * 360,
                        pitch: 0
                    });
                    
                    gameState.currentLocation = {
                        lat: position.lat(),
                        lng: position.lng()
                    };
                    
                    resolve(gameState.currentLocation);
                } else {
                    console.warn('No street view found for location, trying another...');
                    const newLocation = getRandomLocation();
                    this.loadLocation(newLocation).then(resolve).catch(reject);
                }
            });
        });
    }
    
    updateCompass() {
        const pov = this.panorama.getPov();
        const needle = document.getElementById('compass-needle');
        
        if (needle && pov) {
            needle.style.transform = `rotate(${pov.heading}deg)`;
        }
    }
    
    reset() {
        if (this.panorama) {
            this.panorama.setPosition({ lat: 0, lng: 0 });
        }
    }
}

let streetViewManager = new StreetViewManager();