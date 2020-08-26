const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'ban',
    description: "bans defined user",
    run: async (bot, message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ You do not have permissions to ban members. Please contact a staff member")
                .then(m => m.delete(5000));
        }
        
        if (!args[0]) {
            return message.reply("Please provide a person to ban.")
                .then(m => m.delete(5000));
        }
        
        if (message.member.hasPermission("BAN_MEMBERS")) {
            if (user) {
                if (user) {
                    user.ban(`You were banned from ${message.member.guild.name}!`).then(() => {
                        message.channel.send(`Banned: ${message.mentions.members.first()}!`)
                    }).catch(err => {
                        message.reply(`Failed to ban ${message.mentions.members.first()}, idfk why. Go to the support server for outage info. - can be found in <prefix>!support`)
                        console.log(err);
                    });
                } else {
                    message.reply(`${message.mentions.members.first()} is not in the server you brainlet. jk luv u :)`)
                }
            } else {
                message.reply(`${message.mentions.members.first()} is not in this server or just doesn't exist lmao`)
            }
        }
    }
}