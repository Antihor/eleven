import axios from 'axios';

export function getImagesByQuery(query, currentPage) {
  const url = 'https://pixabay.com/api/';
  const API_KEY = '42059071-0978dc0d7158b742eee7c30f5';
  const params = new URLSearchParams({
    page: currentPage,
    per_page: 15,
    url: 'url',
    key: API_KEY,
    q: encodeURIComponent(query),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return axios.get(`${url}?${params}`);
  // .then(resp => {
  //   if (!resp.ok) {
  //     throw new Error(resp.status);
  //   }
  //   return resp.json();
  // })
  // .catch(err => console.log(err));
}
