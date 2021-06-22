const galleryItems = [
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryEll = document.querySelector('.js-gallery');
const modalEll = document.querySelector('.js-lightbox');
const modalImageEl = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');
let currentIndex;

const galleryItemsMarkup = creatGalleryItemsMarkup(galleryItems);

function creatGalleryItemsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }, index) => {
      return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            data-index="${index}"
            alt="${description}"
          />
        </a>
      </li>`;
    })
    .join('');
}
console.log(galleryItemsMarkup);
galleryEll.insertAdjacentHTML('beforeend', galleryItemsMarkup);

galleryEll.addEventListener('click', onGalleryItemsClick);
function onGalleryItemsClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  modalEll.classList.add('is-open');
  modalImageEl.src = event.target.dataset.source;
  modalImageEl.alt = event.target.alt;

  window.addEventListener('keydown', onEscPress);
  currentIndex = Number(event.target.dataset.index);
  window.addEventListener('keydown', onArrowPress);
}

closeBtn.addEventListener('click', onCloseBtnClick);
overlay.addEventListener('click', onCloseBtnClick);

function onCloseBtnClick(event) {
  modalEll.classList.remove('is-open');
  modalImageEl.src = '';
  modalImageEl.alt = '';
}

function onEscPress(event) {
  if (event.code === 'Escape') {
    onCloseBtnClick();
  }
}

function onArrowPress(event) {
  if (event.code === 'ArrowRight') {
    onArrowRight();
  } else if (event.code === 'ArrowLeft') {
    onArrowLeft();
  }
}

function onArrowRight() {
  if (currentIndex + 1 > galleryItems.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex += 1;
  }
  changeImg();
}

function onArrowLeft() {
  currentIndex -= 1;
  if (currentIndex - 1 < 0) {
    currentIndex = galleryItems.length - 1;
  }
  changeImg();
}
function changeImg() {
  modalImageEl.src = galleryItems[currentIndex].original;
  modalImageEl.alt = galleryItems[currentIndex].description;
}
