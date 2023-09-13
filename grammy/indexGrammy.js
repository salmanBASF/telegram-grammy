//grammyjs modules
import { setGrammyPlugins } from "./plugins.js";
import { setGrammyCommands } from "./commands.js";
import { listenCallbackQueries } from "./callbackQueries.js";
import { listenMessages } from "./messages.js";
import { startGrammy } from "./start.js";
import { setConversations } from "./conversations.js";

/**
 * GRAMMYJS
 */
export function runGrammy(bot) {
  setGrammyPlugins(bot);
  setConversations(bot);
  setGrammyCommands(bot);
  listenCallbackQueries(bot);
  listenMessages(bot);
  startGrammy(bot);
}
