class Driver {
    constructor (webdriver, utils, chrome, logger, nodeService, eventHub) {
        this.webdriver = webdriver;
        this.utils = utils;
        this.chrome = chrome;
        this.logger = logger;
        this.nodeService = nodeService;
        this.eventHub = eventHub;
    }

    async init () {
        const options = new this.chrome.Options();

        options.addArguments(['--disable-notifications']);

        this.webdriver = await this.webdriver
            .setChromeOptions(options)
            .forBrowser('firefox').build();

        this.nodeService.init(this.webdriver);
    }

    async input (name, value) {
        const elements = await this.nodeService.get(`input[name='${name}']`, 1);

        await elements.forEach(async element => await element.sendKeys(value));
    }

    async submit (selector) {
        const elements = await this.nodeService.get(selector, 1);

        await elements.forEach(async element => await element.submit());

        // this.logger.info(`Submit form "${selector}"`);
    }

    async navigate (url) {
        await this.webdriver.get(url);
        // this.logger.info(`Navigated to: ${url}`);
    }

    async $ (selector, quantity = 1) {
        return await this.nodeService.get(selector, quantity);
    }

    async click (selector) {
        const elements = await this.nodeService.get(selector, 1);

        await elements.forEach(async element => await element.click());
    }
}

module.exports = Driver;
