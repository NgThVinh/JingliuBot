const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const { default_embed_color } = require("../../config.json");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("server")
        .setDescription("server info.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ADMINISTRATOR)
        .addSubcommand((options) => options
            .setName("info")
            .setDescription("Server info."))
    ,
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const subCommand = interaction.options.getSubcommand();

        switch (subCommand) {
            case "info":
                {
                    const guild = interaction.guild;
                    
                    const embed = new EmbedBuilder()
                        .setColor(default_embed_color)
                        .setThumbnail(guild.iconURL({ dynamic: true }))
                        .setTitle(`❯ ${guild.name}`)
                        .setFields(
                            {name: 'Owner', value: `${client.members.cache.get('guild.ownerId')} (${guild.ownerId})`},
                            {name: 'Member: ', value: `${guild.memberCount}`},
                        )
                    await interaction.reply({ embeds: [embed] });
                }
                break;
        }
    }
};