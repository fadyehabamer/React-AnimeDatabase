import React from 'react'
import AnimeCard from './AnimeCard'

function MainContent({ handleSearch, search, setSearch, animeList }) {
    return (
        <main>
            <div className="main-head">
                <div className="instructions">
                    < h2>Search for Anime First to see results here
                        <br /> press Enter after typing
                    </h2>
                </div>
                <form className='search-box' onSubmit={handleSearch}>
                    <input type="search"
                        placeholder='search for Anime ...'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        required />
                </form>

            </div>


            {search === ""
                ?
                    <h2>No Content Yet</h2>
                : <>
                    <h2 >Results</h2>
                    <div className="anime-list">
                        {animeList.map(anime => (
                            // <div className="anime-card" key={anime.mal_id}>
                            //     {anime.title}
                            // </div>
                            <AnimeCard anime={anime} />
                        ))}
                    </div>
                </>
            }
        </main >
    )
}

export default MainContent