import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { useState, useEffect } from 'react';


function App() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState('');

  const getTopAnime = async () => {
    const response = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`);
    const data = await response.json();
    // console.log(data);
    setTopAnime(data.top.slice(0, 10));
  }

  const fetchAnime = async (search) => {
    const response = await fetch(`https://api.jikan.moe/v3/search/anime?q=${search}&limit=20`);
    const data = await response.json();
    setAnimeList(data.results);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAnime(search)
    // console.log(search);
  }
  useEffect(() => {
    getTopAnime();
  }, [])

  // console.log(topAnime);
  return (
    <>
      <div class="background">
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
          <MainContent handleSearch={handleSearch} search={search} setSearch={setSearch} animeList={animeList} />

        </div>
      </div>
    </>
  );
}

export default App;
