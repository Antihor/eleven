import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createGalleryCard } from './js/render';
import { getImagesByQuery } from './js/api';
import { showLoader } from './js/render';
import { hideLoader } from './js/render';

const formRef = document.querySelector('.form');
const galRef = document.querySelector('.js-gallery');
const LMRef = document.querySelector('.js-load-more');

const lightbox = new SimpleLightbox('.js-gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let page = 1;
let query = '';

formRef.addEventListener('submit', onSubmit);

async function onSubmit(ev) {
  try {
    ev.preventDefault();
    showLoader();
    query = ev.currentTarget.elements.query.value.trim();

    page = 1;
    LMRef.classList.add('hidden');

    const { data } = await getImagesByQuery(query, page);

    if (data.hits.length === 0 || query === '') {
      iziToast.error({
        title: 'Sorry!',
        message:
          'There are no images matching your search query. Please try again!',
        position: 'topLeft',
      });
      galRef.innerHTML = '';
      LMRef.classList.add('hidden');
      formRef.reset();
    }

    const gallery = data.hits.map(img => createGalleryCard(img)).join('');

    galRef.innerHTML = gallery;

    lightbox.refresh();

    hideLoader();

    formRef.reset();

    LMRef.classList.remove('hidden');

    LMRef.addEventListener('click', onLoadMore);
  } catch (err) {
    console.log(err);
  }
}

async function onLoadMore() {
  try {
    showLoader();

    page += 1;

    const { data } = await getImagesByQuery(query, page);

    if (galRef.children.length >= data.totalHits) {
      iziToast.error({
        title: 'Sorry!',
        message: 'You have reached the end of search results!',
        position: 'topLeft',
      });
      LMRef.classList.add('hidden');
      LMRef.removeEventListener('click', onLoadMore);
    }

    const gallery = data.hits.map(img => createGalleryCard(img)).join('');

    galRef.insertAdjacentHTML('beforeend', gallery);

    hideLoader();
    lightbox.refresh();
    const height = galRef.firstElementChild.getBoundingClientRect().height;

    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error);
  }
}
