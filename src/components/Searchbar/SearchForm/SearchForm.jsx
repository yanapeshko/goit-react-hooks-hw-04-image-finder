import { useState } from 'react';
import { toast } from 'react-toastify';
import { BiSearchAlt } from 'react-icons/bi';
import s from './SearchForm.module.css';

export default function SearchForm({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = evt => {
    setImageName(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (imageName.trim() === '') {
      toast.warning('Enter sth');
      return;
    }

    onSubmit(imageName);
    setImageName('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.searchForm} autoComplete="off">
      <input
        className={s.input}
        type="text"
        autoFocus
        placeholder="Search images and photos"
        value={imageName}
        onChange={handleNameChange}
      />
      <button type="submit" className={s.button}>
        <BiSearchAlt className={s.searchIcon} />
      </button>
    </form>
  );
}
