import dotenv from 'dotenv';
import { listPrs } from './github';
import { runPipeline, statusPipeline } from './gocd';

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

controller.hears(new RegExp(/^github prs /), 'message', listPrs);
controller.hears(new RegExp(/^gocd run /),'message', runPipeline)
controller.hears(new RegExp(/^gocd status /),'message', statusPipeline)
controller.hears(new RegExp(/^tv /), 'message', async(bot : any, message : any) => {

process.env.VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ";
let timer = setInterval(() => 
  tools.testFunc({type: 'video', url: 'abc'}), 5000
);
});
