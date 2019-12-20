import dotenv from 'dotenv';

const { WebexAdapter } = require('botbuilder-adapter-webex');
const { Botkit } = require('botkit');

dotenv.config();
var tools : any;
if (process.env.ENABLE_EXT_DISPLAY == 'true'){
  tools = require('./display');
}

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
  await bot.say("I'm a little teapot");
};

let timer = setInterval(() => tools.testFunc(), 3000);
