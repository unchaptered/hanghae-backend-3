const jwt = require('jsonwebtoken');
require('dotenv/config');

class Jwt {
    jwt = async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            const [authType, authToken] = (authorization || '').split(' ');

            if (!authToken || authType !== 'Bearer') {
                throw new Error('로그인 후 이용 가능한 기능입니다.');
            }

            const { userId } = jwt.verify(authToken, process.env.JWT_SECRET);

            // const isExists = await authRepository.isExists(poolConnection, userId);
            // if (!isExists) throw new Error('로그인 후 이용 가능한 기능입니다.');

            req.body.userId = +userId;
            next();
        } catch (err) {
            console.log(err);
            return res.status(500).json(`${err.name} : ${err.message}`);
        }
    };
}

module.exports = Jwt;
