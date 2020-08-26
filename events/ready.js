const { nodes } = require("../config.json")

const id = "717039720877654047";

module.exports = async (bot) => {

                setInterval(function () {
            //status change

            const statuses = [
                `server shards`,
                "c!help",
                `c!botinfo`
            ]

            const status = statuses[Math.floor(Math.random() * statuses.length)];
            
            bot.user.setActivity(status, { type: "WATCHING" });
    
        }, 20000)

        if (bot.shard.ids[0] === 0) {

            console.log(`\n${bot.user.username} is online!`)
        }
}