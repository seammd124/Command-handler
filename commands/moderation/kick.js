const Discord = require("discord.js")
module.exports = {
    name: "kick",
    aliases : [''],
    description: "Kick someone",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You dont have permissions")
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("I dont have permissions")

        const member = message.mentions.members.first()
        if(!args[0]) return message.channel.send("Please specify a member")
        if(!member) return message.channel.send("This member does not exist!")

        if(member === message.author) return message.channel.send("You cant kick yourself")
        if(member === message.guild.owner) return message.channel.send("You cant kick server owner")

        const reason = args.slice(1).join(" ")
        if(!reason) return message.channel.send('Please give me reason')

        member.kick(reason)

         const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag)
        .setColor("RED")
        .setThumbnail(member.user.displayAvatarURL())
        .addField("You have been kicked!", member, true)
        .addField("Kicked by", message.author.toString(), true)
        .addField("Reason", `\`${reason}\``)
        .setTimestamp()
        message.channel.send(embed);
     }
}