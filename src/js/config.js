const CONFIG = {
    GOOGLE_MAPS_API_KEY: '{YOUR_CLOUD_CONSOLE_API_KEY}',
    ROUNDS_PER_GAME: 5,
    ROUND_TIME_SECONDS: 120, 
    MAX_SCORE_PER_ROUND: 5000,
    MAX_DISTANCE_KM: 10000, 
    LOCATIONS: [
        { lat: 40.7128, lng: -74.0060 }, // New York
        { lat: 51.5074, lng: -0.1278 },  // London
        { lat: 48.8566, lng: 2.3522 },   // Paris
        { lat: 35.6762, lng: 139.6503 }, // Tokyo
        { lat: -33.8688, lng: 151.2093 }, // Sydney
        { lat: 55.7558, lng: 37.6176 },  // Moscow
        { lat: 39.9042, lng: 116.4074 }, // Beijing
        { lat: 19.4326, lng: -99.1332 }, // Mexico City
        { lat: -23.5505, lng: -46.6333 }, // São Paulo
        { lat: 28.6139, lng: 77.2090 },  // New Delhi
        { lat: 46.8182, lng: 8.2275 },   // Switzerland
        { lat: 64.1466, lng: -21.9426 }, // Iceland
        { lat: -26.2041, lng: 28.0473 }, // South Africa
        { lat: 37.0902, lng: -95.7129 }, // Kansas, USA
        { lat: 61.2181, lng: -149.9003 }, // Alaska
        { lat: 25.2048, lng: 55.2708 },  // Dubai
        { lat: -34.6037, lng: -58.3816 }, // Buenos Aires
        { lat: 13.7563, lng: 100.5018 }, // Bangkok
        { lat: 1.3521, lng: 103.8198 },  // Singapore
        { lat: 59.9139, lng: 10.7522 },  // Oslo
        { lat: 41.9028, lng: 12.4964 },  // Rome
        { lat: 52.3676, lng: 4.9041 },   // Amsterdam
        { lat: 40.4168, lng: -3.7038 },  // Madrid
        { lat: 35.6895, lng: 139.6917 }, // Tokyo (alt)
        { lat: -1.2921, lng: 36.8219 },  // Nairobi
        { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro
        { lat: 31.2304, lng: 121.4737 }, // Shanghai
        { lat: 43.6532, lng: -79.3832 }, // Toronto
        { lat: 45.4642, lng: 9.1900 },   // Milan
        { lat: 41.0082, lng: 28.9784 },  // Istanbul
        { lat: 59.3293, lng: 18.0686 },  // Stockholm
        { lat: 60.1699, lng: 24.9384 },  // Helsinki
        { lat: 35.9078, lng: 127.7669 }, // South Korea
        { lat: 56.1304, lng: -106.3468 }, // Canada
        { lat: 21.0278, lng: 105.8342 }, // Hanoi
        { lat: 14.5995, lng: 120.9842 }, // Manila
        { lat: -36.8485, lng: 174.7633 }, // Auckland
        { lat: -41.2865, lng: 174.7762 }, // Wellington
        { lat: 25.7617, lng: -80.1918 }, // Miami
        { lat: 34.0522, lng: -118.2437 }, // Los Angeles
        { lat: 37.7749, lng: -122.4194 }, // San Francisco
        { lat: 52.5200, lng: 13.4050 },  // Berlin
        { lat: 50.1109, lng: 8.6821 },   // Frankfurt
        { lat: 30.0444, lng: 31.2357 },  // Cairo
        { lat: 33.6844, lng: 73.0479 },  // Islamabad
        { lat: -4.4419, lng: 15.2663 },  // Kinshasa
        { lat: -25.7461, lng: 28.1881 }, // Pretoria
        { lat: 64.9631, lng: -19.0208 }, // Iceland rural
        { lat: 66.9399, lng: -53.6740 }, // Greenland
        { lat: -54.8019, lng: -68.3030 }, // Ushuaia, Argentina
        { lat: 17.3850, lng: 78.4867 },  // Hyderabad
        { lat: 12.9716, lng: 77.5946 },  // Bangalore
        { lat: 22.5726, lng: 88.3639 },  // Kolkata
        { lat: 18.5204, lng: 73.8567 },  // Pune
        { lat: 31.5497, lng: 74.3436 },  // Lahore
        { lat: 24.7136, lng: 46.6753 },  // Riyadh
        { lat: 35.6892, lng: 51.3890 },  // Tehran
        { lat: 33.8938, lng: 35.5018 },  // Beirut
        { lat: 32.0853, lng: 34.7818 },  // Tel Aviv
        { lat: 41.7151, lng: 44.8271 },  // Tbilisi
        { lat: 59.4370, lng: 24.7536 },  // Tallinn
        { lat: 54.6872, lng: 25.2797 },  // Vilnius
        { lat: 53.3498, lng: -6.2603 },  // Dublin
        { lat: 47.4979, lng: 19.0402 },  // Budapest
        { lat: 50.0755, lng: 14.4378 },  // Prague
        { lat: 44.4268, lng: 26.1025 },  // Bucharest
        { lat: 45.8150, lng: 15.9785 },  // Zagreb
        { lat: 42.6977, lng: 23.3219 },  // Sofia
        { lat: 38.7223, lng: -9.1393 },  // Lisbon
        { lat: 35.8997, lng: 14.5146 },  // Valletta
        { lat: 64.1355, lng: -21.8954 }, // Reykjavik
        { lat: 68.9585, lng: 33.0827 },  // Murmansk
        { lat: 69.6496, lng: 18.9560 },  // Tromsø
        { lat: 62.4722, lng: 6.1549 },   // Ålesund
        { lat: 65.0121, lng: 25.4651 },  // Oulu
        { lat: 24.5551, lng: -81.7800 }, // Key West
        { lat: 21.1619, lng: -86.8515 }, // Cancun
        { lat: 20.6597, lng: -103.3496 }, // Guadalajara
        { lat: -12.0464, lng: -77.0428 }, // Lima
        { lat: -16.5000, lng: -68.1500 }, // La Paz
        { lat: -33.4489, lng: -70.6693 }, // Santiago
        { lat: -9.1899, lng: -75.0152 }, // Peru Andes
        { lat: 8.9824, lng: -79.5199 },  // Panama City
        { lat: 4.7110, lng: -74.0721 },  // Bogotá
        { lat: 10.4806, lng: -66.9036 }, // Caracas
        { lat: 18.1096, lng: -77.2975 }, // Jamaica
        { lat: 17.9712, lng: -76.7920 }, // Kingston
        { lat: 13.1939, lng: -59.5432 }, // Barbados
        { lat: -17.7134, lng: 178.0650 }, // Fiji
        { lat: -13.1631, lng: -72.5450 }, // Machu Picchu
        { lat: 27.1751, lng: 78.0421 },  // Taj Mahal
        { lat: 29.9792, lng: 31.1342 },  // Giza Pyramids
        { lat: 43.7699, lng: 11.2556 },  // Florence
        { lat: 48.2082, lng: 16.3738 },  // Vienna
        { lat: 46.0569, lng: 14.5058 },  // Ljubljana
        { lat: 37.9838, lng: 23.7275 },  // Athens
        { lat: 36.1640, lng: -5.3496 },  // Gibraltar
        { lat: 19.8968, lng: -155.5828 }, // Hawaii
        { lat: 64.2008, lng: -149.4937 }, // Interior Alaska
        { lat: 35.0116, lng: 135.7681 }, // Kyoto
    ]
};
