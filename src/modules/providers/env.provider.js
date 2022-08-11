const envSwitcher = require('./env.switcher');
const { Env } = require('../../models/_.loader');

class EnvironmentProvider {
    /** @type { Env } */
    static env;

    static switchEvnPath() {
        const MODE = process.env.NODE_ENV ?? 'dev';
        return envSwitcher(MODE);
    }

    static setEnvInstance() {
        this.env = new Env();

        return this.env;
    }
}

module.exports = EnvironmentProvider;
