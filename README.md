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

* To just set reviewers for one project, just run the flag `--no-create`
```
BITBUCKET_USERNAME=your-username node index.js --no-create -r {repository}
```

* to set reviewer to multiple repositories, edit the `set_reviewers.sh` and execute the script
```
./set_reviewers.sh
```

or

To see helper, run
```
node index.js -h
```
