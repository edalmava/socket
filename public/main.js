var socket = io.connect('http://localhost:8080', {'forceNew': true});

function addMessage(e) {
  var payload = {
    author: document.getElementById('author').value,
	text: document.getElementById('text').value
  };
  
  socket.emit('new-message', payload);
}

function render(data) {
    var html = data.map(function(elem, index) {
	    return(`<div>
		        <strong>${elem.author}</strong>:
				<em>${elem.text}</em>
				</div>`)
	}).join(" ");
	
	document.getElementById('messages').innerHTML= html;
}

socket.on('messages', function(data) {
    render(data);
    console.log(data);
});