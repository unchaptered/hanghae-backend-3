const jwt = require("jsonwebtoken");
require('dotenv/config');

const authRepository = require('../repositories/auth.repository');
const pool = require("../../db");
const {bcryptPassword} = require("../../modules/bcrypt");

const join = async (userDto) => {

    const poolConnection = await pool.getConnection();

    try {

        await poolConnection.beginTransaction();

        if (userDto.password !== userDto.confirm) 
            throw new Error('패스워드와 패스워드 확인이 일치하지 않습니다.');
        
        const password = await bcryptPassword(userDto.password); console.log(password);

        const isCreated = await authRepository.join(poolConnection, userDto.nickname, password);
        if (isCreated === null) throw new Error('회원가입에 실패하였습니다.');
        
        await poolConnection.commit();
        poolConnection.release();

        return "회원가입에 성공하였습니다.";

    } catch (err) {
        
        await poolConnection.rollback();
        poolConnection.release();
        return `${err.name} : ${err.message}`;
    }

};

const login = async (userDto) => {

    const poolConnection = await pool.getConnection();

    try {
        
        await poolConnection.beginTransaction();
        
        const isLogined = await authRepository.login(poolConnection, userDto);
        if (isLogined === null) 
            throw new Error('로그인에 실패하였습니다.');
        
        await poolConnection.commit();
        poolConnection.release();
        const {user_id} = isLogined.userid;
        token = jwt.sign({ userId:user_id}, process.env.JWT_SECRET);
        return ( { message :"로그인에 성공하였습니다.", token : token});
        

    } catch (err) {
        await poolConnection.rollback();
        poolConnection.release();
        return `${err.name} : ${err.message}`;
    }
}

module.exports = {
    join,
    login
}