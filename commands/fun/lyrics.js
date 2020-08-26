const Discord = require("discord.js");
const config = require('../../config.json');//\n

module.exports = {
    name: 'lyrics',
    description: "shows lyrics for defined song",
    run: async (bot, message, args) => {

        message.react("?")

        const genius = require("genius-lyrics")
        const G = new genius.Client(process.env.GENIUS)

        G.tracks.search(message.content.split(' ').slice(1).join(' '), { limit: 1 })
            .then(results => {
                const song = results[0]
                const embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .addField('Song: ',`${song.title}`)
                .addField('Artist: ', `${song.artist.name}`)
                .addField('URL: ', `${song.url}`)
                .setTimestamp()
                .setFooter(`${bot.user.username}`)
                message.channel.send(embed)
            })
            .catch(err => message.reply(err))
        
        message.reactions.removeAll().catch(error => console.error('Failed to remove emojis in lyrics command', error));

    }

}