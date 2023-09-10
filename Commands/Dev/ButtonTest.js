const { SlashCommandBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType, SelectMenuBuilder, SelectMenuOptionBuilder } = require("discord.js");

module.exports = {
    disable: false,
    hidden: true,
    nsfw: true,
    timeout: 10,
    data: new SlashCommandBuilder()
        .setName("buttonTest")
        .setDescription("Command Description")
        .setDefaultMemberPermissions(PermissionFlagsBits.ADMINISTRATOR),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const button = new ButtonBuilder()
            .setCustomId('button_test')
            .setLabel('Click Me!')
            .setStyle(ButtonStyle.Primary);
        
        const menu = new SelectMenuBuilder()
            .setCustomId('menus_test')
            .setPlaceholder("Choose an option")
            .setMinValues(1)
            .setMaxValues(1)
            .setOptions(new SelectMenuOptionBuilder({
                label: 'Option #1', 
                value: 'https://www.youtube.com/watch?v=Ance5go0e0M'  
            }), new SelectMenuOptionBuilder({
                label: 'Option #2',
                value: 'Value #2'
            }))
        
        const button_components = new ActionRowBuilder().addComponents(button);
        const menu_components = new ActionRowBuilder().addComponents(menu);

        const response = await interaction.reply({
            components: [menu_components, button_components],
            content: "This is a command."
        })
    
        button.setDisabled(true);

        const filter = i => i.customId === 'button_test' && i.user.id === interaction.user.id;
        const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 20000, max: 2 });

        collector.on('collect', async i => {
            // i.update({components: [components]});
            // collector.stop();
            i.reply({content: 'collected', ephemeral: true});
        });

        collector.on('end', collected => {
            // console.log(`Collected ${collected.size} items`);
            interaction.editReply({components: [menu_components, button_components]});
        });
    }
};