const express = require('express');
const morgan = require('morgan');

const authRouter = require('./layers/routers/user.router');

const app = express();

app.use(morgan);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

app.listen(3000, () => console.log(`Server is running on 3000`));