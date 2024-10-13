## 프로젝트 실행 방법

- node 16 버전 이상
- 프로젝트 root 경로에서 npm install 로 패키지 다운로드
- npm start 실행 (localhost:3000)
- Prettier 사용 (vscode extension)

## 사용 라이브러리

- react 16.14.0
- typescript 4.9.5
- atlaskit (UI 라이브러리)
  - 프로젝트 내 UI 개발을 위해 사용
  - button, datetime-picker, dynamic-table, form, modal-dialog, select, textarea, textfield
- ant-design (UI 라이브러리)
  - 프로젝트 내 UI 개발을 위해 사용
  - message alert을 위해 사용
- tailwind (CSS 라이브러리)
- axios (REST API 통신 라이브러리)
- i18next (다국어 처리 라이브러리)
- recoil (다국어 상태값 전역 관리를 위해 사용)
- moment (시간 데이터 포멧팅을 위해 사용)

## 디렉토리 구조

- /components : 컴포넌트
- /locales : 다국어 관련 폴더
- /pages : UI 페이지
- /service : store, api 호출
- /type : tpyescript type 폴더
- /util : 공통 함수 폴더
- 실무에서는 각 폴더에 프로젝트 메뉴나, 도메인에 따라 세분화 하여 관리합니다.

## 주요 기능

1. 사용자 / 게시물 / 할일 페이지로 구성하였습니다.
2. 우상단에 언어 변경 기능이 있습니다.
   localStorage를 사용하여 언어설정을 저장, 설정하였습니다.
3. 사용자 페이지에서는 이름으로 검색이 가능하며 상세 모달을 통해 사용자 상세 조회/수정이 가능합니다.
4. 게시물 페이지에서는 이름, 날짜로 검색이 가능하며 상세 모달을 통해 게시물과 댓글 조회/수정이 가능합니다.
5. 할일 페이지에서는 완료된 항목을 체크 아이콘을 통해 확인 할 수 있습니다.
