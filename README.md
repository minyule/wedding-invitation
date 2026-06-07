## 1. 구성
- 파일 구조
  - index.html: 전체적인 구조를 잡음. 어느 위치에 어느 항목이 들어갈지, 어떤 디자인을 적용할지가 작성되어 있음.
  - css: 디자인
  - js: html 에서 구성한 항목에 어떤 내용, 로직을 넣을지 작성
- 화면 구성
  - intro: 첫 이미지와 인사말, 혼주/신랑신부 내용
  - calendar: 달력
  - location: 장소 - 약도 이미지, 오시는 길
  - gallery: 사진들, 선택했을 때 큰 이미지로 보이게 하는거
  - account: 계좌
  - share: 링크 공유 버튼

## 2. 사용 방법
- 단순 내용 변경: config.js 파일의 getConfig 내용을 수정
- 디자인, 구성 등 변경: "1. 구성" 을 참고하여 원하는 부분 수정
  - 복사해서 ai에게 수정해달라하면 됩니다.

## 3. config.js 파일 수정 방법
- useRandomVersion, VERSION, VERSION_CONFIGS 부분은 여러 디자인 보이려는 경우 사용
  - 사용하지 않을 시, useRandomVersion 를 false로 변경하고, 버전 나뉜 부분에 대해서는 1번만 작성
- getConfig: 단순 내용 변경 시 수정해야할 부분
  - title: 첫 화면 이미지에 대한 설정
    - text: 이미지 위에 보일 텍스트 (중간에 줄바꿈 추가하려면 `<br>` 작성)
    - top: 텍스트를 위에서부터 얼마나 떨어뜨려놓을지 (ex, '9%')
    - style: 텍스트 중간에 줄바꿈 있는 경우 'innerHTML', 아니면 'textContent'
- groom, bride, dateTime, venue: 메인 이미지 밑에 들어가는 내용
- greeting: Invitation 항목에 들어갈 첫 인사 문구
  - 단순 줄바꿈은 `<br>`, 간격이 있는 줄바꿈은 [] 내의 별도 항목으로 구성
- parents: Invitation 항목의 혼주, 관계 문구
- location: Location 항목에 들어가는 내용 (coords는 동작 안하는거 같음)
- links: 티맵, 카카오맵, 네이버맵 버튼 눌렀을때 이동할 링크
  - 각 어플에서 본인 식장 위치 검색, 공유하기 버튼으로 url 복사해서 수정하면 됨
- transport: 오시는 길
  - type: 항목별 제목
  - desc: 설명. 줄바꿈은 [] 안의 항목으로 분리
- gallery
  - imageCount: 갤러리에 포함할 이미지 개수
  - galleryDescription: 갤러리 밑에 쓰는 문구인데, 안써도 무방함
- account: 계좌
  - desc: 안내 문구. 단순 줄바꿈은 `<br>`, 간격 있는 줄바꿈은 [] 내 별도 항목 분리
  - groom, bride: 신랑측, 신부측 분리. 원하는 개수만큼 []의 항목으로 구성

## 4. 이미지 수정 방법
- 각 이미지를 정해진 위치에 정해진 이름으로 업데이트하면 적용됩니다. 파일 경로 및 파일 이름은 다음과 같음
- 메인 이미지: asset/image/1/main-image.jpg
- 중간 이미지: asset/image/1/sub-image.jpg
- 갤러리 이미지
  - 전체 이미지: asset/image/1/gallery/photo-[번호].jpg 형식
  - 썸네일 이미지: asset/image/1/gallery/thumb/photo-[번호].jpg 형식
  - 전체 이미지와 썸네일 이미지는 순서 맞춰주기

## 5. html 썸네일
- 카카오톡이나 팀즈나 블로그 등에서 링크 첨부할 때 뜨는 썸네일 이미지와 설명에 대한 설명
- index.html 의 <head> 내부 데이터 변경
  - <title>브라우저 탭 타이틀</title>
  - <meta property="og:title" content="사이트 제목">
  - <meta property="og:description" content="사이트 설명" />
  - <meta property="og:image" content="썸네일 파일 경로" />: 동작 안하는거 같음..

## 6. 설치할 것들
- vscode (https://ardentdays.tistory.com/57 참고)
- git (https://sfida.tistory.com/46 참고)

## 7. 수정하기 (https://poalim.tistory.com/46 참고)
- github 회원 가입 하기
- git repository를 fork 하고, git pull 받아서 수정한 후, git push 하기 

## 8. 테스트하기 (https://m.blog.naver.com/hpw0721/222174643027 참고)
- 최상위 폴더 (wedding-invitation) 을 vscode로 열기
- vscode - extensions - live server Install
- 좌측 파일 목록에서 index.html 파일 우클릭, Open with live server 선택
- 좀 기다리면 브라우저에서 뜸 (해당 PC에서만 확인 가능)

## 9. 배포하기 (https://phodobit.kr/49 참고)
- repository - settings - pages 에서 설정 