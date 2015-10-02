var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/hello', function(req, res){
    res.status(200).send("Hola Mundo!");
});

var messages = [{
    author: "Edwin",
	text: "Hola! que tal?"
}, {
	author: "Alberto",
	text: "Muy bien! y tu?"
}, {
	author: "Paco",
	text: "Genial!"
}];
	
io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
	socket.emit('messages', messages);
	
	socket.on('new-message', function(data) {
	    messages.push(data);
		io.sockets.emit('messages', messages);
	});
});

server.listen(8080, function() {
    console.log('Servidor corriendo en http://localhost:8080');
});