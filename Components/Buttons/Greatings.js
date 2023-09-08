module.exports = {
    type: 'button',
    data: {
        name: "greatings",
        customId: "greatings",
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: "Hello!"
        });
    }
}