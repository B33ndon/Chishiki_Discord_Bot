const { ShardingManager } = require("discord.js");
require('dotenv').config()

const token = process.env.TOKEN

const manager = new ShardingManager("./bot.js", {
    token,
    totalShards: "auto"
});

manager.spawn();
manager.on("shardCreate", shard => console.log(`\nShard #${shard.id} is online`));