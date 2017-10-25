# Education - dashboard

### Version
0.0.1

This dashboard uses some open source packages:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework


### Installation

this requires [Node.js](https://nodejs.org/) v4.4+ to run.


Open your favorite Terminal and run these commands.

### Development

Want to contribute? Great!

First Tab:
```sh
$ node app
```

### Production

1. `cd` into `dashboard`
2. `git branch` to verify that you're on the branch `master`
3. `git fetch`
4. `git pull --rebase`
5. `pm2 restart dashboard` to restart the application

You can use `pm2 list` to see the application status.
If you're not successful at step #4, you may have to resolve conflicts or `git stash`

You can use `pm2 logs dashboard` to see all logs of dashboard.

**Awesome stuff, Hell Yeah!**


   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>



mongoimport -d dash_test --collection school  --type csv --file school_data.csv  --headerline

mongoimport -h 34.230.165.196 -d test --collection survey --file data_test1.json

ssh -i /Users/himanshujain/Downloads/btweb.pem ubuntu@34.230.165.196

db.copyDatabase("db_to_rename","db_renamed","localhost")

ssh -p 7822 eduasses@eduassessmentdata.net

sudo mongod --dbpath /var/lib/mongodb

scp -r -i /Users/himanshujain/Downloads/btweb.pem ubuntu@34.230.165.196:dump dump

mongodump -h 34.230.165.196 --db test --collection survey --gzip
