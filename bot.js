const Discord = require('discord.js')
const bot = new Discord.Client ()
const Axios = require('axios')
const WebSocketServer = require('websocket').server;
const http = require('http');
const connected = [];

bot.on('ready', ()=>{
	console.log('ready');
});


bot.on('message', async function (message) {
    if (`${message}`[0] === '$') {
		console.log((new Date()) +` ${message}`.substr(1));
		var url = `${message}`.substr(1);
		connected.forEach(function (item, index, array) {
			item.sendUTF(url);
		})
    }
});

const server = http.createServer(function(request, response) {
});
server.listen(8080, function() {
	console.log((new Date()) + ' Server is listening on port 8080');
});
wsServer = new WebSocketServer({
	httpServer: server,
});

wsServer.on('request', function(request) {
	var connection = request.accept(null, request.origin);
	console.log((new Date()) + ' Connection accepted.');
	connected.push(connection);
	console.log(connected.length);
	connection.on('close', function(reasonCode, description) {
		console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
		var pos = connected.indexOf(connection)
		connected.splice(pos,1)
		console.log(connected.length)
	});
	connection.timer=setInterval(function timeout() {
		connection.ping();
		},1000);
});

bot.login(process.env.BOT_TOKEN);
