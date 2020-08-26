const Discord = require("discord.js");
const config = require('../../config.json');//\n
const client = require("discord.js");

module.exports = {
    name: 'botinfo',
    description: "Displays bot information",
    run: async (bot, message, args) => {

        let pre = bot.presence.activities
        pre.length === 0 ? pre = 'No Activity' : pre

        const scount = (await bot.shard.fetchClientValues("guilds.cache.size")).reduce((a, b) => b + a);
        const ucount = (await bot.shard.fetchClientValues("users.cache.size")).reduce((a, b) => b + a);

        const invb = "https://bit.ly/34p8Tfq"
        const invbs = "https://discord.gg/hG3CBmP"

        let days = Math.floor(bot.uptime / 86400000);
        let hours = Math.floor(bot.uptime / 3600000) % 24;
        let minutes = Math.floor(bot.uptime / 60000) % 60;
        let seconds = Math.floor(bot.uptime / 1000) % 60;

        const ping =  Date.now() - message.createdTimestamp;

        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setThumbnail(bot.user.displayAvatarURL())
            .setTitle("Bot Information")
            .addField("**Name:**", bot.user.username, true)
            .addField("**Creator:**", config.owner, true)
            .addField("**Information:**", `<a:rainbowArrow:746931642928595005> **Status:** ${bot.presence.status}\n<a:rainbowArrow:746931642928595005> **ID:** ${bot.user.id}`)
            .addField("**Statistics:**", `<a:rainbowArrow:746931642928595005> **Server Count:** ${scount}\n<a:rainbowArrow:746931642928595005> **User Count:** ${ucount}\n<a:rainbowArrow:746931642928595005> **Server Shard** ${message.member.guild.shardID}\n<a:rainbowArrow:746931642928595005> **Ping:** ${ping}ms\n<a:rainbowArrow:746931642928595005> **Uptime:** ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`)
            .addField("**Links:**", `<a:rainbowArrow:746931642928595005> **Bot Invite:** ${invb}\n<a:rainbowArrow:746931642928595005> **Support Server Invite:** ${invbs}`)
        message.channel.send(embed);

    }
}