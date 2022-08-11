class SampleService {
    pool;
    sampleRepository;

    constructor() {
        const SampleRepository = require('../repositories/sample.repository');
        this.pool = require('../../db');
        this.sampleRepository = new SampleRepository();
    }

    /**
     * @returns { string }
     */
    sayHello = () => {
        return this.sampleRepository.sayHello();
    };
}

module.exports = SampleService;
