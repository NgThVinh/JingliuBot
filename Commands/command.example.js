const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    disable: true, // whether this command is available
    hidden: true, // whether this command is showed in `help` command
    hasRole: [],
    hasAllRole: [],
    blacklistChannel: [],
    whitelistChannel: [],
    nsfw: true,
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("command_name")
        .setDescription("Command Description")
        .setDefaultMemberPermissions(PermissionFlagsBits.ADMINISTRATOR)

        .addSubcommandGroup((groups) => groups
            .setName("group1_name")
            .setDescription("Group1 Description")

            .addSubcommand((options) => options
                .setName("subcommand1_name")
                .setDescription("SubCommand1 Description")))

        .addSubcommandGroup((groups) => groups
            .setName("group2_name")
            .setDescription("Group2 Description")

            .addSubcommand((options) => options
                .setName("subcommand1_name")
                .setDescription("SubCommand1 Description")))

        .addSubcommand((options) => options
            .setName("subcommand1_name")
            .setDescription("SubCommand1Description"))

        .addSubcommand((options) => options
            .setName("subcommand2_name")
            .setDescription("SubCommand2 Description")),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        // process
    }
};