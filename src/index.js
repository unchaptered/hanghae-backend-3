const express = require('express');
const morgan = require('morgan');

const authRouter = require('./layers/routers/user.router');
const articleRouter = require('./layers/routers/article.router');

const app = express();

app.use(morgan);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/article', articleRouter);

app.listen(3000, () => console.log(`Server is running on 3000`));