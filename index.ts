import express from 'express';
import dotenv from 'dotenv';
import GitHub from 'github-api';

const { WebexAdapter } = require('botbuilder-adapter-webex');
const { Botkit } = require('botkit');

dotenv.config();

// const app = express();
// const port = 3000;

// app.get('/', (req, res) => res.send('Hello World!'));

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const adapter = new WebexAdapter({
  access_token: process.env.WEBEX_TEAMS_BOT_ACCESS_TOKEN,
  enable_incomplete: true,
  public_address: process.env.PUBLIC_ADDRESS,
});

const controller = new Botkit({
  adapter,
  // ... other configuration options
});

controller.hears(new RegExp(/^github prs /), 'message', async(bot : any, message : any) => {
  const gh = new GitHub(
    { token: process.env.GITHUB_ACCESS_TOKEN },
    process.env.GITHUB_API_BASE_URL
  );

  const repoName = message.text.split(' ')[2];
  const repo = gh.getRepo(process.env.GITHUB_ORG_NAME, repoName);

  await repo.listPullRequests().then(({ data }) => {
    let openPrs = data;
    let reply : String;
    if (openPrs.length === 0) {
      reply = `There are no open PRs for ${repoName}.`
    } else {
      reply = `Here's all the open PRs for ${repoName}:\n`
      openPrs.forEach(pr => {
        reply += `- ${pr.title}\n`;
        reply += `\t- ${pr.user.login}\n`;
        reply += `\t- ${pr.html_url}\n`;
      });
    }
    bot.say({ markdown: reply });
  }).catch((error) => {
    console.log(error.response.status);
    if (error.response.status === 404) {
      bot.say(`I can't find any repository named ${repoName}.`);
    } else {
      console.error(error);
    }
  });
 });

 controller.hears(new RegExp(/^tv /), 'message', async(bot : any, message : any) => {
 });
