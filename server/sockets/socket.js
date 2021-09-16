const { io } = require('../server');
const {Usuarios} = require('../classes/usuarios');
const {crearMensajes} = require('../utilidades/utilidades')

const usuarios = new Usuarios();


io.on('connection', (client) => {

    client.on('entrarChat', (usuario, callback) => {

        if(!usuario.nombre || !usuario.sala){
            return callback({
                error: true,
                mensaje: 'El nombre y la sala son necesarios'
            })
        }

        client.join(usuario.sala);

       usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);

       client.broadcast.to(usuario.sala).emit('listaPersonas', usuarios.getPersonasPorSala(usuario.sala));

       callback(usuarios.getPersonasPorSala(usuario.sala));
    })

    client.on('crearMensaje', (data)=> {

        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensajes(persona.nombre, data.mensaje);

        client.broadcast.to(persona.sala).emit('crearMensaje ', mensaje);
    })

    //Mensaje privado
    client.on('mensajePrivado', data => { 

        let persona = usuarios.getPersona(client.id);
        
        client.broadcast.to(data.id).emit('mensajePrivado', crearMensajes(persona.nombre, data.mensaje))

    })

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensajes('Administrador', `${personaBorrada.nombre} salió`) )

        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));
    })

});