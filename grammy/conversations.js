import { InlineKeyboard } from "grammy";
import {
  postParticipants,
  isAlreadyRegisteredInAWeek,
} from "../API/participantsAPI.js";
import { createConversation } from "@grammyjs/conversations";
import * as C from "./constants.js";

//NOTE: the name of conversation should be the same as the name of the method
// NOTE: please use prefix 'converse` for conversation name
export function setConversations(bot) {
  /**
   * REGISTER CONVERSATIONS
   */
  bot.use(createConversation(converseIWantJoin));

  /**
   * CONVERSATIONS METHODS
   */

  async function converseIWantJoin(conversation, ctx) {
    /**
     * STEP 1 - Ask for fullname
     */
    await ctx.reply("Hi there! What is your name? 😃", {
      reply_markup: { force_reply: true },
    });

    const { message: fullname } = await conversation.wait();

    /**
     * STEP 2 - asking for gender
     */

    const genderOptions = new InlineKeyboard()
        .text("male 👨‍💻", "male")
        .text("female 💇‍♀️", "female")
        .row();

    await ctx.reply(
        `Nice name, ${fullname.text},  may i know your gender? 💁 `,
        {
          reply_markup: genderOptions,
        }
    );

    //wait for genderOptions response, otherwise asking again
    const genderResponse = await conversation.waitForCallbackQuery(
        ["male", "female"],
        {
          otherwise: (ctx) =>
            ctx.reply("Err, what is your gender again?", {
              reply_markup: genderOptions,
            }),
        }
    );

    /**
     * STEP 3 - asking for department code
     */
    await ctx.reply(`Great! Last question, what is your department code?`, {
      reply_markup: { force_reply: true },
    });

    const { message: orgCode } = await conversation.wait();

    /**
     * STEP 4 - confirmation
     */
    const confirmationOptions = new InlineKeyboard()
        .text("Yes 🟢", "confirmJoin")
        .text("No ❌", "cancelJoin")
        .row()
        .text("Start Over ", "startOver");

    await ctx.reply(
        `Awesome!!, i just want to confirm your data again.

      Name: ${fullname.text}
      Gender: ${genderResponse.match}
      Department Code: ${orgCode.text}
      
      Is that correct? Then, please confirm your participation. Else you can cancel it and start over `,
        {
          reply_markup: confirmationOptions,
        }
    );

    //wait for confirmation
    const confirmationResponse = await conversation.waitForCallbackQuery(
        ["confirmJoin", "cancelJoin", "startOver"],
        {
          otherwise: (ctx) =>
            ctx.reply("Err..please choose one again", {
              reply_markup: confirmJoinOptions,
            }),
        }
    );

    //if confrimation is not correct, then cancel the conversation
    if (confirmationResponse.match === "cancelJoin") {
      await ctx.reply(`😞 I am sad, but promise to join next time ya!`);
      return;
    }

    //if startOver, leave the conversation and enter the conversation again
    if (confirmationResponse.match === "startOver") {
      await ctx.reply(`Ok, let's start over again! Click /join`);
      return;
    }

    //if confirmation is correct, then store the data
    if (confirmationResponse.match === "confirmJoin") {
      //checking if the user already registered within 1 week
      const { data, error } = await isAlreadyRegisteredInAWeek(ctx.chat.id);

      if (error) {
        await ctx.reply(
            "Sorry, something went wrong. please try again later.!"
        );
        return;
      }

      if (data.length > 0) {
        await ctx.reply(
            "Sorry, you already registered within 1 week. please try again later.!"
        );
        return;
      }

      //proceed to store the database
      if (data.length === 0) {
        //loading state while sending data to API
        const loading = await ctx.reply("...Registering in the database...⏲️");

        const userData = {
          name: fullname.text,
          org_code: orgCode.text,
          telegram_id: ctx.chat.id,
          gender: genderResponse.match,
        };

        const { data, error } = await postParticipants(userData);

        if (data) {
          await ctx.api.deleteMessage(ctx.chat.id, loading.message_id);
          await ctx.reply(
              "Congrats!! 🎉 you are now registered to our Lunch Buddies we will get back to you soon.!"
          );
        }

        if (error) {
          await ctx.api.deleteMessage(ctx.chat.id, loading.message_id);
          console.debug("error", error);
          await ctx.reply(
              "Sorry, something went wrong. please try again later.!"
          );
        }
      }
    }
  }
}
