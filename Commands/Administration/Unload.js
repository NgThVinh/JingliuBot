const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    hidden: true,
    disable: true,
    data: new SlashCommandBuilder()
        .setName("unload")
        .setDescription("Unload a command/event")
        .setDefaultMemberPermissions(PermissionFlagsBits.ADMINISTRATOR)
        .addSubcommand((options) => options
            .setName("commands")
            .setDescription("Unload an commands")
            .addStringOption((input) => input
                .setName("name")))
        .addSubcommand((options) => options
            .setName("events")
            .setDescription("Unload an events")
            .addStringOption((input) => input
                .setName("name"))),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const subCommand = interaction.options.getSubcommand();

        switch (subCommand) {
            case "events":
                {
                    const eventName = interaction.options.getSubcommand();
                    try {
                        const value = client.events.get("eventName")
                        client.removeListener(`${eventName}`, value, true);
                        await interaction.reply("Unloaded events.");
    
                        client.logger.debug('Unloaded events.')
                    } catch (error) {
                        client.logger.error('An error has occurred.')
                        await interaction.reply("An error has occurred.");
                    }
                }
                break;
            case "commands":
                {
                    await loadCommands(client);
                    await interaction.reply("Reloaded commands.");

                    client.logger.debug('Reloaded commands.')
                }
                break;
            case "tasks":
                {
                    await loadTasks(client);
                    await interaction.reply("Reloaded commands.");

                    client.logger.debug('Reloaded commands.')
                }
                break;
        }
    }
};