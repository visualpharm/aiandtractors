import axios from 'axios';
import fs from 'fs';
import path from 'path';
import isAuthorized from '../../lib/placesProxyAuth';

// Google Places API key from environment variable (server-only, not NEXT_PUBLIC_)
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
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

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Reject callers without the shared proxy secret (protects paid Google quota)
  if (!isAuthorized(req)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Fail closed if API key is not configured
  if (!API_KEY) {
    console.error('GOOGLE_PLACES_API_KEY not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const { placeName, location } = req.query;

  if (!placeName || !location) {
    return res.status(400).json({ error: 'Missing placeName or location parameter' });
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
      return res.status(404).json({ error: `No results found for ${sanitizedPlaceName}` });
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

      // Step 3: Save the photo to the public directory (using sanitized name)
      const photoPath = path.join(process.cwd(), 'public', 'places', `${sanitizedPlaceName.replace(/\s+/g, '_')}.jpg`);
      fs.mkdirSync(path.dirname(photoPath), { recursive: true });
      fs.writeFileSync(photoPath, photoResponse.data);

      // Return the relative path for client-side use
      const relativePath = `/places/${sanitizedPlaceName.replace(/\s+/g, '_')}.jpg`;
      return res.status(200).json({ photoPath: relativePath, placeName: place.name });
    } else {
      return res.status(404).json({ error: `No photos available for ${sanitizedPlaceName}` });
    }
  } catch (error) {
    // Don't leak error details to client; log server-side only
    console.error('Error downloading photo:', error.message);
    return res.status(500).json({ error: 'Failed to download photo' });
  }
}
