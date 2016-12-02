var socket = io.connect('http://localhost:3000'); // On se connecte au socket du serveur pour avoir les informations en temps réel
var isinit = false;

// Si le socket nous informe qu'il y a une notification qui se nomme UserState, il executera le callback.
socket.on('UserState', function(data) {
    // nous insérons dans la span la valeur envoyée par le socket
    $('.connected-number').text(data);
});
$('form').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});
socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
});

socket.on('init message', function(allmsg) {
    console.log('01 : '+isinit);
    if(allmsg != null && !isinit){
        allmsg.forEach(function (item, index) {
            $('#messages').append($('<li>').text(item));
        });
    }
    isinit = true;
});
