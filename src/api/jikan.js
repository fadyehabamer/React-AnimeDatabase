// Jikan v4 (https://docs.api.jikan.moe/) — unofficial MyAnimeList API.
// It rate-limits aggressively (HTTP 429 with no `data` field), so every
// response is checked before use.
export const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

async function getList(path, signal) {
  const response = await fetch(`${JIKAN_BASE_URL}${path}`, { signal });
  if (!response.ok) {
    const error = new Error(
      response.status === 429
        ? 'Too many requests to the anime API. Please wait a moment and try again.'
        : `The anime API responded with ${response.status}.`
    );
    error.status = response.status;
    throw error;
  }
  const body = await response.json();
  return Array.isArray(body.data) ? body.data : [];
}

export const fetchTopAnime = (signal) => getList('/top/anime', signal);

export const searchAnime = (query, signal) =>
  getList(`/anime?q=${encodeURIComponent(query.trim())}`, signal);
