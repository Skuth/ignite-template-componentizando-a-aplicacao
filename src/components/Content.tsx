import { useState, useEffect } from 'react';

import { MovieCard } from './MovieCard';

import { api } from '../services/api';

import '../styles/content.scss';

import { Genre } from '../interface/Genre';
import { Movie } from '../interface/Movie';

interface ContentProps {
  selectedGenre: Genre
  selectedGenreId: number
}

export function Content({ selectedGenre, selectedGenreId }: ContentProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId])

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}