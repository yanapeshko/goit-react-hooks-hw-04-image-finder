import axios from 'axios';
import { toast } from 'react-toastify';

const getImages = axios.create({
  baseURL: 'https://pixabay.com/api/',
  timeout: 1000,

  params: {
    key: '23833327-aee66bbf86a23c3fb1d188dcb',
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export async function fetchImages(q, page) {
  try {
    const { data } = await getImages('', { params: { q, page } });
    return data;
  } catch (error) {
    toast.error(`Nothing found like ${q}`);
  }
}
