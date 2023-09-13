#Telegram Chatbot

## Pre Install

`npm install -g nodemon`. If you already have nodemon you skip this. This will automatically rerun the script instantly if they are changes on your codes

## Setup

Just run `npm run install`

## Preparing your machines to run the bot locally

- disconnect your BASF VPN.
- Use your own internet connection (not BASF network)

## Run the bot (locally)

`nodemon index.js` .

# GRAMMY (Telegram Bot Framework)

https://grammy.dev/

https://deno.land/x/grammy@v1.18.1/mod.ts

# quickstart

```javascript
import dotenv from "dotenv";
import { Bot } from "grammy";
// Load environment variables from .env file
dotenv.config();

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const bot = new Bot(TELEGRAM_TOKEN); // <-- put your bot token between the "" (https://t.me/BotFather)

bot.start();

// `ctx.reply` is an alias for `ctx.api.sendMessage` in the same chat
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.catch((err) => {
  console.log("error", err);
});
```

# send message to specific user with id

Note: the user must be already started the bot first

```javascript
bot.command("hiUser", (ctx) =>
  ctx.api.sendMessage(139736054, "Hello from bot")
);
```

# send message to the channel

note: the bot must be included as a admin in the channel

```javascript
bot.command("hiChannel", (ctx) =>
  ctx.api.sendMessage("@lunchbuddiesFrodo", "Hello from bot")
);
```

# listen to received messsage

```javascript
//The easiest way to listen for messages is via
bot.on("message", async (ctx) => {
  const message = ctx.message; // the message object
});

// Handles commands, such as /start.
bot.command("start", async (ctx) => {
  /* ... */
});

// Matches the message text against a string or a regular expression.
bot.hears(/echo *(.+)?/, async (ctx) => {
  /* ... */
});
```

# Listen to keyboard response (callbackData / callbackQuery)

```javascript
bot.command("start", async (ctx) => {
  // Build an inline keyboard:
  const inlineKeyboard = new InlineKeyboard()
    .text("I want to join", "iWantjoin") //  'iWantJoin'
    .text("i want to know more", "info")
    .row();

  /// `ctx.reply` is an alias for `sendMessage` in the same chat
  await ctx.reply(`Hi ${ctx.chat.first_name},  Welcome to the Lunchbot! 🤝`, {
    reply_markup: inlineKeyboard,
  });
});

//we listen to callbackQuery or callbackData (same thing)
bot.callbackQuery("iWantjoin", async (ctx) => {
  //get user fullname
  ctx.reply("Nice, what is your full name?", {
    reply_markup: { force_reply: true },
  });

  await ctx.answerCallbackQuery({
    text: "You were superb, indeed!",
  });
});
```

# Accept Argument in command

```javascript
bot.command("add", async (ctx) => {
  // `item` will be "apple pie" if a user sends "/add apple pie".
  const item = ctx.match;
});
```


# Remove message
```javascript

  async function commandTestRemoveMessage(ctx) {
    //send loading message
    const loadingMessage = await ctx.reply("Please wait, i am loading..");

    await ctx.reply("Finish loading");

    //remove loading message
    await ctx.api.deleteMessage(ctx.chat.id, loadingMessage.message_id);
  }

```

# Set Fixed Menu in telegram

```javascript
bot.api.setMyCommands([
  { command: "start", description: "Start from beginning" },
  { command: "feedback", description: "Contact admin for feedback or help" },
  { command: "about", description: "What is this bot?" },
]);
```
