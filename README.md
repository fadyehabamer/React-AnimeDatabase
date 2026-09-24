# React Anime Database
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
- npm install
- npm start

### Scripts
| Command | What it does |
| --- | --- |
| `npm start` | Start the development server on http://localhost:3000 |
| `npm test` | Run the Jest + Testing Library tests (fetch is mocked, no network) |
| `npm run build` | Production build into `build/` |

Styles are written in `src/Assets/sass/main.scss` and compiled to
`src/Assets/css/main.css` outside the npm build (there is no `sass`
dependency), so recompile the CSS after editing the SCSS; the app imports
the `.css` file.
