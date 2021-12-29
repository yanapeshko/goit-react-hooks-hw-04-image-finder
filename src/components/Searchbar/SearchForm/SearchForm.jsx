import { useState } from 'react';
import { toast } from 'react-toastify';
import { BiSearchAlt } from 'react-icons/bi';
import s from './SearchForm.module.css';

export default function SearchForm({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = e => {
    setImageName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (imageName.trim() === '') {
      toast.warning('Enter data');
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
