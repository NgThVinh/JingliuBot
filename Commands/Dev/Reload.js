const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { loadCommands } = require("../../Handlers/CommandHandler");
const { loadEvents } = require("../../Handlers/EventHandler");
const { loadTasks } = require("../../Handlers/TaskHandler");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reloads all commands/events.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ADMINISTRATOR)
        .addSubcommand((options) => options
            .setName("commands")
            .setDescription("Reloads all commands.")
        )
        .addSubcommand((options) => options
            .setName("tasks")
            .setDescription("Reloads all tasks.")
        )
        .addSubcommand((options) => options
            .setName("events")
            .setDescription("Reloads all events.")
        ),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {BotClient} client
     */

    async execute(interaction, client) {
        const subCommand = interaction.options.getSubcommand();

        switch (subCommand) {
            case "events":
                {
                    for (const [key, value] of client.events)
                        client.removeListener(`${key}`, value, true);
                    await loadEvents(client);
                    await interaction.reply("Reloaded events.");

                    client.logger.debug('Reloaded events.')
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
    },
};
