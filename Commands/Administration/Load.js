const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    hidden: true,
    disable: true,
    data: new SlashCommandBuilder()
        .setName("load")
        .setDescription("Load a command/event")
        .setDefaultMemberPermissions(PermissionFlagsBits.ADMINISTRATOR)
        .addSubcommand((options) => options
            .setName("commands")
            .setDescription("Load a command")
            .addStringOption((input) => input
                .setName('name')))
        .addSubcommand((options) => options
            .setName("events")
            .setDescription("Load an event")
            .addStringOption((input) => input
                .setName('name'))),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        // process
    }
};