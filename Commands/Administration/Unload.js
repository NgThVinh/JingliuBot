const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    hidden: true,
    data: new SlashCommandBuilder()
        .setName("unload")
        .setDescription("Command Description")
        .setDefaultMemberPermissions(PermissionFlagsBits.ADMINISTRATOR)
        // .addSubcommand((options) => options
        //     .setName("commands")
        //     .setDescription("Load an commands.")
        //     .addStringOption((input) => input
        //         .setName("Command's name.")))
        // .addSubcommand((options) => options
        //     .setName("events")
        //     .setDescription("Load an events.")
        //     .addStringOption((input) => input
        //         .setName("Event's name.")))
                ,
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        // process
    }
};