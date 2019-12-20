import express from 'express';
import dotenv from 'dotenv';
import { listPrs } from './github';

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

controller.hears(new RegExp(/^github prs /), 'message', listPrs);

 controller.hears(new RegExp(/^tv /), 'message', async(bot : any, message : any) => {
 });
