const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'serverinfo',
    description: "shows server info",
    run: async (bot, message, args) => {

        const g = message.member.guild;
        const gs = g.shard.id;
        const minutes = Math.floor(g.afkTimeout / 60000);

        let pages = ['1', '2', '3'];
        let page = 1;

        const totalEmotes = g.emojis.cache.array().join(" ") || 'No Server Emotes'

        function checkMembers(guild) {
            let memberCount = 0;
            guild.members.cache.forEach(member => {
                if (!member.user.bot) memberCount++;
            });
            return memberCount;
        }

        function checkBots(guild) {
            let botCount = 0;
            guild.members.cache.forEach(member => {
                if (member.user.bot) botCount++;
            });
            return botCount;
        }

        function checkOnlineUsers(guild) {
            let onlineCount = 0;
            guild.members.cache.forEach(member => {
                if (member.user.presence.status === "online")
                    onlineCount++;
            });
            return onlineCount;
        }

        function checkIdleUsers(guild) {
            let idleCount = 0;
            guild.members.cache.forEach(member => {
                if (member.user.presence.status === "idle")
                    idleCount++;
            });
            return idleCount;
        }

        function checkOfflineUsers(guild) {
            let offlineCount = 0;
            guild.members.cache.forEach(member => {
                if (member.user.presence.status === "offline")
                    offlineCount++;
            });
            return offlineCount;
        }

        function checkDNDUsers(guild) {
            let dndCount = 0;
            guild.members.cache.forEach(member => {
                if (member.user.presence.status === "dnd")
                    dndCount++;
            });
            return dndCount;
        }

        const rv = message.guild.roles.cache.array().slice(0, 20).join("\n")
        const ev = message.guild.emojis.cache.array().slice(0, 20).join("\n")

        const tc = message.guild.channels.cache
        .filter(c => c.type == "text")
        .size

        const vc = message.guild.channels.cache
        .filter(c => c.type == "voice")
        .size

        const catg = message.guild.channels.cache
        .filter(c => c.type == "category")
        .size

        let eembed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setThumbnail(g.iconURL)
            .setTitle(`**${g.name} - Server Information**`)
            .addField(`**Emotes: [${g.emojis.cache.size}] - (Limits list to 20)**`, ev)
            .setTimestamp()

        let rembed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setThumbnail(g.iconURL)
            .setTitle(`**${g.name} - Server Information**`)
            .addField(`**Roles: [${g.roles.cache.size}] - (Limits list to 20)**`, rv)
            .setTimestamp()
        let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setThumbnail(g.iconURL)
            .setTitle(`**${g.name} - Server Information**`)
            .addField("**Server Name**", g.name, true)
            .addField("**Region**", g.region, true)
            .addField("**Statistics**", `<:premuim:717098739113918464> **Owner:** ${g.owner}\n<a:rainbowArrow:746931642928595005> **Humans:** ${checkMembers(g)}\n<a:rainbowArrow:746931642928595005> **Bots:** ${checkBots(g)}\n<a:rainbowArrow:746931642928595005> **Total Users:** ${g.memberCount}\n<a:rainbowArrow:746931642928595005> **Server Shard:** ${g.shard.id}\n\n<:Online:717097709529727119> **Online:** ${checkOnlineUsers(g)}\n<:Fixing:717097695046664222> **Idle:** ${checkIdleUsers(g)}\n<:DnD:717097679427076106> **DnD:** ${checkDNDUsers(g)}\n<:Offline:746896654002815139> **Offline:** ${checkOfflineUsers(g)}`)
            .addField("**Server Settings**", `<a:rainbowArrow:746931642928595005> **Verification Level:** ${g.verificationLevel}\n<a:rainbowArrow:746931642928595005> **AFK Timeout:** ${g.afkTimeout / 60} minutes\n<a:rainbowArrow:746931642928595005> **Content Filter:** ${g.explicitContentFilter}\n<a:rainbowArrow:746931642928595005> **Creation:** ${g.createdAt}`)
            .addField(`**Channels** [${g.channels.cache.size}]`, `<a:rainbowArrow:746931642928595005> **Text Channels:** ${tc}\n<a:rainbowArrow:746931642928595005> **Voice Channels:** ${vc}\n<a:rainbowArrow:746931642928595005> **Categories:** ${catg}`)            .setTimestamp()

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
                    if (page === 2) {
                        page--;
                        embed.setFooter(`Page ${page} of ${pages.length}`)
                        msg.edit(embed)
                    } else if (page === pages.length) {
                        page--;
                        rembed.setFooter(`Page ${page} of ${pages.length}`)
                        msg.edit(rembed)
                    }
                })

                forwards.on('collect', r => {
                    if (page === pages.length) return;
                    if (page === 1) {
                        page++;
                        rembed.setFooter(`Page ${page} of ${pages.length}`)
                        msg.edit(rembed)
                    } else if (page === 2) {
                        page++;
                        eembed.setFooter(`Page ${page} of ${pages.length}`)
                        msg.edit(eembed)
                    };
                })
            })
        })
    }
}