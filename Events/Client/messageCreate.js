module.exports = {
	name: 'messageCreate',
	async execute(interaction, client, message) {
		if (message.content.startsWith(client.prefix)) {
			client.emit('commandCreate', interaction, client);
		}

		client.logger.debug(`Message (${message.id}) created by ${message.author.id} in ${interaction.channelId}.`);
	},
};