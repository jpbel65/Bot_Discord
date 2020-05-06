const Discord = require('discord.js')
const bot = new Discord.Client ()
const Axios = require('axios')
const WebSocket = require('websocket');
const http = require('http');
const express = require('express')
const app = express()
const connected = [];
const PORT = process.env.PORT || 8080
let countReady = 0

bot.on('ready', ()=>{
	console.log('ready');
});


bot.on('message', async function (message) {
    if (`${message}`[0] === '$') {
		console.log((new Date()) +` ${message}`.substr(1));
		let url = `${message}`.substr(1);
		connected.forEach(function (item, index, array) {
			item.sendUTF(url);
		})
    }
});

const server = http.createServer(app);
app.get('/', function (req, res) {
	res.json(PORT);
});
const wsServer = new WebSocket.server({
	httpServer : server
});

wsServer.on('request', function(request) {
	let connection = request.accept(null, request.origin);
	console.log((new Date()) + ' Connection accepted.');
	connected.push(connection);
	console.log(connected.length);
	connection.on('message', function incoming(message) {
		if(message.utf8Data === 'ready' ){
			countReady++
			console.log(`WebSocket message received: ${message.utf8Data} countReady: ${countReady}`);
			if (countReady === connected.length){
				countReady = 0;
				connected.forEach(function (item, index, array) {
					item.sendUTF('lets Go');
				})
				console.log((new Date()) + ' : lets Go ');
			}
		}
	});
	connection.on('close', function(reasonCode, description) {
		console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
		var pos = connected.indexOf(connection)
		connected.splice(pos,1)
		console.log(connected.length)
	});
	connection.timer=setInterval(function timeout() {
		connection.ping();
		},1000);
	/*connection.timer=setInterval(function ready() {
		if(countReady === connected.length){
			countReady = -1;
			connection.sendUTF("lets Go");
			console.log((new Date()) + ' : lets Go ');
		}
	},1000);*/
});

server.listen(PORT, () => {
	console.log(`Server started on ${server.address().address} with port ${server.address().port}:)`);
});

bot.login(process.env.BOT_TOKEN);
