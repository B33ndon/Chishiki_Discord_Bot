const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: '8ball',
    description: "8ball determines the answer",
    run: async (bot, message, args) => {

        if (!args[2]) return message.reply("Please ask a full question!");
        let replies = ["Yes", "No", "Maybe", "Uncertain", "Most likely", "I don't know", "Ask again later"]

        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice(0).join(" ");

        let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle("8Ball says...")
            .addField("Question", question)
            .addField("Answer", replies[result])
            .setTimestamp()
            .setFooter(`${bot.user.username}`)
        message.channel.send(embed);

    }
}