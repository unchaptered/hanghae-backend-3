const authRepository = require('../repositories/auth.repository');
const pool = require("../../db");

const join = async (userDto, res) => {

    try {

        if (userDto.password !== userDto.confirm) {
            return res.status(400).json({
                erroMessage: "패스워드와 패스워드 확인이 일치하지 않습니다."
            });
        };

        const connection = await (await pool).getConnection();

        const user = await connection.query(authRepository.join(userDto));

        if (user) return res.status(201).json({success : true, message: "회원가입에 성공하였습니다.", result: { nickname: userDto.nickname } })
        else return res.status(400).json({ success : false, message: "회원가입에 실패하였습니다.", result: {} })

    } catch (err) {
        return res.status(400).json(err.message);
    }

};

const login = async (userDto, res) => {

    try {

        const connection = await (await pool).getConnection();

        const user = await connection.query(authRepository.login(userDto));

        if (user[0].length) return res.status(200).json({success : true, message: "로그인에 성공하였습니다.", result: user[0] })
        else return res.status(400).json({ success : false, message: "로그인에 실패하였습니다.", result: user[0] })


    } catch (err) {
        return res.status(400).json(err.message);
    }
}

module.exports = {
    join,
    login
}