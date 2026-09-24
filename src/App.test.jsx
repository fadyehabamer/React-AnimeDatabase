import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const anime = (id, title) => ({
  mal_id: id,
  title,
  rank: id,
  url: `https://myanimelist.net/anime/${id}`,
  images: { jpg: { image_url: `https://cdn.example/${id}.jpg` } },
});
const ok = (data) => Promise.resolve({ ok: true, status: 200, json: async () => ({ data }) });
const fail = (status) => Promise.resolve({ ok: false, status, json: async () => ({}) });

afterEach(() => vi.restoreAllMocks());

const searchFor = (text) => {
  const input = screen.getByLabelText('Search anime');
  fireEvent.change(input, { target: { value: text } });
  fireEvent.submit(input.closest('form'));
};

test('shows the top anime in the sidebar', async () => {
  global.fetch = vi.fn(() => ok([anime(1, 'Frieren'), anime(2, 'Steins;Gate')]));
  render(<App />);
  expect(await screen.findByText('1 - Frieren')).toBeInTheDocument();
});

test('searching renders result cards once', async () => {
  global.fetch = vi.fn((url) =>
    url.includes('/top/anime') ? ok([]) : ok([anime(20, 'Naruto')])
  );
  render(<App />);
  expect(screen.getByText('No Content Yet')).toBeInTheDocument();

  searchFor('naruto');
  expect(await screen.findByAltText('Naruto poster')).toBeInTheDocument();
  const searchCalls = global.fetch.mock.calls.filter(([url]) => url.includes('/anime?q='));
  expect(searchCalls).toHaveLength(1);
});

test('shows an error instead of crashing when the API rate-limits', async () => {
  global.fetch = vi.fn(() => fail(429));
  vi.spyOn(console, 'error').mockImplementation(() => {});
  render(<App />);

  searchFor('naruto');
  expect(await screen.findByRole('alert')).toHaveTextContent(/too many requests/i);
});

test('shows "No Results Found" only after a search returns nothing', async () => {
  global.fetch = vi.fn(() => ok([]));
  render(<App />);
  fireEvent.change(screen.getByLabelText('Search anime'), { target: { value: 'zzz' } });
  expect(screen.queryByText('No Results Found')).not.toBeInTheDocument();

  searchFor('zzz');
  expect(await screen.findByText('No Results Found')).toBeInTheDocument();
});
