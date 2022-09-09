import './css/common.css';
import './css/styles.css';
import { fetchImages } from './fetchImages.js'

const DEBOUNCE_DELAY = 300;

const searchFormEl = document.querySelector('.search-form');
const picturesContainerEl = document.querySelector('.gallery');

const onSearchPictures = (evt) => {
    evt.preventDefault();
    console.log(evt);
    fetchImages().then(img => console.log(img));
};

searchFormEl.addEventListener('submit', onSearchPictures);


