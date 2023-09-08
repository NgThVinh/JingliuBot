const { SlashCommandBuilder, PermissionFlagsBits, AttachmentBuilder } = require("discord.js")
const { VoiceConnectionStatus, entersState, joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const googleTTS = require('google-tts-api')

module.exports = {
    hidden: true,
    data: new SlashCommandBuilder()
        .setName("speak")
        .setDescription("Text To Speech")
        .addStringOption(option => option.setName("text")
            .setDescription("Text to speak")
            .setRequired(true)),
    async execute(interaction, client) {
        const text = interaction.options.getString("text")
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

        const url = await googleTTS.getAllAudioUrls(text, {
            lang: 'vi',
            slow: false,
            host: 'https://translate.google.com',
            splitPunct: ',.?',
        })
        const resource = createAudioResource(url[0]['url'])
        const player = createAudioPlayer()
        connection.subscribe(player)
        player.play(resource)
    }
}