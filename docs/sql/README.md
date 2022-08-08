[< 뒤로가기](../README.md)

## 테이블 명세서

> 작성일 : `2022-08-06`

- PK : 기본 키 > Index
- FK : 참조 키 > Index
- UN : 고유 키
- NN : NOT NULL
- AI : Auto Increment

<br><hr><br>

### 유저

| 키        | 타입       | 범위          | DB 범위       | 제약 조건 |
| :-------- | :-------- | :------------ | :------------ | :------- |
| user_id   | number    |               | INTEGER       | NN PK  AI |
| nickname  | string    | 2 <= - <= 15  | VARCHAR(15)   | NN UN     |
| password  | string    | 4 <= - <= 20  | `VARCHAR(255)` | NN       |

<br><hr><br>

### 게시글

| 키        | 타입       | 범위          | DB 범위       | 제약 조건 |
| :-------- | :-------- | :------------ | :------------ | :------- |
| article_id | number   |               | INTEGER       | NN PK AI |
| user_id    | number   |               | INTEGER       | NN FK(`user.user_id`) |
| title      | string   | 1 <= - <= 50  | VARCHAR(50)   | NN       |
| content    | string   | 1 <= - <= 250 | VARCHAR(250)  | NN       |

<br><hr><br>

### 댓글

| 키        | 타입       | 범위          | DB 범위       | 제약 조건 |
| :-------- | :-------- | :------------ | :------------ | :------- |
| comment_id | number   |               | INTEGER       | NN PK AI |
| article_id | number   |               | INTEGER       | NN FK(`article.article_id`)  |
| user_id    | number   |               | INTEGER       | NN FK(`user.user_id`) |
| content    | string   | 1 <= - <= 250 | VARCHAR(250)  | NN       |

<br><hr><br>

### 게시글 좋아요

| 키        | 타입       | 범위          | DB 범위       | 제약 조건  |
| :-------- | :-------- | :------------ | :------------ | :-------- |
| like_id   | number    |               | INTEGER       | NN PK AI  |
| article_id | number   |               | INTEGER       | NN FK(`article.article_id`) |
| user_id    | number   |               | INTEGER       | NN FK(`user.user_id`) |
| is_like    | boolean  |               | BOOLEAN       |                       |

<br><hr><br>

### 댓글 좋아요

| 키        | 타입       | 범위          | DB 범위       | 제약 조건  |
| :-------- | :-------- | :------------ | :------------ | :-------- |
| like_id   | number    |               | INTEGER       | NN PK AI  |
| comment_id | number   |               | INTEGER       | NN FK(`comment.comment_id`) |
| user_id    | number   |               | INTEGER       | NN FK(`user.user_id`) |
| is_like    | boolean  |               | BOOLEAN       |                       |