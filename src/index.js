const express = require('express');
const morgan = require('morgan');
const pool = require('./db');

pool.getConnection()
    .then(() => console.log('연결 성공'))
    .catch(err => console.log('연결 실패', err));

const authRouter = require('./layers/routers/auth.router');
const articleRouter = require('./layers/routers/article.router');
const commentRouter = require('./layers/routers/comment.router');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/article', articleRouter);
app.use('/comment', commentRouter);

app.listen(3000, () => console.log(`Server is running on 3000`));
