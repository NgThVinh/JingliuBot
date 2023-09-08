const { SlashCommandBuilder, PermissionFlagsBits, AttachmentBuilder } = require("discord.js")
const { VoiceConnectionStatus, entersState, joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    hidden: true,
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("Join a voice channel"),
    async execute(interaction, client) {
        const voiceChannel = interaction.member.voice.channel

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        
        if (!voiceChannel) return interaction.reply({ content: "You need to be in a voice channel to use this command!", ephemeral: true })

        try {
            await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
            interaction.reply({ content: "Joined voice channel!", ephemeral: true })
        } catch (error) {
            interaction.reply({ content: "Failed to join voice channel!", ephemeral: true })
            connection.destroy();
            throw error;
        }
    }   
}