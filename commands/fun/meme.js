const Discord = require("discord.js");
const config = require('../../config.json');
const randomPuppy = require("random-puppy");

module.exports = {
    name: 'meme',
    description: "sends a random meme",
    run: async (bot, message, args) => {
        const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setImage(img)
            .setURL(`https://reddit.com/r/${random}`)
            .setTimestamp()
            .setFooter(`${bot.user.username}`)
        message.channel.send(embed);
        
    }
}