const Facebook = require('../Services/Facebook');

class FacebookFactory {
    static create (logger) {
        return new Facebook(logger);
    }
}

module.exports = FacebookFactory;
