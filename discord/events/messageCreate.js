const { EventListener } = require('yuuko');
const { getAudioUrl } = require('google-tts-api');

module.exports = new EventListener("messageCreate", (message, ctx) => {

  if (message.author.bot) return;
  if(!ctx.voiceConnection) return;
  if(message.content == ctx.client.prefix + "tts") return;


  let queuedMessages = ctx.queuedMessages;
  queuedMessages.push(message.content);
  ctx.client.extendContext({voiceConnection: ctx.voiceConnection, queuedMessages });
     
  let voiceConnection = ctx.voiceConnection;

  tryPlayQueue(voiceConnection, queuedMessages);
});


function tryPlayQueue(voiceConnection, queuedMessages){
  if(voiceConnection.playing) return;
  if(queuedMessages.length <= 0) return;

  let queuedMessage = queuedMessages.shift();
  voiceConnection.once("end", () => tryPlayQueue(voiceConnection, queuedMessages));
  voiceConnection.play(getAudioUrl(queuedMessage, "en", 1));
}