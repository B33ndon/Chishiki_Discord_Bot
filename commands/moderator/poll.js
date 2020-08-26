const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'poll',
    description: "create a poll for any question or event",
    run: async (bot, message, args) => {

        const embed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle('Use Either Of These To Start A Poll')
            .addField("c!poll <poll content>", "Start a poll in the current channel")
            .setTimestamp()
            .setAuthor(bot.user.username)
            
        if (!args[0]) {
            message.channel.send(embed);
        }

        if (!args[1]) {

            let msgArgs = args.slice(0).join(" ");

            const embed2 = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(`${msgArgs}`)
            .setTimestamp()
            .setFooter(bot.user.username)
    
            message.channel.send(embed2).then(messageReaction => {
                messageReaction.react("??");
                messageReaction.react("??");
            });

        }





    }
}