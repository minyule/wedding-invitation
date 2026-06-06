import { showToast } from "./util.js";

const SHARE_TITLE = '최낙훈 ❤ 김민영 결혼식 초대';
const SHARE_DESCRIPTION = '2026년 08월 29일, 라도무스아트하객님홀에서 함께 해주세요.';

function initKakao() {
  if (!window.Kakao) {
    console.warn('Kakao SDK가 로드되지 않았습니다.');
    return;
  }

  if (!Kakao.isInitialized()) {
    Kakao.init('YOUR_JAVASCRIPT_KEY');
  }
}

function copyInviteLink() {
  const inviteLink = window.location.href;
  navigator.clipboard.writeText(inviteLink)
    .then(() => {
      showToast('초대장 링크가 복사되었습니다.');
    })
    .catch(() => {
      showToast('링크 복사에 실패했습니다. 다시 시도해주세요.');
    });
}

function sendKakaoShare() {
  if (!window.Kakao) {
    showToast('카카오톡 공유 SDK를 불러올 수 없습니다.');
    return;
  }

  if (!Kakao.isInitialized()) {
    Kakao.init('YOUR_JAVASCRIPT_KEY');
  }

  const shareUrl = window.location.href;
  const imageUrl = `${window.location.origin}${window.location.pathname}`;

  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: SHARE_TITLE,
      description: SHARE_DESCRIPTION,
      imageUrl,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl
      }
    },
    buttons: [
      {
        title: '초대장 보기',
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl
        }
      }
    ]
  });
}

function bindShareEvents() {
  const copyButton = document.getElementById('btnCopyLink');
  // const kakaoButton = document.getElementById('btnKakaoShare');

  if (copyButton) {
    copyButton.addEventListener('click', copyInviteLink);
  }
  // if (kakaoButton) {
  //   kakaoButton.addEventListener('click', sendKakaoShare);
  // }
}

function initShare() {
  initKakao();
  bindShareEvents();
}

export { initShare };
