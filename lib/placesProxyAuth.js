import crypto from 'crypto';

// Shared secret guarding the Places proxy API routes (paid Google quota).
// Server-side only; supply PLACES_PROXY_SECRET in the deployment environment
// (Vercel project env vars) or .env.local for local development.
const PROXY_SECRET = process.env.PLACES_PROXY_SECRET;

if (!PROXY_SECRET) {
  console.error(
    'PLACES_PROXY_SECRET is not set: /api/get-place-photo and /api/download-photo reject all requests (fail closed)'
  );
}

function isAuthorized(req) {
  if (!PROXY_SECRET) return false; // fail closed when unconfigured
  const provided = req.headers['x-places-secret'];
  if (typeof provided !== 'string' || provided.length !== PROXY_SECRET.length) {
    return false;
  }
  return crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(PROXY_SECRET));
}

export default isAuthorized;
