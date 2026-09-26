# React Anime Database

[![CI](https://github.com/fadyehabamer/React-AnimeDatabase/actions/workflows/ci.yml/badge.svg)](https://github.com/fadyehabamer/React-AnimeDatabase/actions/workflows/ci.yml)

> お気に入りのアニメに関する情報を探す

**Live demo:** https://react-anime-databse.vercel.app

Browse the current top 10 anime and search the MyAnimeList catalogue.
Data comes from the free [Jikan v4 API](https://docs.api.jikan.moe/)
(no key needed). Jikan rate-limits requests (about 3 per second / 60 per
minute); when it does, the app shows a "too many requests" message instead
of results.

### Features : 
- View Top Watched Animes
- Search For your favourite anime

### Install
Requires Node.js 22.13 or newer.
- npm install
- npm run dev

### Scripts
| Command | What it does |
| --- | --- |
| `npm run dev` / `npm start` | Start the Vite development server on http://localhost:3000 |
| `npm test` | Run the Vitest + Testing Library tests in watch mode (fetch is mocked, no network); `npm test -- --run` runs them once |
| `npm run lint` | Lint with ESLint (`eslint.config.js`) |
| `npm run build` | Production build into `build/` |
| `npm run preview` | Serve the production build locally |

Styles live in `src/Assets/sass/main.scss`. The app imports the SCSS file
directly and Vite compiles it with `sass` (a devDependency) in both the dev
server and `npm run build`; there is no separately generated CSS file.

Built with React 18 and [Vite](https://vite.dev); deployed on Vercel, where
`vercel.json` selects the Vite preset and the `build/` output folder.
