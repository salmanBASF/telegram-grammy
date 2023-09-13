import * as C from "./constants.js";

export function listenCallbackQueries(bot) {
  /**
   *  REGISTER CALLBACK QUERIES
   */
  bot.callbackQuery(C.CB_I_WANT_INFO, cbIWantInfo);
  bot.callbackQuery(C.CB_I_WANT_JOIN, cbIWantJoin);

  //fallback on any callback queries
  // bot.on("callback_query:data", async (ctx) => {
  //   console.log("Unknown button event with payload", ctx.callbackQuery.data);
  //   await ctx.answerCallbackQuery({
  //     text: "Sorry, your selected option might already invalid. Please start over again.",
  //   });
  // });

  /**
   * METHODS
   */

  async function cbIWantInfo(ctx) {
    ctx.reply(C.WELCOME_MESSAGE);
  }

  async function cbIWantJoin(ctx) {
    await ctx.conversation.enter(C.CONVERSE_I_WANT_JOIN);
  }
}
