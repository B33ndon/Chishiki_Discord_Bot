const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'clear',
    description: "clears specified amount of messages",
    run: async (bot, message, args) => {

        if (message.deletable) {
            message.delete();
        }
        
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("You can't delete messages....").then(m => m.delete(5000));
        }
        
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("Yeah.... That's not a number? I also can't delete 0 messages by the way.").then(m => m.delete(5000));
        }
        
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Sorryy... I can't delete messages.").then(m => m.delete(5000));
        }
        
        if (message.guild.me.hasPermission("ADMINISTRATOR")) {
            let deleteAmount;
            if (parseInt(args[0]) > 100) {
                deleteAmount = 100;
            } else {
                deleteAmount = parseInt(args[0]);
            }
            var msg = message.channel.bulkDelete(deleteAmount, true)
                .then(deleted => message.channel.send(`I deleted \`${deleted.size}\` messages.`))
                .then(setTimeout(function () {

                    message.channel.bulkDelete(1)
            
                }, 2000))
                .catch(err => message.reply(`Something went wrong... you can only deleted messages that are fairly recent, not that long ago.`));

        }
    }
}