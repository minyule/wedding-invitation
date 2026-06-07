
const useRandomVersion = true; // true로 설정하면 랜덤으로 버전이 선택됩니다. false로 설정하면 아래에서 직접 버전을 선택할 수 있습니다.

export const VERSION = (() => {
  if (!useRandomVersion) {
    return '1';
  }

  const r = Math.random();

  const version =
    r < 0.45 ? '1' :
    r < 0.90 ? '2' :
    r < 0.99 ? '3' :
    '4';

  console.log(`VERSION: ${version}`);

  return version;
})();

// 1. 버전별 다르게 설정해야하는 내용은 여기에 작성합니다.
const VERSION_CONFIGS = [
  { 
    title: "Our Beginning",
    title_top: '9%',
    title_style: 'textContent'
  },
  { 
    title: "Save the Date",
    title_top: '9%',
    title_style: 'textContent'
  },
  { 
    title: "Two Hearts<br>One Journey",
    title_top: '70%',
    title_style: 'innerHTML'
  },
  { 
    title: "A New<br>Chapter Begins",
    title_top: '70%',
    title_style: 'innerHTML'
  }
];

// 2. 외부에서 CONFIG를 호출할 때 사용할 함수를 만듭니다.
export const getConfig = () => {
  // VERSION 숫자에 맞춰 안전하게 데이터를 가져옵니다. 
  // (VERSION이 1부터 시작한다고 가정)
  const versionData = VERSION_CONFIGS[VERSION - 1] || VERSION_CONFIGS[0];

  return {
    title: {
      text: versionData.title,
      top: versionData.title_top,
      style: versionData.title_style
    },
    groom: { role: "신랑", name: "최 낙 훈" },
    bride: { role: "신부", name: "김 민 영" },
    dateTime: "2026. 08. 29. SAT 13 : 00",
    venue: "라도무스아트센터 3F 아트리움홀",
    // calendar: { year: 2026, month: 8, day: 29 },
    greeting: [
      "여름의 끝자락에 만난 두 사람은<br>봄이 오면 함께 벚꽃을 보러 가자고<br>약속했습니다.",
      "그 약속처럼 서로의 계절이 되어<br>가장 아름다운 시간을 함께했습니다.",
      "이제 평생을 함께 걸어가고자 합니다.",
      "귀한 걸음으로<br>축복해주시면 감사하겠습니다."
    ],
    parents: {
      groom: {
        names: "최명근 · 유정진",
        relation: "의 장남",
        child: "최낙훈"
      },
      bride: {
        names: "김동권 · 고영희",
        relation: "의 장녀",
        child: "김민영"
      }
    },
    location: {
      venue: "라도무스아트센터",
      hall: "3F 아트리움홀",
      address: "대전 유성구 동서대로 639",
      addressDetail: "대전 유성구 원신흥동 578-6",
      coords: { lat: 36.3262, lng: 127.3385, name: "라도무스아트센터" }, // TODO: 이거 동작 잘 하는지 봐야함. 밑에 links 으로만 되는거같아서
    },
    links: {
      tmap: "https://tmap.life/d2eea2f4",
      kakao: "https://kko.to/ZuJQ8r42vA",
      naver: "https://map.naver.com/v5/search/라도무스아트센터웨딩홀"
    },
    transport: [
      {
        type: "자가용 이용 시",
        desc: [
          "내비게이션 : '라도무스 아트센터' 검색",
          "주차타워 진출입로가 혼잡하오니,",
          "조금 여유 있게 도착해 주시기 바랍니다."
        ]
      },
      {
        type: "대중교통 이용 시",
        desc: [
          "지하철 : 유성온천역 6번 출구",
          "버스 : 106, 115, 706번 이용",
          "106번, 115번 흥도초 하차 / 706번 법원등기국 하차 후",
          "도안네거리 방향으로 이동"
        ]
      },
      {
        type: "기차 이용 시",
        desc: [
          "대전역에서 603번 버스 탑승",
          "목원대학교 하차 후 도보 이동"
        ]
      },
    ],
    gallery: {
      imageCount: 18,
      galleryDescription: "화면을 새로고침해서 다른 버전의 청첩장을 확인해보세요."
    },
    account: {
      desc: [
        "소중한 축복의 마음<br>진심으로 감사드립니다.",
        "부득이한 사정으로<br>참석하지 못하는 분들을 위해<br>계좌번호를 안내드립니다."
      ],
      // (기존 groom, bride 계좌 데이터도 여기에 계속 관리하시면 됩니다)
      groom: [
        { relation: '신랑',      bank: '국민', account: '945802-00-002017', holder: '최낙훈' },
        { relation: '신랑 아버지', bank: '국민', account: '401-24-0381-933', holder: '최명근' },
        { relation: '신랑 어머니', bank: '국민', account: '406-21-0048-192', holder: '유정진' },
      ],
      bride: [
        { relation: '신부',      bank: '농협', account: '302-2895-4062-21', holder: '김민영' },
        { relation: '신부 아버지', bank: '국민', account: '542-3020-4096-154', holder: '김동권' },
        { relation: '신부 어머니', bank: '농협', account: '356-1338-7153-13', holder: '고영희' },
      ],
    }
  };
};

// 사용 시에는 import { getConfig } from './config.js'; 
// const CONFIG = getConfig(); 와 같이 호출해서 쓰시면 됩니다.