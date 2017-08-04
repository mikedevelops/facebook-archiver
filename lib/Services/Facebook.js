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
		// this.logger.info('Logging in...');
        await this.driver.input('email', user);
        await this.driver.input('pass', password);
		await this.driver.click('#u_0_t');
		// this.logger.info(`Email: ${user} Password: ${password.replace(/./g, '*')}`);
    }

    async getPhotos (quantity = 1) {
		this.driver.navigate(this.url + '/photos');

		// Open spotlight
		await this.driver.click('.uiMediaThumb');

		// Get image src of all pictures
		do {
			try {
				const elem = await this.driver.nodeService.get('.spotlight')
				let alt = await elem[0].getAttribute('alt');
				// A none empty alt means the hd image is loaded
				while (alt == "") {
					alt = await elem[0].getAttribute('alt');
				}
				// Print the image source url
				console.log(await elem[0].getAttribute('src'))
				// Display next image
				await this.driver.click('.next')
			} catch (e) {
				// Catch error when fail then retry the same image
				// this.logger.error(e)
			}
		} while (true)

    }
}

module.exports = Facebook;
