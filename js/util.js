
export function showToast(message) {
  const toast = document.getElementById('copyToast');
  if (!toast) return; // 토스트 엘리먼트가 없을 때 에러 방지
  
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2000);
}

export const VERSION = (() => {
  // return '4';

  const r = Math.random();

  const version =
    r < 0.45 ? '1' :
    r < 0.90 ? '2' :
    r < 0.99 ? '3' :
    '4';

  console.log(`VERSION: ${version}`);

  return version;
})();
