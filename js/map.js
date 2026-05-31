const MAP_COORDINATES = {
  lat: 36.3637,
  lng: 127.3358,
  name: '라도무스아트센터웨딩홀'
};

function getMapElement() {
  return document.getElementById('map');
}

function initMap() {
  const mapEl = getMapElement();
  if (!mapEl) return;

  if (window.kakao && kakao.maps) {
    const center = new kakao.maps.LatLng(MAP_COORDINATES.lat, MAP_COORDINATES.lng);
    const map = new kakao.maps.Map(mapEl, {
      center,
      level: 4
    });

    const marker = new kakao.maps.Marker({ position: center });
    marker.setMap(map);

    const infoWindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:8px 12px;font-size:0.95rem;color:#333;">${MAP_COORDINATES.name}</div>`
    });

    kakao.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(map, marker);
    });
  } else {
    mapEl.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--color-text-muted);padding:1rem;text-align:center;">지도 로드 대기 중 — APP_KEY를 index.html에 추가하세요.</div>';
    console.warn('Kakao Maps SDK not found. Add SDK script with your APP_KEY in index.html.');
  }
}

function setupMapButtons() {
  const tmapButton = document.getElementById('tmap-button');
  const kakaomapButton = document.getElementById('kakaomap-button');
  const navermapButton = document.getElementById('navermap-button');

  if (tmapButton) {
    tmapButton.addEventListener('click', () => {
      const nativeUrl = `tmap://search?name=${encodeURIComponent(MAP_COORDINATES.name)}&lon=${MAP_COORDINATES.lng}&lat=${MAP_COORDINATES.lat}`;
      const webUrl = 'https://tmap.life/라도무스아트센터';
      window.location.href = nativeUrl;
      setTimeout(() => { window.location.href = webUrl; }, 500);
    });
  }

  if (kakaomapButton) {
    kakaomapButton.addEventListener('click', () => {
      const nativeUrl = `kakaomap://look?p=${MAP_COORDINATES.lat},${MAP_COORDINATES.lng}`;
      const webUrl = `https://map.kakao.com/link/to/${encodeURIComponent(MAP_COORDINATES.name)},${MAP_COORDINATES.lat},${MAP_COORDINATES.lng}`;
      window.location.href = nativeUrl;
      setTimeout(() => { window.location.href = webUrl; }, 500);
    });
  }

  if (navermapButton) {
    navermapButton.addEventListener('click', () => {
      const nativeUrl = `nmap://place?lat=${MAP_COORDINATES.lat}&lng=${MAP_COORDINATES.lng}&name=${encodeURIComponent(MAP_COORDINATES.name)}&appname=com.wedding.invitation`;
      const webUrl = `https://map.naver.com/index.nhn?lng=${MAP_COORDINATES.lng}&lat=${MAP_COORDINATES.lat}&title=${encodeURIComponent(MAP_COORDINATES.name)}`;
      window.location.href = nativeUrl;
      setTimeout(() => { window.location.href = webUrl; }, 500);
    });
  }
}

export { initMap, setupMapButtons };
