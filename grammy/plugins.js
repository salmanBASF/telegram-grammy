import { conversations } from "@grammyjs/conversations";
import { session } from "grammy";
import { Menu } from "@grammyjs/menu";

export function setGrammyPlugins(bot) {
  // Create a simple menu.
  const menu = new Menu("my-menu-identifier")
      .text("A", (ctx) => ctx.reply("You pressed A!"))
      .row()
      .text("B", (ctx) => ctx.reply("You pressed B!"));

  // Make it interactive.
  bot.use(menu);

  // Install session middleware, and define the initial session value.
  function initialSession() {
    return {};
  }
  // Install the session plugin.
  bot.use(session({ initial: () => initialSession() }));

  // Install the conversations plugin.
  bot.use(conversations());
}
