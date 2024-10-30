document.addEventListener('DOMContentLoaded',app);

function app(){
    eliminarMensaje();
    mostrarSpinner();
    obtenerDatos();

    const btnFile = document.querySelector('.item-direct-grid');

    btnFile.addEventListener('click',btnValue);

    document.addEventListener('visibilitychange', verPaginaActual);

}

function mostrarSpinner(){
    const contentSpinner = document.querySelector('#content-spinner');

    contentSpinner.classList.add('sk-cube-grid');
    contentSpinner.innerHTML = `
    <div class="sk-cube sk-cube1"></div>
    <div class="sk-cube sk-cube2"></div>
    <div class="sk-cube sk-cube3"></div>
    <div class="sk-cube sk-cube4"></div>
    <div class="sk-cube sk-cube5"></div>
    <div class="sk-cube sk-cube6"></div>
    <div class="sk-cube sk-cube7"></div>
    <div class="sk-cube sk-cube8"></div>
    <div class="sk-cube sk-cube9"></div>
    <div>Consultando Servidor</div>
    `;

    setTimeout(()=>{
        contentSpinner.remove();
    },3000);
}

function btnValue(e){
    e.preventDefault();
    if(e.target.classList.contains('btn-directorio')){
        let direcSelec = e.target.value;
        abrirVentana(direcSelec);
    }
}

function verPaginaActual(){
    if(document.visibilityState === 'hidden'){
        //window.open('index.html');  // Cambiar a direccion IP del sitio web
        //window.close();
    }
}

function cerrarVentana(){
    const contenedorArchivos = document.querySelector('.content-File');
    contenedorArchivos.remove();
}

function abrirVentana(directorio){
    let indexArchivos = 1;

    // Inyectar Condicional
    const contenedorDirectorios = document.querySelector('.content-directorios');
    const contenedorArchivos = document.createElement('div');
    contenedorArchivos.classList.add('content-File');
    contenedorArchivos.innerHTML = `
        <div class="item-File">
                    <div class="img-file"><img src="img/carpeta.png" alt="Error 404"></div>
                    <div class="title-file"><h2>Directorio de ${directorio}</h2></div>
                    <div class="btnX"><img src="img/boton-x.png" onclick="cerrarVentana()" alt="Salir del Directorio" title="Salir del Directorio"></div>
        </div>
    `;
    // listfiles es el contenedor de los archivos a en listar

    // file es el archivo por individual
    const listfiles = document.createElement('div');
    listfiles.classList.add('item-File','files');
    contenedorArchivos.appendChild(listfiles);

    // Obtener Datos de los archivos
    // console.log(directorio);
    obtenerArchivos(directorio);

    contenedorDirectorios.appendChild(contenedorArchivos);

    // Elevar el scrolling
    location.href = "#inicio"
}

function obtenerDatos(){
    const url = `data/empleados.json`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => validarUsuario(resultado))
}

function validarUsuario(empleados){
    const titleUsuario = document.querySelector('.item-text');

    empleados.forEach(empleado => {
         const { id, nombre, correo, password, permisos, empresa } = empleado;

         if (localStorage.getItem(`${id}`) == nombre){

             titleUsuario.textContent = `Accediste al Servidor Privado | ${nombre}`;
             generarCarpetas(permisos);
             localStorage.removeItem(`${id}`);
         }
         localStorage.removeItem(`${id}`);
     });
}

function generarCarpetas(carpetas){
    const contenedorCarpetas = document.querySelector('.item-direct-grid');
    carpetas.forEach(carpeta => {
        const {Ncarpeta} = carpeta
        
           // Crear div
           const carpetaUsuario = document.createElement('div');
           carpetaUsuario.innerHTML = ` 
                      <div class="content-img"><img src="img/carpeta-abierta(1).png" alt="Directorio"></div>
                      <div>${Ncarpeta.toUpperCase()}</div>
                       <div><button class="btn-directorio" href="#inicio" value="${Ncarpeta}">Acceder</button></div>
           `;
           // Asignar clase
           carpetaUsuario.classList.add('directorio');

           // Agregar al padre
           contenedorCarpetas.appendChild(carpetaUsuario)
    });
}

function eliminarMensaje(){
    const mensajeAlert = document.querySelector('.barra-mensaje');

    setTimeout(()=>{
        mensajeAlert.remove();
    },5500);
}

function obtenerArchivos(ubicacion){
    const urlArchivos = `data/${ubicacion}.json`;
    console.log(urlArchivos);
    fetch(urlArchivos)
        .then(respuesta => respuesta.json())
        .then(resultado => generarArchivos(resultado));
}

function generarArchivos(archivos){
    console.log(archivos);
    const listfiles = document.querySelector('.files');

    // ForEach() iterando sobre cada archivo
    archivos.forEach(archivo => {
        const { nombre, ubicacion, imagen } = archivo;

        console.log(`Nombre del Archivo: ${nombre}`);
        console.log(`Ubicacion del Archivo: ${ubicacion}`);
        console.log(`Imagen del Archivo: ${imagen}`);

        const file = document.createElement('div');
        file.classList.add('file');
        file.innerHTML = `
            <div class="img-file"><img src="${imagen}" alt="${nombre}"></div>
            <a href="${ubicacion}" target="_blank" title="Click para Descargar" download="${nombre}">${nombre}</a>
        `;
    
    listfiles.appendChild(file);
    });
}

// Aqui se inyectara el nuevo codigo & funcionalidades 

// Ahora se trabajara con Google Workspace.
// Planes de trabajo con google sheets.
// Documentos de trabajo con google docs.
// Se usara el sitio web para ligar a las ligas de trabajo.

