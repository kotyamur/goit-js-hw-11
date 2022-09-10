import './css/common.css';
import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './fetchImages.js'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchFormEl = document.querySelector('.search-form');
const picturesContainerEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

let searchQuery = '';
let page = 1;
const perPage = 40;
let simpleLightboxGallery = new SimpleLightbox('.gallery a');

const appendPicturesMarkup = arr => {
     const markup = arr
       .map(image => {
            return `
                <div class="photo-card">
                    <a class="gallery-link" href="${image.largeImageURL}">
                        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="gallery-image"/>
                    </a>
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
}

const clearPicturesContainer = () => {
    picturesContainerEl.innerHTML = '';
}

const onSearchBtn = (evt) => {
    evt.preventDefault();
    searchQuery = evt.currentTarget.elements.searchQuery.value;
    if (searchQuery === '') {
        Notify.failure('Please enter your search query.');
        return
    }
    page = 1;
    clearPicturesContainer();

    loadMoreBtnEl.classList.add('is-hidden');
    fetchImages(searchQuery, page, perPage).then(data => {
        if (data.totalHits === 0) {
            Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
        }
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        appendPicturesMarkup(data.hits);
        simpleLightboxGallery.refresh();
        page += 1;
        loadMoreBtnEl.classList.remove('is-hidden');
        if (data.totalHits <= perPage) {
            setTimeout(() => {
              Notify.info('There are all images matching your search query.');
              loadMoreBtnEl.classList.add('is-hidden');
              return;
            }, 1000);
        };
    });
    
};

const onLoadMoreBtn = (evt) => {
    fetchImages(searchQuery, page, perPage).then(data => {
        const countOfPages = data.totalHits / perPage;
        if (page >= countOfPages) {
          Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
          loadMoreBtnEl.classList.add('is-hidden');
          return;
        }
        appendPicturesMarkup(data.hits);
        simpleLightboxGallery.refresh();
      
        page += 1;
    });
}

searchFormEl.addEventListener('submit', onSearchBtn);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtn);




