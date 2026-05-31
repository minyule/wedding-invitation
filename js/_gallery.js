const GALLERY_IMAGES = [
  { src: 'img/gallery/01.jpg', alt: '웨딩 사진 1' },
  { src: 'img/gallery/02.jpg', alt: '웨딩 사진 2' },
  { src: 'img/gallery/03.jpg', alt: '웨딩 사진 3' },
  { src: 'img/gallery/04.jpg', alt: '웨딩 사진 4' },
  { src: 'img/gallery/05.jpg', alt: '웨딩 사진 5' },
  { src: 'img/gallery/06.jpg', alt: '웨딩 사진 6' },
  { src: 'img/gallery/07.jpg', alt: '웨딩 사진 7' },
  { src: 'img/gallery/08.jpg', alt: '웨딩 사진 8' },
  { src: 'img/gallery/09.jpg', alt: '웨딩 사진 9' },
  { src: 'img/gallery/10.jpg', alt: '웨딩 사진 10' },
  { src: 'img/gallery/11.jpg', alt: '웨딩 사진 11' },
  { src: 'img/gallery/12.jpg', alt: '웨딩 사진 12' }
];

let currentIndex = 0;
let startX = 0;
let endX = 0;

let grid = null;
let lightbox = null;
let lightboxImg = null;
let lightboxCounter = null;
let closeButton = null;
let prevButton = null;
let nextButton = null;

function createGalleryMarkup() {
  const root = document.getElementById('gallery-root');
  if (!root) return;

  const galleryGrid = document.createElement('div');
  galleryGrid.className = 'gallery__grid';
  galleryGrid.id = 'gallery-grid';

  const lightboxOverlay = document.createElement('div');
  lightboxOverlay.className = 'lightbox';
  lightboxOverlay.id = 'lightbox';
  lightboxOverlay.setAttribute('aria-hidden', 'true');

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox__close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', '닫기');
  closeBtn.textContent = '×';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'lightbox__prev';
  prevBtn.type = 'button';
  prevBtn.setAttribute('aria-label', '이전');
  prevBtn.textContent = '←';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'lightbox__next';
  nextBtn.type = 'button';
  nextBtn.setAttribute('aria-label', '다음');
  nextBtn.textContent = '→';

  const imageElement = document.createElement('img');
  imageElement.className = 'lightbox__img';
  imageElement.id = 'lightbox-img';
  imageElement.alt = '';

  const counter = document.createElement('div');
  counter.className = 'lightbox__counter';
  counter.id = 'lightbox-counter';

  lightboxOverlay.append(closeBtn, prevBtn, imageElement, nextBtn, counter);
  root.append(galleryGrid, lightboxOverlay);

  grid = galleryGrid;
  lightbox = lightboxOverlay;
  lightboxImg = imageElement;
  lightboxCounter = counter;
  closeButton = closeBtn;
  prevButton = prevBtn;
  nextButton = nextBtn;
}

function renderGallery() {
  if (!grid) return;
  grid.innerHTML = '';

  GALLERY_IMAGES.forEach((image, index) => {
    const item = document.createElement('div');
    item.className = 'gallery__item';
    item.style.animationDelay = `${index * 0.05}s`;

    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.loading = 'lazy';
    img.dataset.index = String(index);
    img.addEventListener('click', () => openLightbox(index));

    item.appendChild(img);
    grid.appendChild(item);
  });
}

function openLightbox(index) {
  currentIndex = index;
  if (!lightbox || !lightboxImg || !lightboxCounter) return;

  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  updateLightbox();
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function prevImage() {
  currentIndex = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  updateLightbox();
}

function nextImage() {
  currentIndex = (currentIndex + 1) % GALLERY_IMAGES.length;
  updateLightbox();
}

function updateLightbox() {
  const image = GALLERY_IMAGES[currentIndex];
  if (!image) return;

  if (lightboxImg) {
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = image.src;
      lightboxImg.alt = image.alt;
      lightboxImg.style.opacity = '1';
    }, 20);
  }

  if (lightboxCounter) {
    lightboxCounter.textContent = `${currentIndex + 1} / ${GALLERY_IMAGES.length}`;
  }
}

function onKeyDown(event) {
  if (!lightbox || !lightbox.classList.contains('is-open')) return;
  switch (event.key) {
    case 'ArrowLeft':
      prevImage();
      break;
    case 'ArrowRight':
      nextImage();
      break;
    case 'Escape':
      closeLightbox();
      break;
  }
}

function onOverlayClick(event) {
  if (event.target === lightbox) {
    closeLightbox();
  }
}

function onTouchStart(event) {
  startX = event.touches[0].clientX;
}

function onTouchEnd(event) {
  endX = event.changedTouches[0].clientX;
  const delta = endX - startX;
  if (Math.abs(delta) > 50) {
    if (delta < 0) {
      nextImage();
    } else {
      prevImage();
    }
  }
}

function bindGalleryEvents() {
  if (closeButton) closeButton.addEventListener('click', closeLightbox);
  if (prevButton) prevButton.addEventListener('click', prevImage);
  if (nextButton) nextButton.addEventListener('click', nextImage);
  if (lightbox) {
    lightbox.addEventListener('click', onOverlayClick);
    lightbox.addEventListener('touchstart', onTouchStart);
    lightbox.addEventListener('touchend', onTouchEnd);
  }
  document.addEventListener('keydown', onKeyDown);
}

function initGallery() {
  createGalleryMarkup();
  renderGallery();
  bindGalleryEvents();
}

export { initGallery };
