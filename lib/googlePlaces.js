const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Google Places API key provided by the user
const API_KEY = 'AIzaSyApWB31P9OccXFXHH0nak_iRBsK2FMrsds';

// Base URL for Google Places API
const PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place';

// Function to search for a place and get its photo
async function downloadPlacePhoto(placeName, location) {
  try {
    // Step 1: Search for the place
    const searchResponse = await axios.get(`${PLACES_API_URL}/findplacefromtext/json`, {
      params: {
        input: `${placeName} ${location}`,
        inputtype: 'textquery',
        fields: 'place_id,name,photos',
        key: API_KEY
      }
    });

    const candidates = searchResponse.data.candidates;
    if (candidates.length === 0) {
      console.log('No results found for', placeName);
      return null;
    }

    const place = candidates[0];
    console.log('Found place:', place.name);

    // Step 2: Get the photo reference if available
    if (place.photos && place.photos.length > 0) {
      const photoReference = place.photos[0].photo_reference;
      const photoResponse = await axios.get(`${PLACES_API_URL}/photo`, {
        params: {
          photoreference: photoReference,
          maxwidth: 400, // Adjust as needed
          key: API_KEY
        },
        responseType: 'arraybuffer'
      });

      // Step 3: Save the photo to the public directory
      const photoPath = path.join('public', 'places', `${placeName.replace(/\s+/g, '_')}.jpg`);
      fs.mkdirSync(path.dirname(photoPath), { recursive: true });
      fs.writeFileSync(photoPath, photoResponse.data);
      console.log('Photo saved to', photoPath);
      return photoPath;
    } else {
      console.log('No photos available for', placeName);
      return null;
    }
  } catch (error) {
    console.error('Error downloading photo:', error.message);
    return null;
  }
}

module.exports = { downloadPlacePhoto };
