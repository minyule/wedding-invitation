
// ── 1. 이미지 목록 설정 ──────────────────────────────
// asset/image/gallery/ 폴더 내 파일명 abc 순 배열
// 파일을 추가/삭제할 때 이 배열만 수정하면 됩니다.
import { getConfig, VERSION } from "./config.js";

const CONFIG = getConfig();

const IMAGES = Array.from({ length: CONFIG.gallery.imageCount }, (_, i) => {
    // i + 1을 하여 01, 02... 형태의 문자열로 만듦
    const num = String(i + 1).padStart(2, '0');
    return `photo-${num}.jpg`;
  });

const THUMB_DIR = 'asset/image/'+VERSION+'/gallery/thumb/';  // 썸네일 경로
const FULL_DIR  = 'asset/image/'+VERSION+'/gallery/';         // 원본 경로

// ── 2. 상태 ─────────────────────────────────────────
let currentIndex  = 0;
let trackBuilt    = false;
let lastFocused   = null;
let touchStartX   = 0;
let touchStartY   = 0;

function renderText() {
  const descEl = document.querySelector('#galleryDescription');
  if (descEl && CONFIG.gallery.galleryDescription) {
    descEl.textContent = CONFIG.gallery.galleryDescription;
  }
}

// ── 3. 그리드 렌더링 ────────────────────────────────
function renderGrid() {
  const grid = document.getElementById('galleryGrid');
  IMAGES.forEach((filename, i) => {
    const btn = document.createElement('button');
    btn.className = 'gallery__item';
    btn.setAttribute('role', 'listitem');
    btn.setAttribute('aria-label', `갤러리 사진 ${i + 1} 크게 보기`);

    const img = document.createElement('img');
    img.src     = THUMB_DIR + filename;
    img.alt     = `웨딩 사진 ${i + 1}`;
    img.loading = 'lazy';

    btn.appendChild(img);
    btn.addEventListener('click', () => {
      lastFocused = btn;
      openLightbox(i);
    });
    grid.appendChild(btn);
  });
}

// ── 4. 라이트박스 열기 ──────────────────────────────
function openLightbox(index) {
  const lb = document.getElementById('lightbox');

  // 중복 로직 제거: 이미 만들어둔 함수를 호출하기만 하면 됩니다.
  buildLightboxTrack();

  lb.hidden = false;
  lb.classList.add('is-open');
  document.body.classList.add('lightbox-open');

  goToSlide(index, false);
  document.getElementById('lightboxClose').focus();
}

// ── 5. 슬라이드 이동 ────────────────────────────────
function goToSlide(index, animate) {
  const total = IMAGES.length;
  currentIndex = Math.max(0, Math.min(index, total - 1));

  const track = document.getElementById('lightboxTrack');
  track.style.transition = animate
    ? 'transform 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    : 'none';
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  document.getElementById('lightboxCounter').textContent =
    `${currentIndex + 1} / ${total}`;
  document.getElementById('lightboxPrev').disabled = currentIndex === 0;
  document.getElementById('lightboxNext').disabled = currentIndex === total - 1;
}

// ── 6. 라이트박스 닫기 ──────────────────────────────
function closeLightbox() {
  const lb = document.getElementById('lightbox');

  lb.classList.remove('is-open');
  lb.hidden = true;

  document.body.classList.remove('lightbox-open');

  if (lastFocused) {
    lastFocused.focus();
  }
}

// ── 7. 이벤트 등록 ──────────────────────────────────
function initEvents() {
  // 닫기 버튼
  document.getElementById('lightboxClose')
    .addEventListener('click', closeLightbox);

  // 이전/다음 버튼
  document.getElementById('lightboxPrev')
    .addEventListener('click', () => goToSlide(currentIndex - 1, true));
  document.getElementById('lightboxNext')
    .addEventListener('click', () => goToSlide(currentIndex + 1, true));

  // 배경(트랙 밖) 클릭 시 닫기
  document.getElementById('lightbox')
    .addEventListener('click', (e) => {
      if (e.target === document.getElementById('lightbox') ||
          e.target === document.getElementById('lightboxTrackWrap')) {
        closeLightbox();
      }
    });

  // 키보드
  document.addEventListener('keydown', (e) => {
    if (document.getElementById('lightbox').hidden) return;
    if (e.key === 'ArrowLeft')  goToSlide(currentIndex - 1, true);
    if (e.key === 'ArrowRight') goToSlide(currentIndex + 1, true);
    if (e.key === 'Escape')     closeLightbox();
  });

  // 터치 스와이프
  const wrap = document.getElementById('lightboxTrackWrap');

  wrap.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  wrap.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    
    // [수정 1] 감도 완화: 수평으로 30px만 움직여도 작동 (대충 스와이프해도 인정)
    // [수정 2] 세로로 너무 과하게 쓸어내린 게 아니라면 수평 슬라이드로 인정
    if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy) * 0.6) {
      if (dx < 0) {
        goToSlide(currentIndex + 1, true);
      } else {
        goToSlide(currentIndex - 1, true);
      }
    }
  }, { passive: true });
}

function buildLightboxTrack() {
  if (trackBuilt) return;

  const track = document.getElementById('lightboxTrack');

  IMAGES.forEach((filename, i) => {
    // 1. 컨테이너 생성
    const wrapper = document.createElement('div');
    wrapper.className = 'image-wrapper'; // CSS에서 지정한 클래스

    // 2. 이미지 생성
    const img = document.createElement('img');
    img.src = FULL_DIR + filename;
    img.alt = `웨딩 사진 ${i + 1}`;
    img.draggable = false; // PC 드래그 방지

    // 3. 투명 오버레이 생성
    const overlay = document.createElement('div');
    overlay.className = 'lightbox__overlay'; // CSS에서 지정한 클래스

    // 조립
    wrapper.appendChild(img);
    wrapper.appendChild(overlay);
    track.appendChild(wrapper);
  });

  trackBuilt = true;
}

// ── 8. 초기화 ────────────────────────────────────────
export function initGallery() {
  renderText();
  renderGrid();
  buildLightboxTrack();
  initEvents();
}
