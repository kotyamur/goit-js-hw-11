const API_KEY = '29796750-ac01510cc804ce1d65455fcc5';
const BASE_URL = 'https://pixabay.com/api/';
// const options = {
//   headers: {
//     Authorization: API_KEY,
//   },
// };

const parameters = '';
export const fetchImages = inputValue => {
  //   return fetch(
  //     `${BASE_URL}?key=${API_KEY}&q=${inputValue}&language=en&per_page=5&page=${page}`
  //   ).then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.status);
  //     }
  //     return response.json();
  //   });
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=yellow+flowers&image_type=photo&per_page=5&page=1`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};