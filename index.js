const request = require('request-promise');
const cli = require('commander');
const credentials = require('./credentials.json');
const reviewers = require('./reviewers.json');
const languages = require('./languages.json');

const username = process.env.BITBUCKET_USERNAME;

async function createToken() {
    const { access_token: token } = await request({
      method: 'POST',
      url: 'https://bitbucket.org/site/oauth2/access_token',
      formData: credentials,
      json: true
    });

    return token;
}

function createRepository(repository, token, language) {
    return request({
      method: 'POST',
      url: `https://bitbucket.org/!api/2.0/repositories/${username}/${repository}`,
      form: {
        is_private: true,
        has_issues: true,
        mainbranch: {
            type: 'branch',
            name: 'master'
        },        
        language
      },
      auth: {
        bearer: token
      }
    })
    .then(() => console.log(`\nRepository created: https://bitbucket.org/${username}/${repository}\n`));
}

function addReviewers(repository, token) {
    const promises = reviewers.map(reviewer => 
      request({
        method: 'PUT',
        url: `https://bitbucket.org/!api/2.0/repositories/${username}/${repository}/default-reviewers/${reviewer}`,
        json: true,
        form: {
          username: reviewer
        },
        auth: {
          bearer: token
        }
      })
      .then(() => console.log(`Reviewer ${reviewer} added to ${repository}`)));

    return Promise.all(promises)
    .then(() => console.log(`\nBee happy to check reviewers: https://bitbucket.org/${username}/${repository}/admin/pullrequests/reviewers/`));
}

async function init() {
  cli
    .option('-r, --repository <repository>', 'Repository to add reviewers')
    .option('--no-create', 'Don\'t create repository')
    .option('-l, --language [language]', `Repository language`, new RegExp(`^(${languages.join('|').replace(/\+/g, '\\+')})$`), 'nodejs')
    .parse(process.argv);
    console.log(cli.language)

    if (!cli.repository) {
      console.error('-r, --repository <repository> is required')
      return;
    }

    const token = await createToken();

    if (cli.create) {
      await createRepository(cli.repository, token, cli.language);
    }

    return addReviewers(cli.repository, token);
}

init()
  .catch(res => console.error(res));
