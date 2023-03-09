import React from 'react'

function AnimeCard({anime}) {
    console.log(anime)
    
    return (
        

        <article className='anime-card' key={anime.mal_id}>
            <a key={anime.mal_id} href={anime.url} target='_blank' rel="noopener noreferrer" >
                <figure>
                    <img src={anime.images.jpg.image_url} alt="img-anime" />
                </figure>
                <h3>
                    {anime.title}
                </h3>
            </a>
        </article>
    )
}

export default AnimeCard