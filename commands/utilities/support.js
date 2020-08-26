const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'support',
    description: "embed message for support server",
    run: async (bot, message, args) => {

        const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle(`Chishiki Support Server`)
        .setURL('https://discord.gg/hG3CBmP')
        .addField('**Bot Support Invite:**', 'https://discord.gg/hG3CBmP')
        .addField('**Bot Invite Link:**', 'https://top.gg/bot/717039720877654047')
        .setTimestamp()
        .setFooter(`${bot.user.username}`)
        message.channel.send(embed);
        
    }
}