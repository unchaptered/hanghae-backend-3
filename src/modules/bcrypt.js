const bcrypt = require('bcrypt');
require('dotenv/config');

class Bcrypt {
    saltRounds;

    constructor() {
        this.saltRounds = process.env.BCRYPT_SALT;
    }

    bcryptPassword = async function (password) {
        //salt 생성
        hashedpassword = await bcrypt.hash(password, +saltRounds);
        return hashedpassword;
    };
}

module.exports = Bcrypt;
