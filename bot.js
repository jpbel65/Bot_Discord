const Discord = require('discord.js')
const bot = new Discord.Client ()
var test = true;
var user = 'JohnAng3l';
var user2 = 'JP';
var user3 = 'Mrconker';


bot.on('ready', ()=>{
	console.log('ready');
});


bot.on('message', function (message) {
    if (message.author.username == user && test == true){
    	message.delete();

    }
    if (message.content === '!Block' && message.author.username == user3) {
    	message.delete();
        test = !test;
        if(test == false)message.author.sendMessage("Cessé le feu! "+user+" peux de nouveau écrire.");
    	if(test == true)message.author.sendMessage("Que la purge de "+user+" commence.");
    
    }
});


bot.login(process.env.BOT_TOKEN);
