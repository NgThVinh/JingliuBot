module.exports = {
	name: 'commandCreate',
	async execute(interaction, client, message) {
		const cmdName = message.slice(client.prefix.length).toLowerCase();

        client.command.forEach(command => {
            
            });

		client.logger.debug(`Button clicked by ${interaction.member.id} (${interaction.member.username}).`);
	},
};