const DriverFactory = require('./lib/Factories/DriverFactory');
const FacebookFactory = require('./lib/Factories/FacebookFactory');
const winston = require('winston');
const EventEmitter = require('events');

const driver = DriverFactory.create(winston);
const facebook = FacebookFactory.create(winston);

winston.setLevel = 'info';

async function start () {
    await driver.init();

    facebook.init(driver);
    await facebook.open();
    await facebook.login({
        user: process.env.FACEBOOK_USER,
        password: process.env.FACEBOOK_PASS
    });
    await facebook.getPhotos();
}

start();
// initiate services


// let's go
// facebook.open();


