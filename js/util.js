
export function showToast(message) {
  const toast = document.getElementById('copyToast');
  if (!toast) return; // 토스트 엘리먼트가 없을 때 에러 방지
  
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2000);
}

export const VERSION = (() => {
  const secret = 0.2;
  const rest = (1 - secret) / 2;
  const r = Math.random();

  const version =
    r < rest ? '1' :
    r < rest * 2 ? '2' :
    '3';

  console.log(`VERSION: ${version}`);

  return version;
})();
