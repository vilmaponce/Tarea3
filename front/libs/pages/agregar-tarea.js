//Obtener elementos

import { addTarea } from "../services/tareas.js";

const _titulo = document.getElementById('titulo');
const _descripcion = document.getElementById('descripcion');
const _tiempo = document.getElementById('tiempo');
const _imagen = document.getElementById('imagen');
const _responsable = document.getElementById('responsable');
const _estado = document.getElementById('estado');

// TOAST
const _successToast = new bootstrap.Toast(document.getElementById('successToast'));
const _errorToast = new bootstrap.Toast(document.getElementById('errorToast'));


//OBTENER EL FORMULARIO

const form = document.getElementById('form');


const enviarFormulario = async(evento) => {
    evento.preventDefault();

    

    //obtener valores 

    const titulo = _titulo.value;
    const descripcion = _descripcion.value;
    const tiempo = _tiempo.value;
    const imagen = _imagen.value;
    const responsable = _responsable.value;
    const estado = _estado.value;

    //VALIDACION-si estos campos estan vacios , genera un error

    if (
        titulo === '' ||
        descripcion === '' ||
        tiempo === '' ||
        imagen === '' ||
        responsable === '' ||
        estado === ''
    ) {
        _errorToast.show();
        return;
    }
    

    const newTarea = await addTarea( {
        titulo,
        descripcion,
        estado,
        imagen,
        responsable,
        tiempo
    });

    _successToast.show();
}

form.addEventListener('submit', enviarFormulario);

