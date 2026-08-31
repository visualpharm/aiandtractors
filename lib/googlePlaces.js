const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Google Places API key from environment variable (server-only, not NEXT_PUBLIC_)
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Base URL for Google Places API
const PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place';

// Validate and sanitize placeName to prevent path traversal
function sanitizePlaceName(name) {
  if (!name || typeof name !== 'string') {
    throw new Error('Invalid placeName');
  }
  // Remove any path separators and parent directory references
  const sanitized = name.replace(/[\/\\]/g, '').replace(/\.\./g, '');
  // Allow only alphanumeric, spaces, hyphens, underscores, and common punctuation
  if (!/^[A-Za-z0-9\s\-_,.']+$/.test(sanitized)) {
    throw new Error('Invalid characters in placeName');
  }
  return sanitized.trim();
}

// Function to search for a place and get its photo
async function downloadPlacePhoto(placeName, location) {
  if (!API_KEY) {
    throw new Error('GOOGLE_PLACES_API_KEY environment variable must be set');
  }

  try {
    // Sanitize placeName to prevent path traversal
    const sanitizedPlaceName = sanitizePlaceName(placeName);

    // Step 1: Search for the place
    const searchResponse = await axios.get(`${PLACES_API_URL}/findplacefromtext/json`, {
      params: {
        input: `${sanitizedPlaceName} ${location}`,
        inputtype: 'textquery',
        fields: 'place_id,name,photos',
        key: API_KEY
      }
    });

    const candidates = searchResponse.data.candidates;
    if (candidates.length === 0) {
      console.log('No results found for', sanitizedPlaceName);
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

      // Step 3: Save the photo to the public directory (using sanitized name)
      const photoPath = path.join('public', 'places', `${sanitizedPlaceName.replace(/\s+/g, '_')}.jpg`);
      fs.mkdirSync(path.dirname(photoPath), { recursive: true });
      fs.writeFileSync(photoPath, photoResponse.data);
      console.log('Photo saved to', photoPath);
      return photoPath;
    } else {
      console.log('No photos available for', sanitizedPlaceName);
      return null;
    }
  } catch (error) {
    console.error('Error downloading photo:', error.message);
    throw error;
  }
}

module.exports = { downloadPlacePhoto };
