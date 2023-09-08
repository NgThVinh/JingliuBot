const { SlashCommandBuilder, PermissionFlagsBits, AttachmentBuilder, MessageAttachment } = require("discord.js")
const Canvas = require('@napi-rs/canvas');
const { request } = require('undici');

const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		context.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (context.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return context.font;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("View Profile"),
    async execute(interaction, client) {
        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');

        //load background from file
        const background = await Canvas.loadImage('Assets/background.jpg');

        // This uses the canvas dimensions to stretch the image onto the entire canvas
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Set the color of the stroke
        context.strokeStyle = '#0099ff';

        // Draw a rectangle with the dimensions of the entire canvas
        context.strokeRect(0, 0, canvas.width, canvas.height);

        // Slightly smaller text placed above the member's display name
        context.font = '28px sans-serif';
        context.fillStyle = '#ffffff';
        context.fillText('Profile', canvas.width / 2.5, canvas.height / 3.5);

        // Add an exclamation point here and below
        context.font = applyText(canvas, `${interaction.member.displayName}`);
        context.fillStyle = '#ffffff';
        context.fillText(`${interaction.member.displayName}`, canvas.width / 2.5, canvas.height / 1.8);

        // Pick up the pen
        context.beginPath();
        // Start the arc to form a circle
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        // Put the pen down
        context.closePath();
        // Clip off the region you drew on
        context.clip();

        // Using undici to make HTTP requests for better performance
        const { body } = await request(interaction.user.displayAvatarURL({ extension: 'jpg' }));
        const avatar = await Canvas.loadImage(await body.arrayBuffer());

        // Move the image downwards vertically and constrain its height to 200, so that it's square
	    context.drawImage(avatar, 25, 25, 200, 200);

        // Use the helpful Attachment class structure to process the file for you
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: `profile.png` });

        await interaction.reply({ files: [attachment] });
    }
}