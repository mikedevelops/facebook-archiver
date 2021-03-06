const fs = require('fs');

class Facebook {
	constructor (logger) {
		this.url = 'https://www.facebook.com';
		this.driver = null;
		this.logger = logger;
		this.stream = fs.createWriteStream("photos.txt");
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
		await this.driver.click('#u_0_t');
		this.logger.info(`Email: ${user} Password: ${password.replace(/./g, '*')}`);
	}

	async getPhotos (quantity = 1) {
		this.driver.navigate(this.url + '/photos');

		// Open spotlight
		await this.driver.click('.uiMediaThumb');

		let firstUrl, url

		// Get image src of all pictures
		do {
			try {
				// Save the first url
				if (firstUrl === undefined && url !== undefined) {
					firstUrl = url
				}
				const elem = await this.driver.nodeService.get('.spotlight')
				let alt = await elem[0].getAttribute('alt');
				// A none empty alt means the hd image is loaded
				while (alt == "") {
					alt = await elem[0].getAttribute('alt');
				}
				// Print the image source url
				url = await elem[0].getAttribute('src')
				this.stream.write(url)
				// Display next image
				await this.driver.click('.next')
			} catch (e) {
				// Catch error when fail then retry the same image
				this.logger.error(e)
			}
		} while (url !== firstUrl)

	}
}

module.exports = Facebook;
