//nodejs modules
import express from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';

//grammyjs modules
import { Bot } from "grammy";
import { runGrammy } from "./grammy/indexGrammy.js";

//routes modules
import { adminChannels } from "./admin/channels.js";

/**
 * APP CONFIG
 */
const port = process.env.PORT || 8080;
// Load environment variables from .env file
dotenv.config();
const app = express();

/**
 * bodyParser to get request body
 */
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
);

/**
 * GRAMMYJS
 */
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const bot = new Bot(TELEGRAM_TOKEN);
runGrammy(bot);

/**
 * ADMIN ROUTES
 */
adminChannels(app, bot);

/**
 * EXPRESS APP METHODS
 */
app.listen(port, function listen() {
  console.log(`Server is listeninggg at http://localhost:${port}`);
});
