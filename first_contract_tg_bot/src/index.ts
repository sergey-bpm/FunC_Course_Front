import dotenv from "dotenv";
import { Telegraf } from "telegraf";

dotenv.config();

const bot = new Telegraf(process.env.TG_BOT_TOKEN!);

bot.start((ctx) =>
    ctx.reply("Welcome to our counter app!", {
      reply_markup: {
        keyboard: [
          ["Increment by 1"],
          ["Deposit 0.6 TON"],
          ["Withdraw 0.2 TON"],
        ],
      },
    })
  );

  bot.hears("Increment by 1", (ctx) => {
    // TODO: send increment transaction
    ctx.reply ("Increment by 1");
  });

  bot.hears("Deposit 0.6 TON", (ctx) => {
    // TODO: send deposit transaction
    ctx.reply("Deposit 0.6 TON");
  });
  
  bot.hears ("Withdraw 0.2 TON", (ctx) => {
    // TODO: send withdraw transaction
    ctx.reply("Withdrawn 0.2 TON");
  });

  bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop ("SIGTERM"));