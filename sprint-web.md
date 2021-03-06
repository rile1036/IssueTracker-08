# :memo: Sprint
## :books: Sprint Backlog
[Google Spreadsheet :link:](https://docs.google.com/spreadsheets/d/19wkM--KlfBSZAe7_RBzZKZ5Rq0YNnLkuxhtWNhTGxDA/edit?usp=sharing)

## 👩‍💻👨‍💻 개발자
#### 🐳 : [권예지](https://github.com/Yejikwon)
#### 🐹 : [김도연](https://github.com/do02reen24)
#### 🐕 : [윤영우](https://github.com/yoonwoo123)

-----

## `💻 Sprint #3 - Day4`
### 📌 [FE] IssueProvider 구현
- reduce를 활용하여 프로바이더가 여러 개일 경우, 합쳐주는 IssueProvider를 구현했습니다.
    ~~~jsx
    const IssueProvider = ({ contexts, children }) =>
      contexts.reduce(
        (prev, context) =>
          createElement(context, {
            children: prev,
          }),
        children
      );
    ~~~
    
### 📌 [FE]  Issue, User Store & Reducer 구현
- Issue 페이지에 Store를 적용하여 이슈 생성 / 리스트 / 이슈 리스트 헤더 등에서 모두 상태관리가 가능하도록 리팩토링하였습니다.

### 📌 [FE]  상단 추가 필터 목록 구현
- 작성자 추가 필터 옵션 선택 시 팝업창으로 목록을 띄우게 구현했다.
- 이 때, `import { Dropdown } from 'semantic-ui-react'` 를 사용해봤는데 클래스를 또 따로 만들어서 디자인을 잡아줘야해서 불편함도 있었다.

### 📌 [FE] Close Issue, Reopen Issue 동적으로 구현
- Reducer를 사용하여 issueDetail Store의 isOpen 값을 변경해주었다.
- reducer 함수에서 새로운 상태를 만들 때에는 [불변성](https://react.vlpt.us/basic/20-useReducer.html)을 지켜주어야 하기 때문에 spread 연산자를 사용 [reducer](https://medium.com/@ca3rot/%EC%95%84%EB%A7%88-%EC%9D%B4%EA%B2%8C-%EC%A0%9C%EC%9D%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-%EC%89%AC%EC%9A%B8%EA%B1%B8%EC%9A%94-react-redux-%ED%94%8C%EB%A1%9C%EC%9A%B0%EC%9D%98-%EC%9D%B4%ED%95%B4-1585e911a0a6) 내부에서 스프레드 연산자를 사용하였다.

### 📌 [FE] Milestone 생성, 수정, 삭제 구현
- useContext와 useReducer를 사용하여 구현하였다.
- Label 페이지에서 비슷하게 구현을 했던 내용이라 이전보다는 깨끗하게 코드를 작성할 수 있었다. 하지만 아직도 개선할 점이 많이 남은 것 같다.

### 📌 [FE] 이모티콘 쉽게 import 하는 법 찾음
~~~js
@primer/octicons-react 설치
~~~

~~~js
import {
  IssueOpenedIcon,
  MilestoneIcon,
  IssueClosedIcon,
} from '@primer/octicons-react';
~~~

- [아이콘 종류 확인하는 사이트 😍](https://primer.style/octicons/)


---

## `💻 Sprint #3 - Day3`
### 📌 [FE] `useReducer`를 통한 Label 생성 및 제거 목록 관리
- label 생성과 제거시 label 목록을 동적으로 관리해야했는데 각기 다른 파일(componenet)에서 상태를 관리하는 것이 어려웠다. useReducer의 dispatch 를 활용하여 상태를 쉽게 관리할 수 있음을 알게 되었다.
```js
export const labelReducer = (labels, { type, payload }) => {
  switch (type) {
    case 'SET_INIT_DATA':
      return payload;

    case 'PUT_LABEL':
      return labels.map((label) => {
        if (label.id === payload.id) {
          label = payload;
        }
        return label;
      });

    case 'DELETE_LABEL':
      return labels.filter((label) => label.id !== payload);

    case 'NEW_LABEL_ADD':
      return [...labels, payload];

    default:
      break;
  }
};
```
### 📌 [FE] `useReducer`를 통한 Label 생성 탭 관리
- 위와 마찬가지로 동적으로 탭이 열리고 닫힐 필요가 있었고 이를 reducer를 통해 활용할 수 있었다. 각각의 상황에 따른 값을 정의해주어 탭의 상태를 관리하였다.
```js
export const newReducer = (isClickNew, { type }) => {
  switch (type) {
    case 'NEW_LABEL_TAB_OPEN':
      return true;

    case 'NEW_LABEL_TAB_CLOSE':
      return false;

    case 'NEW_LABEL_ADD':
      return false;

    default:
      break;
  }
};
```
### 📌 [FE] Issue Detail 페이지 사용자 정보 동적 할당 (match, useState, useEffect)
- useState를 사용하여 훅을 만들어서 페이지가 렌더링 될 때 useEffect로 한번만
  fetch하여 필요한 이슈작성자 정보를 가져와서 동적 할당하였다. match는 각 URL에 들어가는   issueId를 가져왔다.
- Open, Close의 상태에 따라 UI를 조건부 렌더링 하여 다르게 나타내었다.
- 
```jsx
export default function IssueDetailPage({ match, location }) {
  const [issueAuthorInfo, setIssueAuthorInfo] = useState('');
  const [issueId, setIssueId] = useState(1);
  const userId = localStorage.getItem('userId');

  const getIssueAuthorInfo = async () => {
    const id = match.params.issueId;
    setIssueId(id);
    const options = getOptions();
    const response = await fetch(GET_ISSUE(id), options);
    const responseJSON = await response.json();
    setIssueAuthorInfo(responseJSON.data[0]);
  };

  useEffect(() => {
    getIssueAuthorInfo();
  }, []);

```


### 📌 [FE] 코멘트 입력 시 코멘트 생성 버튼 활성화 입력이 안되어 있을 시 비활성화
- onChange와 Ref, useState 를 이용해서 변경사항을 바로 반영해주는 Handling 함수를
  만들어 버튼 활성화를 동작시켰다.
  
```jsx
  const IssueCommentForm = ({ issueId, userId }) => {
  const history = useHistory();
  const commentRef = useRef(false);
  const [comment, setComment] = useState('');
  const [userImage, setUserImage] = useState('');

  const createCommentData = () => {
    if (commentRef.current.value === '') {
      return;
    }

    const comment = {
      userId: userId,
      issueId: issueId,
      content: commentRef.current.value,
    };
```

## `💻 Sprint #3 - Day2`
### 📌 [FE] 컴포넌트 폴더 구조 변경
  - 컴포넌트 폴더에 관리할 파일들이 많아져 회의를 통해 폴더 구조를 구체화하였다.
      - 폴더 구조 예시
        ```
        /components
         ㄴ /issue
         ㄴ /milestone
            ㄴ MilestoneHeader.jsx
            ㄴ Milestone.jsx
         ㄴ /shared
            ㄴ /button
            ㄴ /container
                ㄴ MainContainer.jsx
                ㄴ HeaderContainer.jsx
        ```
    - 여러 item에서 재사용이 가능한 컴포넌트들은 `shared`에 넣고 그 외 component들은 자신이 속한 `item(ex. milestone, issue)` 폴더에 넣기로 결정하였다.

### 📌 [FE] 글자 수 동적 처리
  - useState를 활용해서 글자 수가 변경될 때마다 setTimeiot을 활용해서 0.5초마다 글자 수 체킹을 했다.
      - useState를 통해 동적으로 화면에 변화시키는 방식을 공부할 수 있었다.

### 📌 [FE] 시간 차이 계산하는 util 구현
  - 이슈를 보여줄 때, 현재 화면이 렌더링된 시간과 이슈가 생성된 시간의 차를 계산하여 화면에 보이기 위해 함수를 구현했다.
      - 60초 이하라면 -> 초 단위로 표현 (seconds ago)
      - 60분 이하라면 -> 분 단위로 표현 (minutes ago)
      - 60시간 이하라면 -> 시간 단위로 표현 (hours ago)
      - 그 이상이라면 -> days ago로 표현

### 📌 [FE] 배경 RGB 색깔을 분석하여 글씨색을 결정해주는 util 구현
- `const result =
    (redValue * 0.299 + greenValue * 0.587 + blueValue * 0.114) / 255;`
- 색깔 값에서 R, G, B 값을 뽑아내 위 식에 적용하였다.
- 결과 값이 0.5 보다 크면 검은 글씨를 0.5 보다 작으면 흰색 글씨를 반환해주었다.

### 📌 [FE] Custom Hook 개발
  - 이름이 `use`로 시작하고, 안에서 다른 Hook을 호출함을 통해 custom hook을 설계할 수 있다.
  - get 요청을 보내 데이터를 받기 전까지 loading을 띄우는 부분은 재활용할 수 있을 것 같아 custom hook 으로 분리하였다.

### 📌 [FE] Github Login
  - 얻은 유저 정보로 JWT Token 생성후 프론트로 반환
      - 반환 시 json 형태로 리턴해줘야 한다.
      - axios.post 반환을 .then(res) 형식으로 받아주어야 not found(404) Error를 해결할 수 있다.
  - 반환된 토큰을 프론트의 localstorage 저장.
  - `res.json(값)` 에서 값 부분이 잘못되어도 서버에서 별다른 오류를 return 하지 않음을 알게 되었다.
<br/>

## `💻 Sprint #3 - Day1`
### 📌 [FE] 스프린트3 역할 분배 및 이슈 생성
- [역할 분배 참조](https://docs.google.com/spreadsheets/d/19wkM--KlfBSZAe7_RBzZKZ5Rq0YNnLkuxhtWNhTGxDA/edit#gid=0)

### 📌[FE] 구현 사항
- [Header Link 추가](https://github.com/boostcamp-2020/IssueTracker-08/commit/849318da139dba939b482645f30449f9d219f835)
- [babel-polyfill 적용](https://github.com/boostcamp-2020/IssueTracker-08/commit/ada3c7dc01d24fa4b1cd178ea90bba413ef880de)
  - runtime에 babel 문법 변환이 일어나도록 babel-polyfill을 적용
  - babel-polyfill을 적용하지 않는 경우, chrome에서 regeneratorRuntime 에러가 발생하여 적용
- [이슈 내용 작성 시 현재 입력된 글자 수 표현 기능 구현](https://github.com/boostcamp-2020/IssueTracker-08/commit/712055e06dcdb25f7ef8e27b60f2003fc437ca2a)
   - 요구사항은 2초 간격이었지만, 텀이 너무 긴 것 같아 0.5초 간격으로 글자 수를 체킹하도록 구현

### 📌 [FE] github 로그인 기능
- React에서 useEffect함수를 사용하여 깃헙 OAuth의 CallBack URL을 갖는 컴포넌트를
  만들어서 URL의 code를 parsing 하여 백엔드로 요청을 보내게 설계.
- 백엔드에서 이를 받아 access_token을 얻고, 유저 정보를 얻음.
<br/>

<hr />

## `💻 Sprint #2 - Day5`

### 📌 [FE] Sprint 2에서 개발한 feature branch -> Dev-Client로 Merge 진행
- [dev-client <- feat-issue-create-ui](https://github.com/boostcamp-2020/IssueTracker-08/pull/189)
- [dev-client <- feat-issue-detail-ui](https://github.com/boostcamp-2020/IssueTracker-08/pull/190)
- [dev-client <- feat-issue-ui](https://github.com/boostcamp-2020/IssueTracker-08/pull/192)
<br/>

### 📌 JS tag 적용 내역
* [FE] Client 프로젝트 구축
   - [AS-IS] github 로그인 페이지, Main 페이지, 이슈 상세 페이지, 이슈 등록 기능 가능
* [BE] API Cors 설정 적용
* [BE] API 기능 추가 및 개선
   - [AS-IS] Issue & Comment Assignee 정보 추가 반환
   - [AS-IS] status가 fail인 경우 status 값만 넘기도록 수정
   - [AS-IS] Github 가입시 새로운 user 생성시 imageURL 문제 수정
   - [AS-IS] 모든 사용자(Assignee)를 반환해주는 API 추가 
   - [AS-IS] Milestone 정보 반환 API 추가
   - [AS-IS] Issue 삭제 API 추가
   - [AS-IS] 로그인 여부 반환하는 API 추가
   - [AS-IS] label get API 추가
<br/>

## `💻 Sprint #2 - Day4`
### 📌 [FE] 로그인 여부에 따른 이동 페이지 설정 ✨
- 참고 코드: `/shared/App.jsx`
<br/>

### 📌 [FE] Prettier Formatter 설정 ✨
- 내 vscode에서 prettier가 안될 경우 아래 사이트를 참고해주세요
    - [Prettier로 Default Formatter 설정 방법](https://pusha.tistory.com/entry/Prettier-%EC%A0%80%EC%9E%A5%EC%8B%9C-%EC%97%90%EB%9F%AC-%EC%BD%94%EB%93%9C%EA%B0%80-%EA%B0%84%ED%97%90%EC%A0%81%EC%9C%BC%EB%A1%9C-%EB%82%98%ED%83%80%EB%8A%94-%EC%97%90%EB%9F%AC-settingjson-vscode)
    - **`vscode -> [파일] -> [기본설정] -> [설정] -> editor.default formatter 변경`**
<br/>

### 📌 [FE] config.js 파일 ✨
- src 디렉토리 밑에 파일 생성해주기
~~~js
export const BASE_URL = 'http://118.67.131.96:3000/';
~~~
<br/>

### 📌 [BE] API enhancement ✨
> 구현 내용 및 작업 했던 내역

- [x] [Backend] 이슈에 할당된 Assignee 이름 외에 추가 정보 반환해주기
    -  userId, imageUrl 정보를 추가해줬습니다.
- [x] [Backend] 이슈에 Comment 사용자의 이름 외에 이미지 url, id 추가 반환해주기
- [x] [Backend] 모든 사용자(Assignee) 반환해주는 API 제작하기
- [x] [Backend] milestone get API 수정하기
- [X] [Backend] status -> fail인 경우 status 값만 넘기기
    - 모든 API 전부 다 고치기
- [x] [Backend] 이슈 삭제하기
- [x] [Backend] Github 가입시 새로운 user 생성시 imageURL 문제 고치기
- [x] [Backend] 로그인 여부 반환하는 API 만들기
- [x] [Backend] label get API 만들기
<br/>

### 📌 [BE] Cors 설정 추가 ✨
- fetch 요청 시, cors 옵션 추가해줬음
- Backend app.js cors 설정 추가해줬음
-----
<br/>

## `💻 Sprint #2 - Day3`
### 📌 [FE] React-router를 적용하여 프로젝트 구조 변경
* `react-router-dom`은 웹에서 쓰이는 컴포넌트이고, `react-router-native`는 react-native를 활용한 앱개발에 쓰이는 컴포넌트를 포함하고 있다. `react-router`는 이 둘을 합친 패키지이다.
* https://velopert.com/3417 를 참고하여 진행하였다.
* `react-router-dom`만 설치하기로 했다.
```bash
npm install -d react-router-dom
```
* 디렉토리 구조 설계
    * 기존
        * src/components: 컴포넌트들이 위치하는 디렉토리
        * src/pages: 각 라우트들이 위치하는 디렉토리

    * 추가된 디렉토리
        * src/utils: 자주 사용되는 함수들을 모아놓은 디렉토리
        * src/shared: 서버와 클라이언트에서 공용으로 사용되는 컴포넌트 App.js 가 여기에 위치함
        * src/client: 브라우저 측에서 사용할 최상위 컴포넌트
* url로 직접 router에 접근하니 동작하지 않고 404 error가 발생했다.😥
    * 버튼(Link)을 클릭해서 넘어가는 라우팅 이벤트는 무사히 동작하였다.
* pages라는 디렉토리 네이밍도 아직 와닿지 않고(views 많이 썼었는데,,) shared도,, client도.. 진짜 생소한 게 많아서 리액트에 아직 정이 안갑니다 ^^7

### 📌 [FE] CSS-in-JS 적용하기
* 과제 요구사항을 읽어보니 CSS-in-JS를 적용해야함을 알게 되어 수정하였다.
```bash
npm install -d styled-components
```
* SCSS로 적용하고 싶었는데 너무 아쉽네요 8ㅅ8😂

### 📌 [BE] 로그인 callback...
* 구현한 OAuth Login의 결과 값을 어떻게 FE와 iOS에 전달할 수 있을지 많은 고민을 하였다. 🤔
* [redirect의 url로 token을 넘겨주는 방법](https://stackoverflow.com/questions/47599087/how-to-send-jwt-to-react-client-from-a-callback)은 아닌 것 같고...
* githubOAuth로 로그인하면 발급되는 code와 client_id, client_secret을 이용하여 post요청으로 access_token을 발급하려고 할 수 있는 모든 방법을 시도해 보았으나 무슨 이유에서인지 에러가 발생했다.. 나중에 다시 시도해야겠다.
  [참조링크](https://devhyun.com/blog/post/15)
<br/>

## `💻 Sprint #2 - Day2`
### 📌 [BE] npm 명령어 실종...!
* 서버에서 npm 명령어를 쳤을 때 command not found 조차 뜨지 않았다.
* 서버를 재부팅했다. 재부팅하니까 npm 명령어가 안되던 오류가 해결되었다.
* 새로 clone하고 npm과 node, pm2를 재설치했다.
* 말을 안듣는 서버...

### 📌 [FE] 프론트엔드 환경변수 설정 및 scss 색깔 규칙 설정
* 프론트에서는 .env 대신 src 아래에 config.js 파일을 생성하여 환경변수를 설정하였다.
  [참조링크](https://hello-bryan.tistory.com/134)
* scss파일 재사용을 위해 Client 아래에 scss폴더를 만들고 _color.js 와 같이 만들어서
  다른 scss에서 import해서 사용 하기로 결정하였다.
  [참조링크](https://heropy.blog/2018/01/31/sass/)
* _color.js에서 자주 쓰는 색깔은 변수처럼 네이밍하여 사용하기로 하였다.
  ```css
  $gray-100: #f8f9fa !default;
  // $색깔-숫자값: #색상값
  // 기본 색상은 블루는 500을 갖는다.
  // 낮은 숫자일수록 연한 색이고 높은 숫자일수록 어두운 색을 의미한다. 
  ```
  * 100 ~ 999 사이의 숫자를 색깔 뒤에 붙여 사용하기로 했다.
<br/>

## `💻 Sprint #2 - Day1`
### 📌 [FE] Client 프로젝트 생성
* create react app 없이 프로젝트를 생성했다.
* react에 능숙한 사람이 없어 팀원 모두 zoom에 접속하여 함께 찾아보며 결정하였다.
* js와 jsx는 기능은 동일하지만 React에서 권장하는 jsx를 사용하기로 하였다.
* React 프로젝트의 폴더 구조를 설계하였다. 👍👍
    * ex) Routes.jsx 가 모든 경로를 갖고있다.
        ```bash
        ㄴ /Client
            App.jsx
            App.scss
            ㄴ /src
                ㄴ /components
                    ㄴ Routes.jsx
                    ㄴ /navbar
                        ㄴ Navbar.jsx
                        ㄴ Navbar.scss
                    ㄴ /form
                        ㄴ IssueAddForm.jsx
                        ㄴ IssueAddForm.scss

                ㄴ /pages
                    ㄴ /login
                        ㄴ LoginPage.jsx
                        ㄴ LoginPage.scss 
        ```
<br/>

### 📌 [FE] webpack 버전 관리
* 최신 버전의 webpack-dev-server/webpack-cli를 사용하니
  webpack-dev-server를 실행 시 에러가 발생했다.
* 의존성이 확인된 버전을 찾아 변경 후, 재실행을 진행했더니 에러를 해결할 수 있었다.
* 버전 관리의 중요성을 다시 한 번 느꼈다.

-----

## :computer: **`Sprint #1 - Day5`**
### 📌 [BE] Sprint 1에서 개발한 feature branch -> Dev-Server로 Merge 진행
- [dev-server <- feat-issue-api merge](https://github.com/boostcamp-2020/IssueTracker-08/pull/97)
- [dev-server <- feat-milestone-api merge](https://github.com/boostcamp-2020/IssueTracker-08/pull/98)
- [dev-server <- Feat signin api Merge](https://github.com/boostcamp-2020/IssueTracker-08/pull/101)

> 충돌을 어떻게 해결하는 게 가장 좋을까?
- 팀원들이 같이 있으면서 코드를 본다.
- `fork` 등의 github GUI 툴을 사용하여 브랜치와 저장소 관리의 도움을 받으면 더 쉽다.
- 충돌이 크지 않다면 github web 편집으로 쉽게 merge할 수 있다.

> sub query
```mysql
GET_OPEN_ISSUES:
  `SELECT issue.id as issueId, < 3번 : issue.id를 가져와서 issueID라 정의
  
  (SELECT user.email FROM user WHERE user.id = issue.userId) as email, < 4번 : where이 성립할 때 유저의 email 가져와서 email이라 정의 이하 동문
  
  (SELECT user.name FROM user WHERE user.id = issue.userId) as name,
  
  (SELECT milestone.title FROM milestone WHERE issue.milestoneID = milestone.id) as milestone,
  
  issue.title, issue.content, issue.isOpen, issue.createAt, issue.closeAt
  
  FROM issue < 1번 : 이슈로부터
  
  WHERE issue.isOpen = 1`, < 2번 : issue의 isOpen이 true일 때
```

### 📌 [BE] 자주 사용되는 부분은 template로 관리
~~~javascript
  makeIssueTemplate: async (results) => {
    const issueList = [...results.data[0]];

    for (let issue of issueList) {
      const labelList = await requestQuery(query.GET_LABELS_BY_ISSUE_ID, [
        issue.issueId,
      ]);
      const assigneeResults = await requestQuery(
        query.GET_ASSIGNEES_BY_ISSUE_ID,
        [issue.issueId]
      );
      const assigneeList = [];

      for (let assign of assigneeResults.data[0]) {
        assigneeList.push(assign.name);
      }

      issue.label = labelList.data[0];
      issue.assign = assigneeList;
    }

    return issueList;
  },
~~~

## :computer: **`Sprint #1 - Day4`**

### 📌 [BE] issue return 형식
~~~
{
    "status": "success",
    "data": [
        {
            "issueId": 1,
            "email": "test@github.com",
            "name": "test",
            "milestone": "FE",
            "title": "ViewCreate",
            "content": "we develop",
            "isOpen": 1,
            "createAt": "2020-01-02T15:00:00.000Z",
            "closeAt": "2020-01-02T15:00:00.000Z",
            "label": [
                {
                    "labelName": "web",
                    "labelColor": "#121212",
                    "labelDescription": "fighting"
                },
                {
                    "labelName": "FE",
                    "labelColor": "#243412",
                    "labelDescription": "fighting"
                }
            ],
            "assign": [
                "test",
                "reality"
            ]
        },
    ]
}
~~~

### 📌 [BE] content not null 조건을 null로 변경

- 화면에서 content가 비어있을 경우 `no description provided` 메세지를 다른 글씨로 띄워주기 위해서 `null`로 content로 설정가능하게 하였다.
    - NOT NULL 제거
    
    ```mysql
    ALTER TABLE issue modify content text NULL;
    ```
    
* 쿼리문의 DDL, DML은 대문자로 나머지는 소문자로, 마지막에는 세미콜론 안붙이기
* 라우터 코드 순서
    * get -> post -> put -> delete 별로 코드를 띄워쓰기로 하였다.
    * 함수명은 각 get, create, update, delete 의 단어를 써서 작성하기로 결정하였다.
* put과 patch 중 put 사용으로 통일하기로 결정하였다.

## :computer: **`Sprint #1 - Day3`**
### 📌 [BE] 코딩 컨벤션 작성
* [코딩컨벤션 작업 결과 :link:](https://github.com/boostcamp-2020/IssueTracker-08/wiki/Javascript-%EC%BD%94%EB%94%A9-%EC%BB%A8%EB%B2%A4%EC%85%98)
* TOAST와 Google의 코딩 컨벤션을 기반으로 코딩 컨벤션을 결정하였다.

### 📌 [BE] issue CRUD API, query문 틀 구성 
* 관련 PR : `#81`
* 작업 스타일을 맞추기 위해 첫 API는 화면을 공유하며 팀원 전원이 참여하여 개발하였다.


### 📌 [BE] Datebase 스키마 변경
* 관련 issue : `#15`
- user 테이블`email` 컬럼 추가
  - 기존에 user 테이블에서 사용자 로그인 정보에서 `name` 만 저장하도록 했는데, API를 구현하면서 `email`정보도 추가로 필요함을 느껴 추가하였다. 
- milestone 테이블 컬럼 일부 수정
    - 이슈 open, close 관리하던 컬럼을 삭제하였다.
    - 매 issue 변경 시마다 트리거로 관리하는 횟수보다, milestone 페이지에 사용자가 들어왔을 때 issue 개수를 확인하는 횟수가 적을 것으로 판단해서 변경하였다.
- issue_label table 수정
    - 연결이 user table에 잘못 연결 되어 있어서 올바르게 수정

### 📌 [BE] VSCode 확장 파일 설정

- eslint, prettier의 설정을 팀원 모두 동일하게 설정하였다.
    - eslint 스페이스 2칸, ; 생성
