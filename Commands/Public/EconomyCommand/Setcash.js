const{ChatInputCommandInteraction,SlashCommandBuilder} =require('discord.js')
const{economy}=require('../../../setup.js')
const{member}=require('../../../setup.js')

module.exports={
    data:new SlashCommandBuilder()
    .setName('setcash')
    .setDescription('Set cash for a user')
    .addUserOption(option=>option.setName('user').setDescription('The user to set cash for').setRequired(true))
    .addIntegerOption(option=>option.setName('amount').setDescription('The amount of cash to set').setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
    **/
    async execute(interaction,client){
        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');
        try
        {
            //check if member exist
            const curMember=await member.getMember(user.id);
            if(!curMember){
                await member.insertMember(user.id);
                await economy.insertMemberCash(user.id);
            }
            //set cash
            await economy.setMemberCash(user.id,amount);
            interaction.reply(`Set ${amount} cash for ${user.username}`);
        }catch(err){
            interaction.reply("An error occured");
            client.logger.error(err);
        }
    }
}