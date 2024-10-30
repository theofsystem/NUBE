document.addEventListener('DOMContentLoaded',app);

function app(){
    
    mostrarSpinner();
    
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
        console.log(direcSelec)
        abrirVentana(direcSelec);
    }
}

function verPaginaActual(){
    if(document.visibilityState === 'hidden'){
        window.open('index.html');
        window.close();
    }
}

function cerrarVentana(){
    console.log('Accediste a la funcion');
    const contenedorArchivos = document.querySelector('.content-File');
    contenedorArchivos.remove();
}   

function abrirVentana(directorio){
    let indexArchivos = 1;
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

    const listfiles = document.createElement('div');
    listfiles.classList.add('item-File','files');
    contenedorArchivos.appendChild(listfiles);
    const file = document.createElement('div');
    file.classList.add('file');
    file.innerHTML = `
        <div class="img-file"><img src="img/sobresalir.png" alt="Fomato Excel"></div>
        <a href="file/ArchivosExcel/${directorio}/${indexArchivos}.xlsx" title="Click para Descargar" download="Archivo Excel Descargado">Excel de Prueba</a>
    `;

    listfiles.appendChild(file);
    contenedorDirectorios.appendChild(contenedorArchivos);
}