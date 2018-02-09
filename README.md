# Facebook Archiver
Retrieve and download photographs you are tagged in using the selenium-webdriver.


# Install
```
git clone https://github.com/mikedevelops/facebook-archiver.git
cd facebook-archiver
npm install
```
Then get the appropriate geckodriver for your OS/machine (see: http://seleniumhq.github.io/selenium/docs/api/javascript/index.html). It should be accessible from your PATH


# Usage
Set `FACEBOOK_USER` and `FACEBOOK_PASS` to your credentials, then:
```shell
FACEBOOK_USER=mike@github.com FACEBOOK_PASS=*********** node index.js
mkdir images
cd images
cat ../photos.txt | sort -u | xargs -n 1 -P 10 wget -q
```

Tips: -P is for the number of parallel download, raise it for faster download

# Disclaimer

Read Facebook's [Automated Data Collection Terms](https://www.facebook.com/apps/site_scraping_tos_terms.php) before use.
