// intro.js

import { getConfig, VERSION } from './config.js'; // 💡 getConfig 함수를 import 해서 CONFIG를 받아옵니다.

const CONFIG = getConfig();

/**
 * 커버 영역의 텍스트 정보(타이틀, 이름, 일시, 식장 정보)를 
 * CONFIG 기반으로 화면에 동적 주입하는 함수
 */
function renderCoverText() {

  if (CONFIG.title.style === 'innerHTML') {
    document.querySelector('.cover__title').innerHTML = CONFIG.title.text;
  } else {
    document.querySelector('.cover__title').textContent = CONFIG.title.text;
  }
  document.querySelector('.cover__title').style.top = CONFIG.title.top;

  // document.querySelectorAll('.divider-image').forEach(img => {
  //   img.src = `asset/image/divider-${VERSION}.png`;
  // });

  document.getElementById('main-image').src =
    `asset/image/${VERSION}/main-image.jpg`;

  document.getElementById('sub-image').src =
    `asset/image/${VERSION}/sub-image.jpg`;

  document.documentElement.dataset.theme = VERSION;

  // 1. 타이틀 변경
  const titleEl = document.querySelector('#cover__title');
  if (titleEl && CONFIG.cover__title) {
    // VERSION 조건에 따라 자바스크립트가 줄바꿈 태그(<br>)를 주입할 수 있으므로 innerHTML 처리
    titleEl.innerHTML = CONFIG.cover__title;
  }

  // 2. 신랑, 신부 이름 세팅
  const namesContainer = document.querySelector('.cover__names');
  if (namesContainer && CONFIG.groom && CONFIG.bride) {
    namesContainer.innerHTML = `
      <span class="cover__role">${CONFIG.groom.role}</span>
      <span class="cover__name">${CONFIG.groom.name}</span>
      <span class="cover__role">${CONFIG.bride.role}</span>
      <span class="cover__name">${CONFIG.bride.name}</span>
    `;
  }

  // 3. 예식 일시 세팅
  const datetimeEl = document.querySelector('.cover__datetime');
  if (datetimeEl && CONFIG.dateTime) {
    datetimeEl.textContent = CONFIG.dateTime;
  }

  // 4. 예식 장소 세팅
  const venueEl = document.querySelector('.cover__venue');
  if (venueEl && CONFIG.venue) {
    venueEl.textContent = CONFIG.venue;
  }

  // 5. 인사말 세팅 (배열을 받아서 <p> 태그로 감싸서 출력)
  const greetingEl = document.querySelector('.greeting__text');
  if (greetingEl && CONFIG.greeting) {
    // 배열의 각 문장을 <p> 태그로 감싸서 문자열로 합침
    greetingEl.innerHTML = CONFIG.greeting
      .map(text => `<p>${text}</p>`)
      .join('');
  }

  // 6. 부모님 정보 세팅 (신랑, 신부 각각 이름, 관계, 자녀 정보)
  const parentsEl = document.querySelector('.greeting__parents');
  if (parentsEl && CONFIG.parents) {
    const { groom, bride } = CONFIG.parents;
    
    parentsEl.innerHTML = `
      <p class="greeting__parent-row">
        <span class="greeting__parent-name">${groom.names}</span>
        <span class="greeting__parent-rel">${groom.relation}</span>
        <span class="greeting__parent-child">${groom.child}</span>
      </p>
      <p class="greeting__parent-row">
        <span class="greeting__parent-name">${bride.names}</span>
        <span class="greeting__parent-rel">${bride.relation}</span>
        <span class="greeting__parent-child">${bride.child}</span>
      </p>
    `;
  }







}

// 최종 실행 함수
export function initIntro() {
  try {
    renderCoverText();
  } catch (e) {
    console.error('커버 정보(Intro) 초기화 실패:', e);
  }
}