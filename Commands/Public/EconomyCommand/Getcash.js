const {ChatInputCommandInteraction, SlashCommandBuilder} = require("discord.js");
const {economy} = require('../../../setup.js');
const{member}=require('../../../setup.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getcash")
        .setDescription("Get your cash")
        .addUserOption(option => option.setName('user').setDescription('The user to get cash from').setRequired(false)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction,client) {
        const userOption = interaction.options.getUser('user');
        const userId = userOption ? userOption.id : interaction.user.id;
        economy.getMemberCash(userId).then(async(cash) => {
            if(cash == null) {
                await member.insertMember(userId);
                await economy.insertMemberCash(userId);
                interaction.reply(`<@${userId}> has 0 cash`);
            }
            else {
                interaction.reply(`<@${userId}> has ${cash} cash`);
            }
        
        }).catch((err) => {
            interaction.reply("An error occurred");
            client.logger.error(err);
        });
    }
};
