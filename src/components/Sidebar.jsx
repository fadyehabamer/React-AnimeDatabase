import React from 'react'

function Sidebar({ topAnime }) {
    return (
        <aside>
                <h3> Top Anime 🔝</h3>
            <nav>
                {topAnime.map(anime => (
                    <a
                        key={anime.mal_id}
                        href={anime.url}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        {anime.rank} - {anime.title}
                    </a>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar