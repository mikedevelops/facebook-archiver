const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const Driver = require('../Resources/Driver');
const DriverNodeService = require('../Services/DriverNodeService');

class DriverFactory {
    static create (logger) {
        const driver = new webdriver.Builder();

        return new Driver(
            driver,
            webdriver,
            chrome,
            logger,
            new DriverNodeService(webdriver, logger)
        );
    }
}

module.exports = DriverFactory;
