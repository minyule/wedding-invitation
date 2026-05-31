// share.js
import { showToast } from './account.js'; // 기존에 만들어둔 토스트 알림 함수 활용

export function initShare() {
  const btnCopyLink = document.getElementById('btnCopyLink');
  const btnKakaoShare = document.getElementById('btnKakaoShare');

  // 현재 페이지 URL 가져오기
  const currentUrl = window.location.href;

  // 1. 링크 복사하기 기능
  if (btnCopyLink) {
    btnCopyLink.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(currentUrl);
        showToast('링크가 복사되었습니다.');
      } catch (err) {
        // 구형 브라우저 호환용 fallback
        const textarea = document.createElement('textarea');
        textarea.value = currentUrl;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('링크가 복사되었습니다.');
      }
    });
  }

  // 2. 카카오톡 공유하기 기능
  if (btnKakaoShare) {
    btnKakaoShare.addEventListener('click', () => {
      // 카카오 SDK가 정상적으로 로드되었는지 확인
      if (typeof Kakao === 'undefined') {
        alert('카카오톡 공유를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
        return;
      }

      // 카카오 SDK 초기화 (최초 1회만 실행되도록 설정)
      if (!Kakao.isInitialized()) {
        // ⚠️ 여기에 본인의 카카오 JavaScript 키를 넣으셔야 합니다!
        Kakao.init('YOUR_KAKAO_JAVASCRIPT_KEY'); 
      }

      // 카카오톡 공유 템플릿 보내기 (기본 스크랩 형식)
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '최낙훈 ❤️ 김민영 결혼식에 초대합니다',
          description: '2026년 8월 29일 토요일\n우리들의 소중한 날, 함께 축복해주세요.',
          imageUrl: 'https://yourdomian.com/images/main-thumb.jpg', // 카톡 공유시 보여줄 대표 이미지 주소 (절대경로)
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
        buttons: [
          {
            title: '모바일 청첩장 보기',
            link: {
              mobileWebUrl: currentUrl,
              webUrl: currentUrl,
            },
          },
        ],
      });
    });
  }
}