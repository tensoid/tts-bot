const { EventListener } = require('yuuko');
const { getAudioUrl } = require('google-tts-api');

module.exports = new EventListener("messageCreate", (message, ctx) => {

  if (message.author.bot) return;
  if(!ctx.voiceConnection) return;
  if(message.content.startsWith(ctx.client.prefix)) return;


  let queuedMessages = ctx.queuedMessages;
  queuedMessages.push(message.content);
  ctx.client.extendContext({voiceConnection: ctx.voiceConnection, queuedMessages, language: ctx.language});
     
  tryPlayQueue(ctx);
});


function tryPlayQueue(ctx){

  if(ctx.voiceConnection.playing) return;
  if(ctx.queuedMessages.length <= 0) return;

  let queuedMessage = ctx.queuedMessages.shift();

  if(queuedMessage.length > 200){
    queuedMessage = queuedMessage.substring(0, 200);
  }

  if(queuedMessage.startsWith("<@") || queuedMessage.startsWith("http") || queuedMessage.length <= 0 || typeof queuedMessage != "string"){
    return tryPlayQueue(ctx);
  }

  ctx.voiceConnection.once("end", () => tryPlayQueue(ctx));
  ctx.voiceConnection.play(getAudioUrl(queuedMessage, { lang: ctx.language, speed: 200 }));
}
  
  