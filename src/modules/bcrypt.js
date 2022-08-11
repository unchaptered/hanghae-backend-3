const bcrypt = require("bcrypt");
require('dotenv/config');

const saltRounds = process.env.BCRYPT_SALT;

async function bcryptPassword (password){

    //salt 생성
    hashedpassword = await bcrypt.hash(password, +saltRounds );
    return hashedpassword; 
    
}


module.exports = {
    bcryptPassword
};