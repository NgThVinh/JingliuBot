const { glob } = require("glob");
const { promisify } = require("util");
const proGlob = promisify(glob);

async function loadFiles(dirname) {
    const Files = await proGlob(`${process.cwd().replace(/\\/g, "/")}/${dirname}/**/*.js`, { "ignore": ['**/*.example.js'] });
    Files.forEach((file) => delete require.cache[require.resolve(file)]);
    return Files;
}

module.exports = { loadFiles }