const Discord = require("discord.js");
const config = require('../../config.json');

var flipcoin = ["Heads", "Tails"];

module.exports = {
    name: 'flipcoin',
    description: "flip a coin for heads or tails",
    run: async (bot, message, args) => {

        var randomIndex = Math.floor(Math.random() * flipcoin.length);

        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .addField('Coin Flip: ', `**${flipcoin[randomIndex]}**`)
            .setTimestamp()
            .setFooter(`${bot.user.username}`)
        message.channel.send(embed)

    }
}