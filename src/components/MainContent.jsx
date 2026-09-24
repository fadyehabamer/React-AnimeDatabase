import React from 'react'
import AnimeCard from './AnimeCard'

function MainContent({ handleSearch, search, setSearch, animeList, searchStatus, searchError }) {
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
                        aria-label="Search anime"
                        placeholder='search for Anime ...'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        required />
                </form>

            </div>


            {searchStatus === 'idle' && <h2>No Content Yet</h2>}
            {searchStatus === 'loading' && <h2 role="status">Searching...</h2>}
            {searchStatus === 'error' && <h2 role="alert">{searchError}</h2>}
            {searchStatus === 'done' &&
                <>
                    <h2 >Results</h2>
                    <div className="anime-list">
                        {animeList.length === 0 ? <h2 style={{marginTop : 0 , marginBottom : '30px'}}>No Results Found</h2> : null}

                        {animeList.map(anime => (
                            <AnimeCard anime={anime}  key={anime.mal_id}/>
                        ))}
                    </div>
                </>
            }
        </main >
    )
}

export default MainContent