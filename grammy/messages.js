export function listenMessages(bot) {
  //fallback - capture all messages if we dont have a command for it
  bot.on("message", async (ctx) => {
    ctx.reply(
        `You typed '<strong>${ctx.message.text}</strong>', 
    
but sorry, i don't understand you..maybe i will get smarter next time. 
    
Please use /start to get started again`,
        { parse_mode: "HTML" }
    );
  });
}
