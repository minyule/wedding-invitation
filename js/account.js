// account.js

import { showToast } from "./util.js";
import { getConfig } from "./config.js";

const CONFIG = getConfig();

function renderPanel(panelId, list) {
  // 1. 설명 텍스트 세팅
  const descEl = document.querySelector('.account__desc');
  if (descEl && CONFIG.account.desc) {
    descEl.innerHTML = CONFIG.account.desc
      .map(text => `<p>${text}</p>`)
      .join('');
  }

  const inner = document.querySelector(`#${panelId} .accordion__panel-inner`);
  if (!inner) return;
  
  // 기존 내용이 있다면 초기화
  inner.innerHTML = '';

  list.forEach(item => {
    const div = document.createElement('div');
    div.className = 'account-item';
    div.innerHTML = `
      <div class="account-item__top">
        <span class="account-item__relation">${item.relation}</span>
        <button class="account-item__copy" type="button"
                aria-label="${item.relation} 계좌번호 복사">복사</button>
      </div>
      <p class="account-item__number">
        ${item.bank} ${item.account} ${item.holder}
      </p>
    `;
    div.querySelector('.account-item__copy')
       .addEventListener('click', () => copyText(item.account));
    inner.appendChild(div);
  });
}

function initAccordion() {
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!panel) return;

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        // 닫기: 현재 높이를 먼저 픽셀로 지정한 후 0으로 줄여야 애니메이션이 먹힙니다.
        panel.style.maxHeight = panel.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'false');
        
        requestAnimationFrame(() => {
          panel.style.maxHeight = '0';
        });
      } else {
        // 열기
        panel.style.maxHeight = panel.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
        
        // 완전히 열리면 다른 이벤트(예: 브라우저 리사이즈 등)에 대응하기 위해 제한 해제
        const handleTransitionEnd = () => {
          if (trigger.getAttribute('aria-expanded') === 'true') {
            panel.style.maxHeight = 'none';
          }
        };
        panel.addEventListener('transitionend', handleTransitionEnd, { once: true });
      }
    });
  });
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const el = document.createElement('textarea');
    el.value = text;
    el.style.cssText = 'position:fixed;opacity:0;';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
  showToast('계좌번호가 복사되었습니다');
}

// 최종 실행 함수
export function initAccount() {
  renderPanel('panelGroom', CONFIG.account.groom);
  renderPanel('panelBride', CONFIG.account.bride);
  initAccordion();
}