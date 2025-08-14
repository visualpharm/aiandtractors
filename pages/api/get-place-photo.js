import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Google Places API key provided by the user
const API_KEY = 'AIzaSyApWB31P9OccXFXHH0nak_iRBsK2FMrsds';
const PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { placeName, location } = req.query;

  if (!placeName || !location) {
    return res.status(400).json({ error: 'Missing placeName or location parameter' });
  }

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
      return res.status(404).json({ error: `No results found for ${placeName}` });
    }

    const place = candidates[0];

    // Step 2: Get the photo reference if available
    if (place.photos && place.photos.length > 0) {
      const photoReference = place.photos[0].photo_reference;
      const photoResponse = await axios.get(`${PLACES_API_URL}/photo`, {
        params: {
          photoreference: photoReference,
          maxwidth: 400,
          key: API_KEY
        },
        responseType: 'arraybuffer'
      });

      // Step 3: Save the photo to the public directory
      const photoPath = path.join(process.cwd(), 'public', 'places', `${placeName.replace(/\s+/g, '_')}.jpg`);
      fs.mkdirSync(path.dirname(photoPath), { recursive: true });
      fs.writeFileSync(photoPath, photoResponse.data);

      // Return the relative path for client-side use
      const relativePath = `/places/${placeName.replace(/\s+/g, '_')}.jpg`;
      return res.status(200).json({ photoPath: relativePath, placeName: place.name });
    } else {
      return res.status(404).json({ error: `No photos available for ${placeName}` });
    }
  } catch (error) {
    console.error('Error downloading photo:', error.message);
    return res.status(500).json({ error: 'Failed to download photo', details: error.message });
  }
}
