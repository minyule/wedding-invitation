function renderCalendar(containerId, year, month, highlightDay) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  const monthDate = new Date(year, month - 1, 1);
  const monthLabel = `${year}년 ${String(month).padStart(2, '0')}월`;
  const daysInMonth = new Date(year, month, 0).getDate();
  const startDay = (monthDate.getDay() + 6) % 7;

  const label = document.createElement('div');
  label.className = 'calendar__month-label';
  label.textContent = monthLabel;
  container.appendChild(label);

  const weekdayHeader = document.createElement('div');
  weekdayHeader.className = 'calendar__weekday-header';
  const weekdays = ['월','화','수','목','금','토','일'];
  weekdays.forEach((day, index) => {
    const dayEl = document.createElement('span');
    dayEl.textContent = day;
    if (index === 5) dayEl.classList.add('saturday');
    if (index === 6) dayEl.classList.add('sunday');
    weekdayHeader.appendChild(dayEl);
  });
  container.appendChild(weekdayHeader);

  const grid = document.createElement('div');
  grid.className = 'calendar__grid';

  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement('span');
    empty.className = 'calendar__cell empty';
    empty.textContent = '';
    grid.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('span');
    cell.className = 'calendar__cell';
    cell.dataset.day = String(day).padStart(2, '0');
    cell.textContent = String(day);

    const weekdayIndex = (startDay + day - 1) % 7;
    if (weekdayIndex === 5) cell.classList.add('saturday');
    if (weekdayIndex === 6) cell.classList.add('sunday');
    if (day === highlightDay) cell.classList.add('wedding-day');

    grid.appendChild(cell);
  }

  container.appendChild(grid);
}
