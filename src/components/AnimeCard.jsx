import React from 'react'

function AnimeCard({anime}) {
    return (
        <article className='anime-card'>
            <a href={anime.url} target='_blank' rel="noopener noreferrer" key={Math.random()} >
                <figure>
                    <img src={anime.image_url} alt="img-anime" />
                </figure>
                <h3>
                    {anime.title}
                </h3>
            </a>
        </article>
    )
}

export default AnimeCard