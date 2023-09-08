module.exports = {
	name: 'buttonClick',
	async execute(interaction, client) {
		const button = client.buttons.get(interaction.customId);
		if (!button) return;
		try {
			await button.execute(interaction, client);
		} catch (error) {
			client.logger.error(`Error executing button ${interaction.name}`);
			client.logger.error(error);
		}

		client.logger.debug(`Button clicked by ${interaction.member.id} (${interaction.member.username}).`);
	},
};