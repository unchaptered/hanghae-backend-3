class SampleController {
    sampleService;

    constructor() {
        const SampleService = require('../services/sample.service');
        this.sampleService = new SampleService();
    }

    /**
     * @returns { string }
     */
    sayHello = (req, res) => {
        const result = this.sampleService.sayHello();
        return res.json(result);
    };
}

module.exports = SampleController;
