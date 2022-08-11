const BaseEnv = require('./base/base.env');
const BcryptEnv = require('./bcrypt.env');
const JwtEnv = require('./jwt.env');
const MysqlEnv = require('./mysql.env');

class Env extends BaseEnv {
    PORT;
    MODE;
    bcryptEnv;
    jwtEnv;
    mysqlEnv;

    constructor() {
        super();

        this.PORT = this.getNumberValue('PORT');
        this.MODE = this.getStringValue('PORT');
        this.bcryptEnv = new BcryptEnv();
        this.jwtEnv = new JwtEnv();
        this.mysqlEnv = new MysqlEnv();
    }
}

module.exports = Env;
