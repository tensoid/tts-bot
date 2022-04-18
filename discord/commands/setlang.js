const { Command } = require('yuuko');


module.exports = new Command('setlang', (message, args, ctx) => {

  if(args.length == 0){
    return message.channel.createMessage("Provide a language you dumb fuck.");
  }
      
  let language = args[0];

  if(typeof language != "string" || language.length != 2){
    return message.channel.createMessage("Provide a two letter language code you fucking braindead goose. Its not that hard is it fuckbag.");
  }

  ctx.client.extendContext({voiceConnection: ctx.voiceConnection, queuedMessages: ctx.queuedMessages, language });

  message.channel.createMessage(`Set language to ${language}.`);
});
