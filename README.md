# facebook-archiver
Get pictures you're tagged in using selenium-webdriver


# Install
```
git clone https://github.com/mikedevelops/facebook-archiver.git
cd facebook-archiver
npm install
```
Then get the appropriate geckodriver for your OS/machine (see: http://seleniumhq.github.io/selenium/docs/api/javascript/index.html)


# Usage
Set `FACEBOOK_USER` and `FACEBOOK_PASS` to your credentials, then:
```shell
ǹode index.js
mkdir images
cd images
cat ../photos.txt | sort -u | xargs -n 1 -P 10 wget -q
```

Tips: -P is for the number of parallel download, raise it for faster download
