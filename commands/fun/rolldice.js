const Discord = require("discord.js");
const config = require('../../config.json');

var dice = [1, 2, 3, 4, 5, 6];

module.exports = {
    name: 'rolldice',
    description: "rolls a dice",
    run: async (bot, message, args) => {

        const embed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .addField("First dice", dice[Math.floor(Math.random() * dice.length)], true)
            .addField("Second dice", dice[Math.floor(Math.random() * dice.length)], true)
            .setTimestamp()
            .setFooter(`${bot.user.username}`)
        return message.channel.send(embed);

    }
}