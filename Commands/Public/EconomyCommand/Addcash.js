const {ChatInputCommandInteraction, SlashCommandBuilder} = require("discord.js");
const {economy} = require('../../../setup.js');
const {member}= require('../../../setup.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addcash")
        .setDescription("Add cash to a user")
        .addUserOption(option => option.setName('user').setDescription('The user to add cash to').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('The amount of cash to add').setRequired(true)),
    /**
     *  @param {ChatInputCommandInteraction} interaction
     * @param {Client} client 
     */
    async execute(interaction,client) {
        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');
        try{
            //check if member is exist
            const curMember= await member.getMember(user.id);
            if(!curMember){
                await member.insertMember(user.id);
                await economy.insertMemberCash(user.id);
            }
            //add cash
            await economy.addMemberCash(user.id,amount);
            interaction.reply(`Added ${amount} cash to ${user.username}`);
        }catch(err){
            interaction.reply("An error occured");
            client.logger.error(err);
        }
    }
};
