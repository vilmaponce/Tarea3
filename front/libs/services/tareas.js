/* Todas las funciones y metodos para obtener a traves de la url de nuestro back los datos,peticiones */

export function getAllTareas (){
    return fetch('http://localhost:3000/tasks') //url de nuestro back como parametro
    .then(res=>res.json()) //despues de hacer le fetch la resp la convierte a json
    .then(json=>json) // luego ese json la devuelve a la app
    .catch(error =>error) //si hay error nos devuelve error sino json

}


/* para la tarea especifica de detalle.html .busca en la base de datos un registro por su ID - lo llama desde js */

export function getOneTarea(id){
    return fetch(`http://localhost:3000/tasks/${id}`) // aca el fetch lo obtiene al id con el metodo get
    .then(res=>res.json()) 
    .then(json=>json) 
    .catch(error =>error) 
    
}

//se busca el estado

export function getTareasInCategory(estado){
    return fetch(`http://localhost:3000/tasks?estado=${estado}`) 
    .then(res=>res.json()) 
    .then(json=>json) 
    .catch(error =>error) 
    
}

//Delete tarea

export function deleteTarea(id){
    return fetch(`http://localhost:3000/tasks/${id}`,{ // y aca el fetch con el metodo delete
        method: 'DELETE'
    })    
        
        .then(res=>res.json())
        .then(json=>json) 
        .catch(error =>error) 
}

// Usamos PATCH para actualizar solo un campo

export function updateStateTarea(id, newState){
    return fetch(`http://localhost:3000/tasks/${id}`,{ 
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            estado: newState
        })

    })    
        
    .then(res=>res.json())
    .then(json=>{
        return json
    })
    .catch(error =>error) 
}


// USAMOS POST PARA AGREGAR UN PRODUCTO A LA BASE DE DATOS

export function addTarea({
    titulo,
    descripcion,
    tiempo,
    imagen,
    responsable,
    estado
}){

    return fetch (`http://localhost:3000/tasks/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",

        },

        body: JSON.stringify({
            titulo,
            descripcion,
            tiempo,
            imagen,
            responsable,
            estado
        })
    })
      .then(res=>res.json()) 
      .then(json=>json) 
      .catch(error =>error) 
}