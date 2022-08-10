[< 돌아가기](../README.md)

## API 리스트

> 작성일 : `2022-08-06`
> [기능 리스트](./%EA%B8%B0%EB%8A%A5%20%EB%A6%AC%EC%8A%A4%ED%8A%B8.md) 를 기준으로 만들어 졌습니다.

| 설명              | 경로                          | Body 유무 |  Bearer 토큰 | 담당자 |
| :--------------- | :---------------------------- | :-------- | :---------- | :---- |
| 회원가입          | POST /auth/join               | { nickname, password, confirm } | - | @codeing999 |
| 로그인            | POST /auth/login              | { nickname, password }  | - | @codeing999 |
| 게시글 작성       | POST /article                 | { title, content } | - | @unchaptered |
| 게시글 조회       | GET /article                  | - | - | @unchaptered |
| 게시글 상세 조회  | GET /article/:id              | - | - | @unchaptered |
| 게시글 수정       | PUT /article/:id              | { title, content } | - | @unchaptered |
| 게시글 삭제       | DELETE /article/:id           | - | - | @unchaptered |
| 게시글 좋아요     | PUT /article/:id/toggle-like  | { isLike } | - | @rumaro122  |
| 댓글 작성         | POST /comment                 | { content }| -  | @JeungHoSub |
| 댓글 조회         | GET /comment                  | | - | @JeungHoSub |
| 댓글 수정         | PUT /comment/:id              | | - | @JeungHoSub |
| 댓글 삭제         | DELETE /comment/:id           | | - | @JeungHoSub |
| 댓글 좋아요       | PUT /comment/:id/toggle-like  | { isLike } | - | @rumaro122  |

### 하위 문서 목록

1. [User 명세서](./user.md)
2. [Article 명세서](./article.md)
3. [Comment 명세서](./comment.md)