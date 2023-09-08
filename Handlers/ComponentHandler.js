async function loadComponents(client) {
    const { loadFiles } = require("../Functions/fileLoader");

    const Files = await loadFiles('Components');
    Files.forEach((file) => {
        const component = require(file);
        
        switch (component.type) {
            case "button":
                client.buttons.set(component.data.customId, component);
                client.logger.debug(`Button '${component.data.name}' loaded.`);
                break;

            case "selectMenus":
                client.buttons.set(component.data.customId, component);
                client.logger.debug(`Button '${component.data.name}' loaded.`);
                break;

            default:
                break;
        }
    })
}

module.exports = { loadComponents };