const { EmbedBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js')
const humanizeDuration = require("humanize-duration");

module.exports = {
	name: 'slashCreate',
	async execute(interaction, client) {
		client.logger.debug(`Slash created by ${interaction.member.id} (${interaction.member.username}).`);

		const command = client.commands.get(interaction.commandName);
		const guild = client.guilds.cache.get(interaction.guildId);
		// const channel = guild.channels.cache.get(interaction.channelId);
		const member = guild.members.cache.get(interaction.member.id);
		
		if (!command) {
			client.logger.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}
		
		// Check for user permissions
		if (command.userPermissions) {
			let neededPermissions = [];
			command.userPermissions.forEach((perm) => {
				if (!member.roles.cache.has(perm)) neededPermissions.push(perm);
			});
		
			// Display missing user permissions
			if (neededPermissions.length > 0) {
				const perms = new PermissionsBitField();
				neededPermissions.forEach((item) => perms.add(BigInt(item)));
				return interaction.reply({ embeds: [new EmbedBuilder({ description: 'Missing permission' })], ephemeral: true });
			}
		}

		// check cooldown
		if (command.timeout) {
			const cooldown = client.timeout.get(interaction.member.id);
			if (cooldown) {
				const remaining = humanizeDuration(cooldown - Date.now(), { language: 'en', round: true });

				return interaction.reply({ content: `You have to wait ${remaining} before you can work again.`, ephemeral: true })
					.catch(console.error);
			}
		}

		try {
			if (command.disable) { return interaction.reply("Command is disabled.") }
			await command.execute(interaction, client);
		} catch (error) {
			client.logger.error(`Error executing ${interaction.commandName}`);
			client.logger.error(error);
		}

		// set cooldown
		if (command.timeout) {
			const now = new Date();
			const cooldown = now.setSeconds(now.getSeconds() + command.timeout);
			client.timeout.set(interaction.member.id, cooldown);

			setTimeout(() => {
				client.timeout.delete(interaction.member.id);
			}, command.timeout * 1000);
		}
	},
};