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
```shell
ǹode index.js > images.txt
mkdir images
cd images
cat ../images.txt | sort -u | xargs -n 1 -P 10 wget -q
```

Tips: -P is for the number of parallel download, raise it for faster download
