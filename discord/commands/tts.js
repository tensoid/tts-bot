const { Command, Client } = require('yuuko');


module.exports = new Command('tts', (message, args, ctx) => {

  if(ctx.voiceConnection != null) {
    ctx.voiceConnection.disconnect();
    ctx.client.extendContext({ voiceConnection: null });
    return;
  }

  if(args.length == 0){
    return message.channel.createMessage("Please provide a channel id to use for tts.");
  }
      
  let ttsChannel = args[0];

  let channelInstance = ctx.client.getChannel(ttsChannel);
  if(channelInstance == null || channelInstance.type != 2){
    return message.channel.createMessage("Voice channel not found.");
  }

  ctx.client.joinVoiceChannel(ttsChannel).then(connection => {
    message.channel.createMessage("TTS ready...");
    ctx.client.extendContext({ voiceConnection: connection });
  })
});
