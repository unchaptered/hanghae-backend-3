const bcrypt = require("bcrypt");

async function bcryptPassword (password){

    const saltRounds = 10;
    
    //salt 생성
    hashedpassword = await bcrypt.hash(password, saltRounds );
    return hashedpassword;
    
}

module.exports = {
    bcryptPassword
};