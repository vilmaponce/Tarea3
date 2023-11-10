

//Instancia nuestros elementos html

import { getAllTareas } from "../services/tareas.js";

const contenedor_porHacer = document.getElementById("contenedor-porHacer");
const contenedor_enProduccions = document.getElementById("contenedor-enProduccion");
const contenedor_porTestear = document.getElementById("contenedor-porTestear");
const contenedor_completada = document.getElementById("contenedor-completada");


const fillTareas = async () => {
    // fillTareas-Buscar las tareas 
    const tareas = await getAllTareas() // await espere a que se ejecute la peticion getAllTareas

    tareas.forEach(tarea => {  //por cada tarea nos devuelve una tarea recorriendo el array unoxuno
        const estado = tarea.estado
        let container;

        switch (estado) {
            case "PORHACER":
                container = contenedor_porHacer;  // apunta al contenedor por hacer
                break;
            case "ENPRODUCCION":
                container = contenedor_enProduccions;
                break;
            case "PORTESTEAR":
                container = contenedor_porTestear;
                break;
            case "COMPLETADA":
                container = contenedor_completada;
                break;
            default:

                break;

        }
        //le decimos al container que incluya un html por cada interacion sin modificar su interior

        container.innerHTML += `
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

        `
    });
}



fillTareas()