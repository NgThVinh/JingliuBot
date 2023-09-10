const { bot } = require('./config.json');
const BotClient = require('./structures/Client')
const client = new BotClient();

// Command handler
const { loadCommands } = require("./Handlers/CommandHandler")
loadCommands(client);

// Event handler
const { loadEvents } = require("./Handlers/EventHandler")
loadEvents(client);

// Task handler
const { loadTasks } = require("./Handlers/TaskHandler")
loadTasks(client);

// Component handler
const { loadComponents } = require("./Handlers/ComponentHandler")
loadComponents(client);

process.on('unhandledRejection', error => {
	client.logger.error('Unhandled promise rejection:', error);
});

process.on('uncaughtledException', error => {
	client.logger.error('An Error just occured:', error);
});

client.login(bot.token);
