[< 돌아가기](./README.md)

## ENV 설정서

> 작성일 : `2022-08-06`

`.env` 파일 설정을 위한 Key 리스트입니다.

```env
# Base
PORT = 3000

# Database

MYSQL_HOST = 접속-주소
MYSQL_USER = 접속-계정명
MYSQL_DATABASE = 접속-DB-이름
MYSQL_PASSWORD = 접속-계정-비밀번호
MYSQL_WAIT_FOR_CONNECTION = true
MYSQL_CONNECTION_LIMIT = 10

# Ecnryt

BCRYPT_SALT

# Jwt

JWT_SECRET = JWT-시크릿-키
JWT_ALGORITHM = HS256
```