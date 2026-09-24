import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { useState, useEffect, useRef } from 'react';
import { fetchTopAnime, searchAnime } from './api/jikan';


function App() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState('');
  // 'idle' until the first search, then 'loading' | 'done' | 'error'
  const [searchStatus, setSearchStatus] = useState('idle');
  const [searchError, setSearchError] = useState('');
  const searchController = useRef(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = search.trim();
    if (!query) return;

    // Cancel a still-running search so an older, slower response cannot
    // overwrite the results of the newest one.
    searchController.current?.abort();
    const controller = new AbortController();
    searchController.current = controller;

    setSearchStatus('loading');
    setSearchError('');
    try {
      const results = await searchAnime(query, controller.signal);
      setAnimeList(results);
      setSearchStatus('done');
    } catch (err) {
      if (err.name === 'AbortError') return;
      setAnimeList([]);
      setSearchError(err.message || 'Something went wrong while searching.');
      setSearchStatus('error');
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchTopAnime(controller.signal)
      .then((list) => setTopAnime(list.slice(0, 10)))
      .catch((err) => {
        if (err.name !== 'AbortError') console.error('Failed to load top anime:', err);
      });
    return () => controller.abort();
  }, [])

  useEffect(() => () => searchController.current?.abort(), [])

  return (
    <>
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="App">
        <Header />
        <div className="content-wrap">
          <Sidebar topAnime={topAnime} />
          <MainContent handleSearch={handleSearch} search={search} setSearch={setSearch} animeList={animeList} searchStatus={searchStatus} searchError={searchError} />

        </div>
      </div>
    </>
  );
}

export default App;
