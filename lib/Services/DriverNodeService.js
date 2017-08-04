class DriverNodeService {
    constructor (utils, logger) {
        this.utils = utils;
        this.logger = logger;
        this.attempts = 10;
        this.count = 0;
    }

    init (driver) {
        this.webdriver = driver;
    }

    async get (selector, quantity) {
        const nodeList = await this.webdriver.findElements(this.utils.By.css(selector));

        if (!nodeList.length) {
            // this.logger.debug(`trying again for "${selector}"`);
            // try again
            if (this.count < this.attempts) {
                return new Promise (res => {
                    setTimeout(() => {
                        this.count++;
                        res(this.get(selector, quantity));
                    }, 250);
                });
            } else {
                // this.logger.info(`Could not get "${selector}"`);
                return null;
            }
        }

        // this.logger.info(`Got ${quantity} "${selector}"`);
        this.count = 0;

        return nodeList.slice(0, quantity);
    }
}

module.exports = DriverNodeService;
