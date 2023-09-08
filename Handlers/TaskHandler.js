async function loadTasks(client) {
    const { loadFiles } = require("../Functions/fileLoader");
    const schedule = require('node-schedule');

    client.tasks.forEach((task) => {task.cancel()});
    await client.tasks.clear();
    
    const Files = await loadFiles('Tasks');
    Files.forEach((file) => {
        const task = require(file);
        
        if (!task.disable) {
        const data = schedule.scheduleJob(
            task.time,
            task.job.bind(null, client));

        client.tasks.set(task.name, data)
        client.logger.debug(`Task ${task.name} loaded.`)
        }
    })
}

module.exports = { loadTasks };