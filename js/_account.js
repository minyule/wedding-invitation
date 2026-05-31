const ACCOUNT_DATA = {
  groom: [
    { role: '신랑', name: '최낙훈', bank: '국민은행', number: '100-0000-1111' },
    { role: '신랑 아버지', name: '최명근', bank: '국민은행', number: '100-0000-1111' },
    { role: '신랑 어머니', name: '유정진', bank: '국민은행', number: '100-0000-1111' }
  ],
  bride: [
    { role: '신부', name: '김민영', bank: '국민은행', number: '100-0000-1111' },
    { role: '신부 아버지', name: '김동권', bank: '국민은행', number: '100-0000-1111' },
    { role: '신부 어머니', name: '고영희', bank: '국민은행', number: '100-0000-1111' }
  ]
};

const accountRoot = document.getElementById('account');

function createRow({ role, name, bank, number }) {
  const row = document.createElement('div');
  row.className = 'account-row';

  const text = document.createElement('div');
  text.className = 'account-row__text';

  const label = document.createElement('p');
  label.className = 'account-row__label';
  label.textContent = role;

  const details = document.createElement('p');
  details.className = 'account-row__details';
  details.textContent = `${bank} ${number} · ${name}`;

  text.append(label, details);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn-copy';
  button.textContent = '복사';
  button.dataset.account = number;
  button.addEventListener('click', handleCopy);

  row.append(text, button);
  return row;
}

function renderAccount() {
  if (!accountRoot) return;

  const groomContent = accountRoot.querySelector('.is-groom .accordion-content');
  const brideContent = accountRoot.querySelector('.is-bride .accordion-content');

  if (groomContent) {
    groomContent.innerHTML = '';
    ACCOUNT_DATA.groom.forEach(item => groomContent.appendChild(createRow(item)));
  }
  if (brideContent) {
    brideContent.innerHTML = '';
    ACCOUNT_DATA.bride.forEach(item => brideContent.appendChild(createRow(item)));
  }
}

function closeAllAccordions() {
  const items = accountRoot.querySelectorAll('.accordion-item');
  items.forEach(item => {
    item.classList.remove('is-open');
    const content = item.querySelector('.accordion-content');
    const header = item.querySelector('.accordion-header');
    if (content) {
      content.style.maxHeight = '0';
    }
    if (header) {
      header.setAttribute('aria-expanded', 'false');
    }
  });
}

function openAccordion(item) {
  const content = item.querySelector('.accordion-content');
  const header = item.querySelector('.accordion-header');
  if (!content || !header) return;

  item.classList.add('is-open');
  header.setAttribute('aria-expanded', 'true');
  content.style.maxHeight = `${content.scrollHeight}px`;
}

function toggleAccordion(item) {
  const isOpen = item.classList.contains('is-open');
  closeAllAccordions();
  if (!isOpen) {
    openAccordion(item);
  }
}

function handleHeaderClick(event) {
  const item = event.currentTarget.closest('.accordion-item');
  if (!item) return;
  toggleAccordion(item);
}

function handleHeaderKeydown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleHeaderClick(event);
  }
}

async function handleCopy(event) {
  const button = event.currentTarget;
  const accountNumber = button.dataset.account || '';

  try {
    await navigator.clipboard.writeText(accountNumber);
    button.textContent = '복사 완료';
    button.classList.add('is-copied');
    setTimeout(() => {
      button.textContent = '복사';
      button.classList.remove('is-copied');
    }, 1500);
  } catch (error) {
    console.warn('Clipboard copy failed', error);
  }
}

function bindAccountEvents() {
  if (!accountRoot) return;

  const headers = accountRoot.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', handleHeaderClick);
    header.addEventListener('keydown', handleHeaderKeydown);
  });
}

function initAccount() {
  renderAccount();
  bindAccountEvents();
}

export { initAccount };
