const API_KEY = '29796750-ac01510cc804ce1d65455fcc5';
const BASE_URL = 'https://pixabay.com/api/';
// const options = {
//   headers: {
//     Authorization: API_KEY,
//   },
// };

const parameters = '';
export const fetchImages = (inputValue, p) => {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${p}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
      }
    return response.json();
  });
};