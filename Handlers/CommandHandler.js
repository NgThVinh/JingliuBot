async function loadCommands(client) {
    const { loadFiles } = require("../Functions/fileLoader");
    
    await client.commands.clear();

    // let commandsArray = [];

    const Files = await loadFiles('Commands');
    Files.forEach((file) => {
        const command = require(file);
        if (!command.disable) { 
            client.commands.set(command.data.name, command);
        }

        // commandsArray.push(command.data.toJSON());
        client.logger.debug(`Command '${command.data.name}' loaded.`);
    })
    // client.application.commands.set(commandsArray);
}

module.exports = { loadCommands };