const envSwitcher = (MODE) => {
    const dotenv = require('dotenv');
    const path = MODE === 'prod' ? '.env.prod' : MODE === 'dev' ? '.env.dev' : '.env.test';

    dotenv.config({
        path: '.env.dev',
    });

    return path;
};

module.exports = envSwitcher;
