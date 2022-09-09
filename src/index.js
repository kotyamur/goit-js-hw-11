import './css/common.css';
import './css/styles.css';
import { fetchImages } from './fetchImages.js'

const DEBOUNCE_DELAY = 300;

const searchFormEl = document.querySelector('.search-form');
const picturesContainerEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

let searchQuery = '';
let page = 1;

const onSearchBtn = (evt) => {
    evt.preventDefault();
    console.log(evt.currentTarget.elements.searchQuery.value);
    searchQuery = evt.currentTarget.elements.searchQuery.value;
    page = 1;

    fetchImages(searchQuery, page).then(data => {
        console.log(data)
        const arr = data.hits;
        const markup = arr
          .map(image => {
            return `
                <div class="photo-card">
                    <div class="gallery-link">
                        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="gallery-image"/>
                    </div>
                    <div class="info">
                        <p class="info-item">
                        <b>Likes</b>${image.likes}
                        </p>
                        <p class="info-item">
                        <b>Views</b>${image.views}
                        </p>
                        <p class="info-item">
                        <b>Comments</b>${image.comments}
                        </p>
                        <p class="info-item">
                        <b>Downloads</b>${image.downloads}
                        </p>
                    </div>
                </div>
              `;
          })
          .join('');
        picturesContainerEl.insertAdjacentHTML('beforeend', markup);
        page += 1;
    });
};

const onLoadMoreBtn = (evt) => {
    fetchImages(searchQuery, page).then(data => {
        console.log(data.hits);
        const arr = data.hits;
        const markup = arr
          .map(image => {
              return `
                <div class="photo-card">
                    <div class="gallery-link">
                        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="gallery-image"/>
                    </div>
                    <div class="info">
                        <p class="info-item">
                        <b>Likes</b>${image.likes}
                        </p>
                        <p class="info-item">
                        <b>Views</b>${image.views}
                        </p>
                        <p class="info-item">
                        <b>Comments</b>${image.comments}
                        </p>
                        <p class="info-item">
                        <b>Downloads</b>${image.downloads}
                        </p>
                    </div>
                </div>
              `;
          })
            .join('');
        picturesContainerEl.insertAdjacentHTML('beforeend', markup);
      page += 1;
    });
}

searchFormEl.addEventListener('submit', onSearchBtn);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtn);


