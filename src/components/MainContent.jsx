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
                        {animeList.length === 0 ? <h2 style={{marginTop : 0 , marginBottom : '30px'}}>No Results Found</h2> : null}
                        
                        {animeList.map(anime => (
                            // <div className="anime-card" key={anime.mal_id}>
                            //     {anime.title}
                            // </div>
                            <AnimeCard anime={anime}  key={anime.mal_id}/>
                        ))}
                    </div>
                </>
            }
        </main >
    )
}

export default MainContent