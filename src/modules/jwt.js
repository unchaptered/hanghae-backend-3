const jwt = require("jsonwebtoken");

const authRepository = require("../layers/repositories/auth.repository");
const pool = require('../../src/db');

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    const [ authType, authToken] = (authorization || "").split(" ");

    if (!authToken || authType !== "Bearer") {
        throw new Error("로그인 후 이용 가능한 기능입니다");
    }

    const poolConnection = await pool.getConnection();

    try {
        const { userid } = jwt.verify(authToken, JWT_SECRET);
        const isExists = await authRepository.isExists(poolConnection, userId);
        if (!isExists) throw new Error('존재하지 않는 사용자입니다.');
        next();

    } catch (err) {

        console.log(err);
        return `${err.name} : ${err.message}`;

    }


}
