const Discord = require('discord.js')
const bot = new Discord.Client ()
const Axios = require('axios')
var test = true;
var user = 'JohnAng3l';
var user2 = 'JP';
var user3 = 'Mrconker';

bot.on('ready', ()=>{
	console.log('ready');
});


bot.on('message', async function (message) {
    if (message.author.username == user && test == true){
    	message.delete();

    }
    if (message.content === '!Block' && message.author.username == user3) {
    	message.delete();
        test = !test;
        if(test == false)message.author.sendMessage("Cessé le feu! "+user+" peux de nouveau écrire.");
    	if(test == true)message.author.sendMessage("Que la purge de "+user+" commence.");
    
    }
    if (`${message}`[0] === '$') {
		const res = await fun(`${message}`[1]);
		message.channel.sendMessage(res);
		const res2 = await fun2(`${message}`[1]);
		message.channel.sendMessage(res2);
		const res3 = await fun3(`${message}`[1]);
		message.channel.sendMessage(res3);
    }
});


bot.login(process.env.BOT_TOKEN);

const server = 'https://api.dailymotion.com/videos?fields=title,url,&search=';
const hd = '+VOSTFR+%5BHD%5D';
const n = '+VOSTFR&limit=10';
function SAO(ep) {
  const res = Axios.get(server+'Sword+Art+Online+Alicization+(Saison+3)+Episode+'+ep+hd,{})
    .then(response => response.data.list)
    .catch(error => error);
    return res;
}

function GS(ep) {
  const res = Axios.get(server+'Goblin+Slayer+Episode+'+ep+hd,{})
    .then(response => response.data.list)
    .catch(error => error);
  return res;
}

function Slime(ep) {
  const res = Axios.get(server+'Tensei+Shitara+Slime+Datta+Ken+Episode+'+ep+n,{})
    .then(response => response.data.list)
    .catch(error => error);
  return res;
}

function code(titre,url,nb) {
	for(var i = 0;i<titre.length;i++) {
		if(titre[i].indexOf('VOSTFR') !== -1) {
			if(titre[i].indexOf(nb) !== -1) return url[i];
		}
	}
	return 'not Found';
}	

async function fun(nb) {
	const titre = [];
	const url = [];
	const text = await SAO(nb);
	for(var i = 0;i<text.length;i++) {
		titre.push(text[i].title);
		url.push(text[i].url);
	}
	const res = code(titre,url,nb);
	return 'SAO: '+res;
}

async function fun2(nb) {
	const titre = [];
	const url = [];
	const text = await GS(nb);
	for(var i = 0;i<text.length;i++) {
		titre.push(text[i].title);
		url.push(text[i].url);
	}
	const res = code(titre,url,nb);
	return 'Goblin Slayer: '+res;
}

async function fun3(nb) {
	const titre = [];
	const url = [];
	const text = await Slime(nb);
	for(var i = 0;i<text.length;i++) {
		titre.push(text[i].title);
		url.push(text[i].url);
	}
	console.log(titre);
	const res = code(titre,url,nb);
	return 'Slime: '+res;
}