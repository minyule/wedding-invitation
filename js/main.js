import { renderCalendar } from './calendar.js'; // 💡 달력 함수가 다른 파일에 있다면 import 추가!
import { initMap } from './map.js';
import { initGallery } from './gallery.js';
import { initAccount } from './account.js';
import { initShare } from './share.js';
import { initIntro } from './intro.js';
import { getConfig } from './config.js';

const CONFIG = getConfig();

document.addEventListener('DOMContentLoaded', () => {
  // 1. 스크롤 애니메이션을 위한 IntersectionObserver 설정
  const sections = document.querySelectorAll('.section');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.12
  };

  const onIntersect = (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target); // 한 번만 연출 후 감지 해제
      }
    });
  };

  const observer = new IntersectionObserver(onIntersect, observerOptions);
  sections.forEach(s => observer.observe(s));

  // 2. 부드러운 스크롤 적용
  document.documentElement.style.scrollBehavior = 'smooth';

  // 3. 기능별 초기화 함수 호출 (에러로 인해 다음 코드가 멈추지 않도록 안전하게 실행)
  try {
    if (typeof renderCalendar === 'function') {
      renderCalendar('wedding-calendar', 2026, 8, 29);
    } else {
      console.warn('renderCalendar 함수가 정의되지 않았습니다.');
    }
  } catch (e) { console.error('달력 초기화 실패:', e); }

  document.addEventListener('contextmenu', (e) => e.preventDefault()); // 우클릭 방지
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === 's' || e.key === 'c' || e.key === 'u')) {
      e.preventDefault();
    }
  });

  try { initIntro(); } catch (e) { console.error('인트로 초기화 실패:', e); }
  try { initMap();} catch (e) { console.error('지도 초기화 실패:', e); }
  try { initGallery(); } catch (e) { console.error('갤러리 초기화 실패:', e); }
  try { initAccount(); } catch (e) { console.error('계좌 아코디언 초기화 실패:', e); }
  try { initShare(); } catch (e) { console.error('공유 기능 초기화 실패:', e); }

});