require('dotenv/config');
const pool = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { EnvironmentProvider, DatabaseProvider } = require('../../modules/_.loader');
const { bcryptPassword } = require('../../modules/bcrypt');

const AuthRepository = require('../repositories/auth.repository');

class AuthService {
    authRepository;
    databaseProvider;

    constructor() {
        this.authRepository = new AuthRepository();
        this.databaseProvider = new DatabaseProvider();
    }

    join = async (userDto) => {
        const poolConnection = await this.databaseProvider.getConnection();

        try {
            await poolConnection.beginTransaction();

            if (userDto.password !== userDto.confirm)
                throw new Error('패스워드와 패스워드 확인이 일치하지 않습니다.');

            const password = await bcryptPassword(userDto.password);
            console.log(password);
            const isCreated = await this.authRepository.join(
                poolConnection,
                userDto.nickname,
                password,
            );
            if (isCreated === null) throw new Error('회원가입에 실패하였습니다.');

            await poolConnection.commit();
            poolConnection.release();

            return '회원가입에 성공하였습니다.';
        } catch (err) {
            await poolConnection.rollback();
            poolConnection.release();
            return `${err.name} : ${err.message}`;
        }
    };

    login = async (userDto) => {
        const poolConnection = await this.databaseProvider.getConnection();

        try {
            await poolConnection.beginTransaction();

            const selectedUser = await this.authRepository.getUserIdAndPassword(
                poolConnection,
                userDto.nickname,
            );
            if (selectedUser === false) throw new Error('로그인에 실패하였습니다.');

            const validatePassword = await bcrypt.compare(userDto.password, selectedUser.password);
            if (!validatePassword) throw new Error('로그인에 실패하였습니다.');

            await poolConnection.commit();
            poolConnection.release();

            const userId = selectedUser.user_id;

            token = jwt.sign({ userId: userId }, EnvironmentProvider.env.jwtEnv.SECRET);
            return { message: '로그인에 성공하였습니다.', token: token };
        } catch (err) {
            await poolConnection.rollback();
            poolConnection.release();
            return `${err.name} : ${err.message}`;
        }
    };
}

module.exports = AuthService;
