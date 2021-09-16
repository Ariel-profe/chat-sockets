var socket = io();

var params = new URLSearchParams(window.location.search);
if(!params.has('nombre') || !params.has('sala')){ //chequear
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp){//el callback viene desde el server
        console.log('Usuarios conectados', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar un mensaje
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//Escuchar cambios de usuarios/conexion
socket.on('listaPersonas', function(personas) {

    console.log(personas);

});

//Mensaje privado
socket.on('mensajePrivado', function(mensaje){
    console.log('Mensaje privado:', mensaje);
})