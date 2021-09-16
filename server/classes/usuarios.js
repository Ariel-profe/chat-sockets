


class Usuarios {

    constructor(){
        this.personas = [];
    }

    //Agregar persona al chat
    agregarPersona(id, nombre, sala){
        let persona = {id, nombre, sala} //crear una persona

        this.personas.push(persona); //agregar la persona creada al arreglo de personas

        return this.personas; //mostrar el arreglo con todas las personas
    }

    //Poder obtener una persona en particular por el id 
    getPersona(id){
        // let persona = this.personas.filter(persona => { 
        //     return persona.id === id
        // })
        let persona = this.personas.filter(persona => persona.id === id) [0]; //filter regresa un nuevo arreglo, y el resultado lo pongo en la primera posicion

        return persona;
    }

    //Obtener todas las personas del chat
    getPersonas(){
        return this.personas;
    }


    getPersonasPorSala(sala){

        let personasEnSala = this.personas.filter(persona => persona.sala === sala);

        return personasEnSala;
    }

    //Eliminar a una persona del array de personas, por si se desconecta o abandona el chat
    borrarPersona(id){ //buscar ese id en el array de personas

        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona =>  persona.id != id) //retorna un arreglo del this.personas modificado. sin el id q le hemos pasado
        return personaBorrada;
    }


}



module.exports = {

     Usuarios
}