import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RestaurantesCarilo() {
  const [photoPath, setPhotoPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPhoto() {
      try {
        setLoading(true);
        const response = await axios.get('/api/get-place-photo', {
          params: {
            placeName: 'PEPPE NAPOLI',
            location: 'Carilo'
          }
        });
        
        if (response.data.photoPath) {
          setPhotoPath(response.data.photoPath);
        } else {
          setError('No photo found for PEPPE NAPOLI in Carilo.');
        }
      } catch (err) {
        setError('Failed to download photo: ' + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPhoto();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Restaurantes en Carilo</h1>
      <h2>PEPPE NAPOLI</h2>
      {loading && <p>Loading photo...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {photoPath && (
        <div>
          <p>Photo downloaded successfully!</p>
          <img src={photoPath} alt="PEPPE NAPOLI in Carilo" style={{ maxWidth: '400px' }} />
        </div>
      )}
    </div>
  );
}
