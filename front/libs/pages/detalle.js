// Instancia elementos ( buscar nuestros elementos)

import { deleteTarea, getOneTarea,getTareasInCategory,updateStateTarea } from "../services/tareas.js";





/* como se hace para utilizar esa ID a traves de una parametro */
//searchParams es un objecto de js para obtener los parametros a traves de la url

const id = new URLSearchParams(window.location.search).get("id") // enviamos esta id a getOneTarea

const productoTitulo = document.getElementById("producto-titulo");
const productoImagen = document.getElementById("producto-imagen");
const productoTiempo = document.getElementById("producto-tiempo");
const productoDescripcion = document.getElementById("producto-descripcion");
const productoResponsable = document.getElementById("producto-responsable");

//boton delete
const btnDelete = document.getElementById("delete-button");

//boton editar
const btnUpdateState = document.getElementById("update-button");

//estado select
const estadoSelect = document.getElementById("estado");

//product relacionados
const productosRelacionadosContainer = document.getElementById("productos-relacionados");

// TOAST

/* const _successToast = document.getElementById('sucessToast')
const _errorToast = document.getElementById('errorToast')  */




/* definir una funcion fillTarea-simular un producto, asincrona, llamando a una api */

const fillTarea = async () => {
    const tarea = await getOneTarea(id);

    //hay que validar que exista esa tarea

    
    if (tarea) {
        productoImagen.src = tarea.imagen;
        productoTitulo.textContent= tarea.titulo;
        productoTiempo.textContent= "Tiempo: "+tarea.tiempo;
        productoDescripcion.textContent= tarea.descripcion;
        productoResponsable.textContent="Responsable:"+ tarea.responsable;
        estadoSelect.value = tarea.estado

        fillTareasRelacionadas(tarea.estado)
    }

}


const fillTareasRelacionadas = async (estado) => {
    //la categoria es el estado
    const tareas = await getTareasInCategory(estado); //se agraga esta funcion en tareas.js
    

        tareas.forEach (tarea => {
            //crear elemento
            productosRelacionadosContainer.innerHTML += `
                <div class="col">
                    <div class="card h-100 ">
                        <img
                            style="min-height:300px;
                            max-height:300px;"
                            class="card-img-top"
                                src="${tarea.imagen}">
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">${tarea.titulo}</h5>
                                <span>${"Tiempo:" + tarea.tiempo}</span><br>
                                <span>${"Responsable:" + tarea.responsable}</span>
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center d-flex gap-1 aling-items-center justify content-center">
                                <a href="/detalle.html?id=${tarea.id}" class="btn btn-outline-secondary mt-auto">Ver más</a>

                            </div>
                        </div>
                    </div>
                </div>

           `;

    })

}

const eliminarTarea = async (evento) => {
    evento.preventDefault()
    const tareaEliminada = await deleteTarea(id)

    if (tareaEliminada) {
        location.href = '/'
    }

}

    
const actualizarTarea = async (evento) => {
    evento.preventDefault()

    const successToast = new bootstrap.Toast(document.getElementById('successToast'));
    const errorToast = new bootstrap.Toast(document.getElementById('errorToast'));

    /* const successToast = bootstrap.Toast.getOrCreateInstance(_successToast)
    const errorToast = bootstrap.Toast.getOrCreateInstance(_errorToast) */ 
    
    const estado= estadoSelect.value
    
    if (estado !== '') {
        const tareaActualizada = await updateStateTarea(id, estado)
           
        successToast.show()
        return
    }
    
    errorToast.show()
    
}
    

//eliminar

btnDelete.addEventListener('click', eliminarTarea)

//actualizar

btnUpdateState.addEventListener('click', actualizarTarea)



fillTarea()


