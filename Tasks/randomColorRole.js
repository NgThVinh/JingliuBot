// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

module.exports = {
    disable: true,
    name: 'task_name',
    time: '0 * * *',
    job: async function(client) {
        const guild = client.guilds.cache.first(); // Lấy guild đầu tiên của client
        const role = guild.roles.cache.get(roleId); // Lấy đối tượng Role của role có ID là roleId

        if (!role) {
            console.log(`Role ${roleId} không tồn tại trong guild ${guild.id}`);
            return;
        }

        const newColor = colors[Math.floor(Math.random() * colors.length)]; // Chọn ngẫu nhiên một màu từ danh sách colors
        try {
            await role.setColor(newColor); // Thay đổi màu của role thành màu mới
            console.log(`Đã thay đổi màu của role ${role.name} thành màu ${newColor}`);
        } catch (error) {
            console.error(`Không thể thay đổi màu của role ${role.name}: ${error}`);
        }
    }
};