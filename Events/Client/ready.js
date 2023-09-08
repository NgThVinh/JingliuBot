module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		const { loadTasks } = require('../../Handlers/TaskHandler')
		await loadTasks(client);

		client.logger.info(`Logged in as ${client.user.tag}`);
	},
};