const frm = document.getElementById('form');
const usuario = document.querySelector('#usuario');
const labeluser = document.querySelector('#labeluser');
const btnForm = document.querySelector('#btn-login');
const contentSpinner = document.querySelector('#content-spinner');
const mensajeAlerta = document.querySelector('.content-item p')

addEventListener('DOMContentLoaded',()=>{
    
    btnForm.style.display = 'none';
    frm.addEventListener('submit',form);
    usuario.addEventListener('input',validarUsuario);
});

function form(e){
    e.preventDefault();
    validarDatos();
    frm.reset();
}

function validarUsuario(e){
    let inputUsuario = e.target.value;

    if(inputUsuario.includes("@") != true  || inputUsuario.includes(".mx") != true){
        usuario.style.border = "2px solid #FF0000";
        labeluser.textContent = 'Correo electronico invalido';
        labeluser.style.color = 'red';
        btnForm.style.display = 'none';
        return
    }
    usuario.style.border = "2px solid #008f39";
    labeluser.textContent = 'Usuario Correcto';
    labeluser.style.color = 'green';
    btnForm.style.display = 'block';
}

function validarDatos(){
    const pass = document.querySelector('#password').value;
    const user = document.querySelector('#usuario').value;
    
    obtenerDatos(user,pass);
};

function mostrarSpinner(){
    const spinner = document.createElement('div');
    spinner.classList.add('sk-cube-grid');

    spinner.innerHTML = `
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
    `;

    contentSpinner.appendChild(spinner);

    setTimeout(()=>{
        spinner.remove();
        abrirServidor();
    },3000);
}

function abrirServidor(){
    window.close('login.html');
    window.open('directorios.html');
}

function obtenerDatos(usuario,contrasenia){
    const url = 'data/empleados.json';
    fetch(url)
        .then( respueta => respueta.json())
        .then( resultado => validarResultados(resultado,usuario,contrasenia))
}

function validarResultados(empleados, usuario, contrasenia){
    let autentificacion = false;

    empleados.forEach(empleado => {
        const { id, nombre, correo, password, permisos, empresa} = empleado;    

        if(correo == usuario && password == contrasenia ){
            autentificacion = true;
            console.log(`Usuario ${correo} Contrasenia ${password}`);
            console.log(`Usuario ${usuario} Contrasenia ${contrasenia}`);
            mensajeAlerta.textContent = 'Ingresando al servidor privado';
            mensajeAlerta.style.color = 'green';
            mostrarSpinner();
        }

    });
    
    if(autentificacion == false){
        const labeluser = document.querySelector('#labeluser');
        const usuario = document.querySelector('#usuario');
        labeluser.style.color = "red"
        labeluser.textContent = "Credenciales incorrectas"
        usuario.style.border = "2px solid red";
        mensajeAlerta.textContent = 'Usuario o contraseña incorrectos';
        mensajeAlerta.style.color = 'red';
    }
}