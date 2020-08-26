const Discord = require("discord.js");
const config = require('../../config.json');//\n

module.exports = {
    name: 'help',
    description: "dms user help menu",
    run: async (bot, message, args) => {

        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setThumbnail(bot.user.displayAvatarURL())
            .setTitle('**Bot Commands And Help**')
            .addField('**Fun/Basic Commands**', '8ball, csgo, dog, flipcoin, lyrics, meme, rolldice')
            .addField('**Utility Commands**', 'botinfo, serverinfo, userinfo, support, vote')
            .addField('**Moderator Commands**', 'Use `c!mod` to see moderator commands (requires perms)')
            .setTimestamp()
            .setFooter(bot.user.username)
        message.author.send(embed);
        
        message.react("?")
    }
}