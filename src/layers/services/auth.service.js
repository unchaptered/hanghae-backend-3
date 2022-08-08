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

        if (user) return res.status(201).json({ message: "회원가입에 성공하였습니다.", result: { nickname: userDto.nickname } })
        else return res.status(400).json({ message: "회원가입에 실패하였습니다.", result: {} })

    } catch (err) {
        return res.json(err.message);
    }

};


module.exports = {
    join
}