const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'mod',
    description: "shows moderator commands",
    run: async (bot, message, args) => {

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            const kembed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setTitle("**Insufficient Permissions**")
                .addField(`${message.author.tag}, You do not have the required permissions to view this command`, '- Required permission is `"KICK_MEMBERS"`')
                .setTimestamp()
                .setAuthor(bot.user.username)
            message.channel.send(kembed);
            return;
        } else if (!message.member.hasPermission("BAN_MEMBERS")) {
            const bembed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setTitle("**Insufficient Permissions**")
                .addField(`${message.author.tag}, You do not have the required permissions to view this command`, '- Required permission is `"BAN_MEMBERS"`')
                .setTimestamp()
                .setAuthor(bot.user.username)
            message.channel.send(bembed);
            return;
        }else if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            const dembed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setTitle("**Insufficient Permissions**")
                .addField(`${message.author.tag}, You do not have the required permissions to view this command`, '- Required permission is `"MANAGE_MESSAGES"`')
                .setTimestamp()
                .setAuthor(bot.user.username)
            message.channel.send(dembed);
            return;
        }

        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setThumbnail(bot.user.displayAvatarURL())
            .setTitle("Moderator Bot Commands")
            .addField('`c!ban <user>`', 'Bans selected user')
            .addField('`c!kick <user>`', 'Kicks selected user')
            .addField('`c!clear <amount>`', 'Clears defined amount of messages')
            .addField('`c!poll <poll content>`', 'Start a poll in the current channel (with emoji reactions)')
            .addField('`c!botinfo`', 'Show bot information (may be sensitive on some servers)')
            .setTimestamp()
            .setAuthor(bot.user.username)
        message.author.send(embed);
        message.react("?")
        
    }
}