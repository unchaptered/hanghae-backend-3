const express = require('express');

const authRouter = require('./layers/routers/user.router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

app.listen(3000, () => console.log(`Server is running on 3000`));