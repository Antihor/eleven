const loadRef = document.querySelector('.loader');

export function createGalleryCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `

    <li class="gallery-card">
      <a href=${largeImageURL}>
    <img src=${webformatURL} alt=${tags} /></a>
    <div class="card-legend">
    <p>Views: ${views}</p>
    <p>Likes: ${likes}</p>
    <p>Comments: ${comments}</p>
    <p>Downloads: ${downloads}</p>
    </div>
      </li>`;
}

function clearGallery() {}

export function showLoader() {
  loadRef.classList.remove('hidden');
}

export function hideLoader() {
  loadRef.classList.add('hidden');
}
