// 💡 function 앞에 export를 붙이고, 인자(year, month, day)를 받을 수 있게 수정합니다.
export function renderCalendar(containerId, YEAR, MONTH, DAY) {
  // 월 레이블
  document.getElementById('calMonthLabel').textContent =
    `${YEAR}년 ${String(MONTH).padStart(2, '0')}월`;

  const startMonday = false;

  // 요일 헤더 (월요일 시작)
  const DAYS = startMonday ? ['월', '화', '수', '목', '금', '토', '일'] : ['일', '월', '화', '수', '목', '금', '토'];
  const head = document.getElementById('calHead');
  
  // 기존에 쌓인 게 있다면 비워주기 (안전장치)
  head.innerHTML = ''; 
  
  DAYS.forEach((d, i) => {
    const th = document.createElement('th');
    th.textContent = d;
    if (startMonday) {
      if (i === 5) th.className = 'col-sat';
      if (i === 6) th.className = 'col-sun';
    } else {
      if (i === 0) th.className = 'col-sun';
      if (i === 6) th.className = 'col-sat';
    }
    head.appendChild(th);
  });

  // 1일 요일 계산 (월요일 = 0 기준으로 변환)
  const firstDow  = new Date(YEAR, MONTH - 1, 1).getDay(); // 0=일
  const startOffset = startMonday
    ? (firstDow === 0 ? 6 : firstDow - 1)
    : firstDow;
  const lastDate  = new Date(YEAR, MONTH, 0).getDate();

  const body = document.getElementById('calBody');
  body.innerHTML = ''; // 기존 내용 비워주기
  
  let tr = document.createElement('tr');
  let cellCount = 0;

  // 시작 전 빈 칸
  for (let i = 0; i < startOffset; i++) {
    tr.appendChild(Object.assign(document.createElement('td'), { className: 'cal-empty' }));
    cellCount++;
  }

  // 날짜 셀
  for (let d = 1; d <= lastDate; d++) {
    const colIndex = cellCount % 7; // 0=월 ... 5=토 6=일
    const td = document.createElement('td');
    if (startMonday) {
      if (colIndex === 5) td.className = 'col-sat';
      if (colIndex === 6) td.className = 'col-sun';
    } else {
      if (colIndex === 0) td.className = 'col-sun';
      if (colIndex === 6) td.className = 'col-sat';
    }
    if (d === DAY)      td.classList.add('cal-wedding');

    const span = document.createElement('span');
    span.textContent = d;
    td.appendChild(span);
    tr.appendChild(td);
    cellCount++;

    // 7개 차면 행 추가 후 새 행 시작
    if (cellCount % 7 === 0) {
      body.appendChild(tr);
      tr = document.createElement('tr');
    }
  }

  // 마지막 행 남은 칸 채우기
  if (cellCount % 7 !== 0) {
    const remain = 7 - (cellCount % 7);
    for (let i = 0; i < remain; i++) {
      tr.appendChild(Object.assign(document.createElement('td'), { className: 'cal-empty' }));
    }
    body.appendChild(tr);
  }
}

// ❌ 맨 밑에 있던 initCalendar(); 호출 코드는 삭제합니다.