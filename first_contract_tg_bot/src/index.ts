import dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { beginCell, toNano } from "ton-core";
import qs from "qs";

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

  bot.hears ("Increment by 1", (ctx) => {

    const msg_body = beginCell()
      .storeUint(1, 32) // OP code
      .storeUint(1, 32) // increment_by value
      .endCell();

    let link = `https://test.tonhub.com/transfer/${process.env.SC_ADDRESS}?${qs.stringify({
        text: "Increment counter by 1",
        amount: toNano("0.05").toString(10),
        bin: msg_body.toBoc({ idx: false }).toString("base64"),
  })}`;

  ctx.reply("To increment counter by 1, please sign a transaction:", {
    reply_markup: {
        inline_keyboard: [
            [{
                text: "Sign transaction",
                url: link,
            }]
        ]
    }
  });
});

  bot.hears("Deposit 0.6 TON", (ctx) => {
    // TODO: send deposit transaction
    ctx.reply("Deposited 0.6 TON");
  });
  
  bot.hears ("Withdraw 0.2 TON", (ctx) => {
    // TODO: send withdraw transaction
    ctx.reply("Withdrew 0.2 TON");
  });

  bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop ("SIGTERM"));