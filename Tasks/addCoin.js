// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

const { economy } = require('../setup.js');

module.exports = {
    // disable: true,
    name: 'add_coin',
    time: '0 0 * * 1',
    job: function(client) {
        // Get all role
        // Check all member of roles
        // Give coin

        client.logger.info('Added coin for server.');
    }
};