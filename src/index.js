const express = require('express');
const morgan = require('morgan');
const pool = require('./db')
    .then(pool => {
        console.log('Pool 생성 성공');
        
        pool.getConnection()
            .then(res => console.log('연결 성공'))
            .catch(err => console.log('연결 실패', err));
    })
    .catch(err => console.log('Pool 생성 에러', err));

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