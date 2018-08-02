## Usage

* Install dependencies
```
npm i
```

* Add your credentials on `credentials.json`
* Add reviewers usernames on `reviewers.json`
* Add your username as environment variable
* Run program with repository as argument
* You can select the repository language using the parameter -l

```
BITBUCKET_USERNAME=your-username node index.js --repository {repository}
```
or
```
BITBUCKET_USERNAME=your-username node index.js -r {repository}
```
or

To see helper, run
```
node index.js -h
```
