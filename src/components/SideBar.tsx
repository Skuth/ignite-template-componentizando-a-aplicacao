import { useState, useEffect } from 'react';

import { Button } from './Button'

import { api } from '../services/api';

import '../styles/sidebar.scss';

import { Genre } from '../interface/Genre';

interface SideBarProps {
  selectedGenreId: number
  handleClickButton(genreId: number): void
}

export function SideBar({ selectedGenreId, handleClickButton }: SideBarProps) {
  const [genres, setGenres] = useState<Genre[]>([]);


  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);
  

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}