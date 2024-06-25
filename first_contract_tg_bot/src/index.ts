import dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { beginCell, toNano } from "ton-core";
import qs from "qs";
import { message } from "telegraf/filters";

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

bot.on(message("web_app_data"), (ctx) => ctx.reply("ok"));

bot.hears ("Increment by 1", (ctx) => {
    const msg_body = beginCell()
      .storeUint(1, 32) // OP code
      .storeUint(1, 32) // increment_by value
      .endCell();

    let link = `https://app.tonkeeper.com/transfer/${process.env.SC_ADDRESS}?${qs.stringify({
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
    const msg_body = beginCell().storeUint(2, 32).endCell();

      
    let link = `https://app.tonkeeper.com/transfer/${
        process.env.SC_ADDRESS
    }?${qs.stringify(
        {
            text: "Deposit 0.6 TON",
            amount: toNano("0.05").toString(10),
            bin: msg_body.toBoc({ idx: false}).toString("base64"),
        }
    )}`;

    ctx.reply("To deposit 0.6 TON please sign a transaction:", {
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

  bot.hears("Withdraw 0.2 TON", (ctx) => {
    const msg_body = beginCell().storeUint(3, 32).storeCoins(toNano(`0.2`)).endCell();
      
    let link = `https://app.tonkeeper.com/transfer/${process.env.SC_ADDRESS}
    ?${qs.stringify({
            text: "Withdraw 0.2 TON",
            amount: toNano("0.05").toString(10),
            bin: msg_body.toBoc({ idx: false}).toString("base64"),
            }
    )}`;
        
    ctx.reply("To withwraw 0.2 TON please sign a transaction:", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Sign transaction",
              url: link,
            }
          ]
        ]
      }
    });
  });

  bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop ("SIGTERM"));