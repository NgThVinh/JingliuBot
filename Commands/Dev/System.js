const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const { default_embed_color } = require("../../config.json");
const osu = require('node-os-utils');
const os = require('node:os');
// const si = require("systeminformation");

module.exports = {
    userPermissions: [1021736586410467390],
    data: new SlashCommandBuilder()
        .setName("system")
        .setDescription("System status.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ADMINISTRATOR)
    ,
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const platform = `${os.platform()}-${os.release()}`;
        const hostname = os.hostname();
        const arch = os.arch();
        const cpu = `Cores: ${osu.cpu.count()}
                     Frequency: ${os.cpus()[0].speed} MHz
                     Usage: ${await osu.cpu.usage()} %`;
        const memory = `Total: ${(os.totalmem()/1024**3).toFixed(2)}
                        Available: ${(os.freemem()/1024**3).toFixed(2)} GB
                        Usage: ${((os.totalmem()-os.freemem())/os.totalmem()*100).toFixed(2)} %`;
        // const disk_info = (await si.diskLayout())[0];
        // const disk = `Type: ${disk_info.type}
        //               Total: ${(disk_info.size/1024**3).toFixed(2)}GB`;
        
        const embed = new EmbedBuilder()
            .setColor(default_embed_color)
            .setTitle('❯ System Info')
            .addFields(
                { name: 'Platform', value: platform },
                { name: 'Discord.js', value: require('discord.js').version },
                { name: 'Hostname', value: hostname, inline: true },
                { name: 'Architecture', value: arch, inline: true },
                { name: 'Nodejs', value: process.version, inline: true },
                { name: 'CPU', value: cpu, inline: true },
                { name: 'Memory', value: memory, inline: true },
                // { name: 'Disk', value: disk, inline: true },
            )
        await interaction.reply({ embeds: [embed] });
    }
};