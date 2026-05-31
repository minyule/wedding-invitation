# 모바일 청첩장 프로젝트

## 프로젝트 개요
HTML + Vanilla JS로 만드는 모바일 전용 청첩장 웹페이지.
프레임워크/빌드 도구 없이 순수 HTML, CSS, Vanilla JS만 사용한다.

## 기술 스택
- HTML5 (시멘틱 마크업)
- CSS3 (CSS Variables, Flexbox, Grid, Animation)
- Vanilla JS (ES6+, ES Modules)
- 카카오맵 API (지도 표시)
- 외부 라이브러리: Google Fonts만 허용

## 금지 사항
- React, Vue, Angular 등 JS 프레임워크 사용 금지
- jQuery 사용 금지
- Webpack, Vite 등 빌드 도구 사용 금지
- TypeScript 사용 금지
- npm 패키지 사용 금지 (카카오맵 SDK 제외)

## 프로젝트 구조
```
/
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css     # CSS 변수 (색상, 폰트, 간격)
│   ├── base.css          # 공통 스타일
│   └── sections/
│       ├── cover.css
│       ├── invitation.css
│       ├── calendar.css
│       ├── location.css
│       ├── gallery.css
│       ├── account.css
│       └── share.css
└── js/
    ├── main.js           # 진입점, 섹션 초기화
    ├── calendar.js       # 웨딩 달력 렌더링
    ├── map.js            # 카카오맵 초기화 및 마커
    ├── gallery.js        # 갤러리 이미지 슬라이더
    ├── account.js        # 계좌번호 복사
    └── share.js          # 카카오톡 공유
```

## 페이지 섹션 구성 (위→아래 순서)
1. **Cover** - 메인 커플 사진 + "Our Beginning" 타이틀 + 페이드인 애니메이션
2. **Info** - 신랑/신부 이름, 결혼식 일시·장소
3. **Invitation** - 초대 문구 (부모님 포함 혼주 소개)
4. **Calendar** - 웨딩 날짜 하이라이트된 월간 달력
5. **Location** - 카카오맵 지도 + T맵/카카오맵/네이버맵 앱 연결 버튼
6. **Gallery** - placeholder 이미지 그리드 (실제 이미지 교체 예정)
7. **Account** - 신랑측/신부측 계좌번호 + 복사 버튼
8. **Share** - 카카오톡 공유 버튼

## 디자인 시스템

### 타겟 디바이스
- 모바일 전용 (max-width: 480px 기준 설계)
- 데스크탑에서는 중앙 정렬된 모바일 뷰로 표시

### 색상 (CSS Variables)
```css
:root {
  --color-bg: #faf9f7;
  --color-primary: #3d2c1e;      /* 다크 브라운 */
  --color-accent: #c8a882;       /* 골드/웜 베이지 */
  --color-accent-light: #e8d5bc;
  --color-text: #3d2c1e;
  --color-text-muted: #8a7a6e;
  --color-divider: #e0d6cc;
  --color-white: #ffffff;
  --color-highlight: #d4846a;    /* 캘린더 날짜 하이라이트 */
}
```

### 타이포그래피
- 영문 제목: `Cormorant Garamond` (Google Fonts, 세리프, 우아함)
- 한글 본문: `Noto Serif KR` (Google Fonts, 세리프)
- 한글 보조: `Noto Sans KR` (Google Fonts, 정보성 텍스트)

### 애니메이션 원칙
- 스크롤 진입 시 `fadeInUp` 애니메이션 적용 (IntersectionObserver 사용)
- 커버 섹션은 페이지 로드 시 자동 페이드인
- `transition` 기본값: `0.3s ease`
- 과도한 애니메이션 지양, 우아하고 절제된 모션

## 코딩 컨벤션

### JavaScript
- `const` 우선, 재할당 필요 시 `let` (`var` 금지)
- 함수명: camelCase (예: `initMap`, `copyAccountNumber`)
- 클래스명 기반 DOM 선택 (`querySelector`, `querySelectorAll`)
- 이벤트 위임 패턴 활용
- async/await 사용 (Promise.then 체인 지양)

### CSS
- BEM 네이밍: `.section__element--modifier`
- 모든 색상/폰트/간격은 CSS 변수 사용
- `px` 대신 `rem` 사용 (기준: 16px = 1rem)
- 모바일 퍼스트 (미디어 쿼리 min-width 방향)

### HTML
- 시멘틱 태그 우선 (`section`, `article`, `header`, `nav` 등)
- 각 섹션에 `id` 부여 (앵커 링크용)
- `data-*` 속성으로 JS와 연동되는 데이터 관리
- 이미지에 `alt` 텍스트 필수

## 카카오맵 API 사용 방법
```javascript
// map.js
// APP_KEY는 index.html의 <script> src에 포함됨
// 지도 초기화 예시
const mapContainer = document.getElementById('map');
const mapOption = {
  center: new kakao.maps.LatLng(위도, 경도),
  level: 3
};
const map = new kakao.maps.Map(mapContainer, mapOption);

// 마커 추가
const marker = new kakao.maps.Marker({
  position: new kakao.maps.LatLng(위도, 경도)
});
marker.setMap(map);
```

### 지도 앱 연결 버튼 URL 패턴
```javascript
// T맵
`tmap://search?name=${encodeURIComponent(장소명)}`
// 카카오맵
`kakaomap://place?id=${카카오플레이스ID}`
// 네이버맵
`nmap://place?lat=${위도}&lng=${경도}&name=${encodeURIComponent(장소명)}&appname=wedding`
```

## 계좌번호 복사 기능
```javascript
// Clipboard API 사용, 실패 시 fallback으로 execCommand 사용
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('계좌번호가 복사되었습니다.');
  } catch {
    // fallback
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast('계좌번호가 복사되었습니다.');
  }
}
```

## 갤러리
- 실제 이미지 없이 placeholder 구조로 구현
- CSS Grid 2열 레이아웃 (정사각형 썸네일)
- 클릭 시 라이트박스(풀스크린) 오버레이 표시
- `data-src` 속성으로 나중에 실제 이미지 경로 교체 가능하게 설계

## 성능 고려사항
- 이미지 `loading="lazy"` 속성 필수
- IntersectionObserver로 스크롤 애니메이션 처리 (scroll 이벤트 지양)
- 폰트는 `display=swap` 옵션으로 로딩

## 접근성
- 모든 인터랙티브 요소에 `aria-label` 또는 `title` 속성
- 색상 대비 WCAG AA 기준 준수
- 탭 키보드 네비게이션 지원
