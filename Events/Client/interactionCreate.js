module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (interaction.isChatInputCommand()) {
			client.emit('slashCreate', interaction, client);
		}

		else if (interaction.isButton()) {
			client.emit('buttonClick', interaction, client);
		}

		client.logger.debug(`Interaction created by ${interaction.user.id} (${interaction.user.username}).`);
	},
};