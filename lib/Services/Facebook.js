class Facebook {
    constructor (logger) {
        this.url = 'https://www.facebook.com';
        this.driver = null;
        this.logger = logger;
    }

    init (driver) {
        this.driver = driver;
    }

    async open () {
        await this.driver.navigate(this.url);
    }

    async login ({ user, password, submit = false }) {
        this.logger.info('Logging in...');
        await this.driver.input('email', user);
        await this.driver.input('pass', password);
        await this.driver.submit('#login_form');
        this.logger.info(`Email: ${user} Password: ${password.replace(/./g, '*')}`);
    }

    async getPhotos (quantity = 1) {
        this.driver.navigate(this.url + '/photos');

        await this.driver.click('.uiMediaThumb', quantity);
        await this.driver.click('a[data-action-type="open_options_flyout"]', 1);
        await this.driver.click('a[data-action-type="download_photo"]', 1);

        // @todo create FaceboonPhotoService for retrieveing 1 photo and loop here
    }
}

module.exports = Facebook;
