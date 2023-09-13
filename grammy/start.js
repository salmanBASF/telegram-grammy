import { GrammyError, HttpError } from "grammy";

export function startGrammy(bot) {
  /**
   * BOT LAUNCHES
   */

  bot.start();

  bot.catch((err) => {
    console.log("error", err);
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
      console.error("Could not contact Telegram:", e);
    } else {
      console.error("Unknown error:", e);
    }
  });
}
