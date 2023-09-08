const {ChatInputCommandInteraction, SlashCommandBuilder}= require('discord.js');
const { mem } = require('node-os-utils');
const {economy} = require('../../../setup.js');
const {member} = require('../../../setup.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removecash')
        .setDescription('Remove cash from a user')
        .addUserOption(option => option.setName('user').setDescription('The user to remove cash from').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('The amount of cash to remove').setRequired(true)),
    /**  
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
    **/
    async execute(interaction,client) {
        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');
        try
        {
            //check if member exist
            const curMember=await member.getMember(user.id);
            if(!curMember){
                await member.insertMember(user.id);
                await economy.insertMemberCash(user.id);
                return interaction.reply(`${user.username} cash is 0 and cannot be removed!`);
            }
            //remove cash
            if(await economy.getMemberCash(user.id)<amount){
                return interaction.reply(`${user.username} cash is 0 and cannot be removed!`);
            }
            await economy.removeMemberCash(user.id,amount);
            interaction.reply(`Removed ${amount} cash from ${user.username}`);
        }
        catch(err){
            interaction.reply("An error occured");
            client.logger.error(err);
        }
    }
}
