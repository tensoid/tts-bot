const { Client } = require('yuuko');

const bot = new Client({
  token: process.env.DISCORD_BOT_TOKEN,
  prefix: '!'
});

bot.extendContext({ voiceConnection: null, queuedMessages: [], language: 'en' });

try {
  bot
  .addDir("./discord/commands")
  .addDir("./discord/events")
  .connect();
} catch (err) {
  console.error(err);
}



  