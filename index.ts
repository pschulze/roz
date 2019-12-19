import express from 'express';
import dotenv from 'dotenv';

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

async function myFunc() {
  const bot = await controller.spawn();
  await bot.startConversationInRoom(process.env.ROZBOT_ROOM_ID);
  await bot.say("I'm watching you, Wazowski. Always watching. Always!");
};

myFunc();
