# 항해 주특기 3주차 팀 과제

> 본 저장소는 항해99 주특기 숙련주차에 진행된 팀 단위로 서버 개발에 제작되었습니다.<br>
> [JeungHoSub/hanghae_node3week](https://github.com/JeungHoSub/hanghae_node3week)

<hr>

### 소개글

항해99 숙련 주차의 과제에서 구현한 내용인

1. 회원가입
2. 로그인
3. 글
4. 댓글
5. 글, 댓글 좋아요

을 가지고 Layered Architecture Pattern을 적용하여

1. controller (article, auth, comment)
2. service (article, auth, comment)
3. repository (article, auth, comment)

구분하고, 숙련 주차과제를 개선하였습니다.

주소 : 54.180.142.87

![](./Logic.png)

<hr>

### 참여자

- @JeungHoSub - [GitHub](https://github.com/JeungHoSub) / [Velog](https://velog.io/@wlwjsan)
- @Rumaro122 - [GitHub](https://github.com/Rumaro122) 
- @codeing999 - [GitHub](https://github.com/codeing999) / [Velog](https://velog.io/@mero)
- @unchaptered - [GitHub](https://github.com/unchaptered) / [Velog](https://github.com/unchaptered)

<hr>

### 문서 리스트

> 문서 리스트를 확인하시려면 [자세히 보기](./docs/README.md) 를 클릭해주세요.

1. Git 관련 문서
2. API 관련 문서
3. DB 관련 문서
4. 기타 문서

<hr>

### 폴더 구조

```cmd
root
├ /.github              # GitHub 에서 제공해주는 Issue 및 PR 탬플릿 기능을 사용 중입니다.
├ /docs                 # 작업을 진행하면서 정한 각종 규칙과 설명 들이 문서화 되어 있습니다.
├ /src
│ ├ /layers             # Layered Architecture 패턴에 따라서 분리된 3 계층과 Router 가 들어있습니다.
│ ├ /modules            # Jwt 나 Bcrypt 와 같이 특수한 라이브러리 를 가공해 만든 Module 이 들어있습니다.
│ ├ db.js               # 데이터베이스 연결 Module 이 들어있습니다.
│ ├ env.js              # 환경변수 호출 Module 이 들어있습니다.
│ └ index.js            # 서버 실행 부분입니다.
├ package-lock.json
├ package.json
└ README.md
```

<hr>

### 모듈 리스트

```json
"dependencies": {
    "bcrypt": "^5.0.1",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "joi": "^17.6.0",
    "jsonwebtoken": "^8.5.1",
    "morgan": "^1.10.0",
    "mysql2": "^2.3.3"
},
"devDependencies": {
    "nodemon": "^2.0.19"
}
```