const { Client, Collection, GatewayIntentBits: FLAGS, Partials, PermissionsBitField: { Flags: PermissionFlag } } = require('discord.js');

/**
 * Custom client
 * @extends {Client}
*/
class BotClient extends Client {
    constructor() {
		super({
			partials: [Partials.GuildMember, Partials.User, Partials.Message, Partials.Channel, Partials.Reaction, Partials.GuildScheduledEvent],
			intents: [
                FLAGS.Guilds, FLAGS.GuildMembers, FLAGS.GuildBans, FLAGS.GuildEmojisAndStickers,
				FLAGS.GuildMessages, FLAGS.GuildMessageReactions, FLAGS.DirectMessages, FLAGS.GuildVoiceStates, 
                FLAGS.GuildInvites, FLAGS.GuildScheduledEvents, FLAGS.MessageContent],
			presence: {
				status: 'online',
			},
		});

        this.prefix = '!';
        this.logger = require('../utils/Logger');
        this.commands = new Collection();
        this.events = new Collection();
        this.tasks = new Collection();
        this.timeout = new Collection();
        this.buttons = new Collection();
        // this.mysql = null;
    };
}

module.exports = BotClient;