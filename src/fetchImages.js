const API_KEY = '29796750-ac01510cc804ce1d65455fcc5';
const BASE_URL = 'https://pixabay.com/api/';
// const options = {
//   headers: {
//     Authorization: API_KEY,
//   },
// };

export const fetchImages = (inputValue, p, perPage) => {
    const url = `${BASE_URL}?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${p}`;
    return fetch(url).then(response => {
        if (!response.ok) {
        throw new Error(response.status);
        }
        return response.json();
    });
};