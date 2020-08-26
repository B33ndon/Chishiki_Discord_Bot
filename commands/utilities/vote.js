const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'vote',
    description: "gives user link to upvote bot",
    run: async (bot, message, args) => {

        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(`${message.author.tag} - Thanks for voting!`)
            .setURL(config.vlink)
            .addField(`**Link:**`, `https://top.gg/bot/717039720877654047`)
        message.author.send(embed);
        message.channel.send(`Message sent to ${message.author.name} ~ top.gg bot link`)
        
    }
}