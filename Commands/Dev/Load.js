const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    hidden: true,
    data: new SlashCommandBuilder()
        .setName("load")
        .setDescription("Load a command/event.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ADMINISTRATOR)
        .addSubcommand((options) => options
            .setName("commands")
            .setDescription("Load an commands.")
            .addStringOption((input) => input
                .setName("name")))
        .addSubcommand((options) => options
            .setName("events")
            .setDescription("Load an events.")
            .addStringOption((input) => input
                .setName("name"))),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        // process
        
    }
};