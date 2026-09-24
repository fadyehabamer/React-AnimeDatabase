import { fetchTopAnime, searchAnime, JIKAN_BASE_URL } from './jikan';

const jsonResponse = (body, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => body,
});

afterEach(() => jest.restoreAllMocks());

test('searchAnime URL-encodes the trimmed query with no stray characters', async () => {
  global.fetch = jest.fn().mockResolvedValue(jsonResponse({ data: [] }));
  await searchAnime('  fullmetal & alchemist ');
  expect(global.fetch).toHaveBeenCalledWith(
    `${JIKAN_BASE_URL}/anime?q=fullmetal%20%26%20alchemist`,
    expect.any(Object)
  );
});

test('returns the data array from a successful response', async () => {
  global.fetch = jest.fn().mockResolvedValue(jsonResponse({ data: [{ mal_id: 1 }] }));
  await expect(fetchTopAnime()).resolves.toEqual([{ mal_id: 1 }]);
});

test('returns an empty array when the body has no data field', async () => {
  global.fetch = jest.fn().mockResolvedValue(jsonResponse({}));
  await expect(searchAnime('x')).resolves.toEqual([]);
});

test('throws a friendly error on rate limiting (429)', async () => {
  global.fetch = jest.fn().mockResolvedValue(
    jsonResponse({ status: '429', type: 'RateLimitException' }, 429)
  );
  await expect(searchAnime('naruto')).rejects.toMatchObject({
    status: 429,
    message: expect.stringMatching(/too many requests/i),
  });
});

test('throws on server errors', async () => {
  global.fetch = jest.fn().mockResolvedValue(jsonResponse({}, 504));
  await expect(fetchTopAnime()).rejects.toMatchObject({ status: 504 });
});
