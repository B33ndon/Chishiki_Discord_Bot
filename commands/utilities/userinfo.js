const Discord = require("discord.js");
const config = require('../../config.json');       //\n

module.exports = {
    name: 'userinfo',
    description: "shows user info",
    run: async (bot, message, args) => {

        let member = message.mentions.members.first() || message.member,
            user = member.user;

        if (!user) {
            const k = new Discord.MessageEmbed()
                .setColor(config.color)
                .addField(`${message.author.tag} Please tag a user`, "`c!userinfo <mention user>`")
                .setTimestamp()
            message.channel.send(k);
        } else if (user) {

            let pages = ['1', '2'];
            let page = 1;

            let pre = user.presence.activities
            pre.length === 0 ? pre = 'No Activity' : pre

            let ac = user.presence.clientStatus
            ac.length === 0 ? ac = 'Null' : ac

            const str = Object.keys(ac)

            let rembed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setTitle("User Information")
                .setThumbnail(user.displayAvatarURL())
                .addField(`**Roles: [${member.roles.cache.size}] - (Limits list to 20)**`, member.roles.cache.map(r => `${r}`).slice(0, 20).join("\n"))
                .setTimestamp()

            let eembed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setTitle("User Information")
                .setThumbnail(user.displayAvatarURL())
                //.addField(`**Permissions: [ ]**`, member.hasPermission.cache.map(r => `${r}`).join("\n"))
                .setTimestamp()

            const embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setTitle("User Information")
                .setThumbnail(user.displayAvatarURL())
                .addField("**Name:**", user.tag, true)
                .addField("**Nickname:**", member.nickname !== null ? `${member.nickname}` : 'None', true)
                .addField("**Dates:**", `<a:rainbowArrow:746931642928595005> **Account Created:** ${user.createdAt}\n<a:rainbowArrow:746931642928595005> **Joined Server:** ${member.joinedAt}`)
                .addField("**Information:**", `<a:rainbowArrow:746931642928595005> **Status:** ${user.presence.status}\n<a:rainbowArrow:746931642928595005> **Platform:** ${str}\n<a:rainbowArrow:746931642928595005> **Bot:** ${user.bot}\n<a:rainbowArrow:746931642928595005> **Presence:** ${pre}\n<a:rainbowArrow:746931642928595005> **ID:** ${user.id}\n<a:rainbowArrow:746931642928595005> **Last Message:** "${member.lastMessage}" - ${member.lastMessage.createdAt}`)
                .setTimestamp()
                .setFooter(`${bot.user.username}`)


            message.channel.send(embed).then(msg => {

                msg.react('⬅️').then(r => {
                    msg.react('➡️')

                    const forwardsFilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id;
                    const backwardsFilter = (reaction, user) => reaction.emoji.name === '➡️' && user.id === message.author.id;

                    const backwards = msg.createReactionCollector(forwardsFilter, {
                        time: 80000
                    });
                    const forwards = msg.createReactionCollector(backwardsFilter, {
                        time: 80000
                    });

                    backwards.on('collect', r => {
                        if (page === 1) return;

                        page--;
                        embed.setFooter(`Page ${page} of ${pages.length}`)
                        msg.edit(embed)

                    })

                    forwards.on('collect', r => {
                        if (page === pages.length) return;

                        page++;
                        rembed.setFooter(`Page ${page} of ${pages.length}`)
                        msg.edit(rembed)

                    })
                });
            });
        }
    }
}