import * as C from "./constants.js";
import { InlineKeyboard } from "grammy";
export function setGrammyCommands(bot) {
  /**
   * REGISTER COMMANDS LIST
   */
  bot.command("start", commandStart);
  bot.command("join", commandIWantJoin);
  bot.command(["exit", "leave", "cancel"], commandLeave);
  bot.command("about", commandAbout);
  bot.command("support", commandSupport);
  bot.command("test", commandTest);

  // bot.command("menu", async (ctx) => {
  //   // Send the menu.
  //   await ctx.reply("Check out this menu:", { reply_markup: menu });
  // });
  //

  /**
   * BOT APP QUICK MENU
   */
  bot.api.setMyCommands([
    { command: "start", description: "Start from beginning" },
    { command: "join", description: "Participate lunch buddies" },
    { command: "support", description: "Contact admin for feedback or help" },
    { command: "about", description: "What is this bot?" },
    { command: "cancel", description: "Cancel any conversation" },
  ]);

  /**
   * METHODS
   */

  async function commandStart(ctx) {
    const getStarted = new InlineKeyboard()
        .text("About Lunch Buddies", C.CB_I_WANT_INFO)
        .text("I would like to participate", C.CB_I_WANT_JOIN)
        .row();

    ctx.reply('Welcome to the "Lunch Buddies" bot!', {
      reply_markup: getStarted,
    });
  }

  async function commandIWantJoin(ctx) {
    //trigger conversation 'converseIWantJoin'
    await ctx.conversation.enter(C.CONVERSE_I_WANT_JOIN);
  }

  // Always exit any conversation upon /cancel
  async function commandLeave(ctx) {
    await ctx.conversation.exit();
    await ctx.reply("See you next time!");
  }

  async function commandAbout(ctx) {
    ctx.reply(C.WELCOME_MESSAGE);
  }

  async function commandSupport(ctx) {
    ctx.reply("Contact @manjaman86 for feedback or help.");
  }

  async function commandTest(ctx) {
    //send loading message
    const loadingMessage = await ctx.reply("Please wait, i am loading..");

    await ctx.reply("Finish loading");

    //remove loading message
    await ctx.api.deleteMessage(ctx.chat.id, loadingMessage.message_id);
  }
}
