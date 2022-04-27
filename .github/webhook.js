const Discord = require("webhook-discord");
const client = new Discord.Webhook(process.env.DISCORD);

const message = new Discord.MessageBuilder()
  .setColor("#58C6B2")
  .setTitle(":new: New Release :new:")
  .setDescription(`\`@kyve/solana\` ${process.env.VERSION} released.`)
  .setURL(
    `https://github.com/kyve-org/solana/releases/tag/${process.env.VERSION}`
  )
  .setName("Release Bot");

// noinspection JSIgnoredPromiseFromCall
client.send(message);
