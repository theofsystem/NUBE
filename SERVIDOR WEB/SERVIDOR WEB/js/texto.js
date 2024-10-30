const btnEdit = document.querySelector('#btnEditar');
const textEdit = document.querySelector('#textEdit');
const btnBorrar = document.querySelector('#btnEliminar');

document.addEventListener('DOMContentLoaded',app);

function app(){
    cargarTexto();
    btnEdit.addEventListener('click',editarTexto);
    btnBorrar.addEventListener('click',borrarTexto);
}

function editarTexto(){
    let acceso = prompt('Ingresa el codigo de acceso para modificar: ');
    if(acceso != 123456){
        return
    }
    let edit = prompt('Ingresa el texto a editar');
    localStorage.setItem("TextoEditable",`${edit}`)
    textEdit.textContent = `${edit}`;
}

function borrarTexto(){
    localStorage.clear();
    textEdit.textContent = `Sin anuncios`;
}

function cargarTexto(){
    if(localStorage.getItem("TextoEditable") == null){
        textEdit.textContent = `Sin Anuncios`;
        return
    }
    textEdit.textContent = localStorage.getItem("TextoEditable");
}