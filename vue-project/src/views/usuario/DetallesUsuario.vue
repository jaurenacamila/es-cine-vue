<template>
    <div class="container" v-if="this.usrStore.isLogged">
        <div class="menu-container" v-if="this.usrStore.esAdmin">
            <h1>Adminitrador</h1>
            <ul class="menu-list">
                <div class="menu-container">
                    <button class="boton-agregar" @click="this.mostrarAgregar()">Agregar Película</button>
                </div>
                <div class="menu-container">
                    <button class="boton-agregar" @click="this.mostrarCrear()">Crear Función</button>
                </div>
                <div class="menu-container">
                    <button class="boton-agregar" @click="this.mostrarUsuarios()">Obtener Usuarios</button>
                </div>
                <li><router-link to="/crear-funcion">Obtener Reservas</router-link></li>
                <button type="submit" class="salir" @click="salir">Cerrar Sesion</button>
            </ul>
        </div>
        <div class="container" v-else>
            <h1>Detalles de Usuario</h1>
            <span>Nombre: {{ this.usrStore.currentUser.nombre }} </span>
            <span>Apellido: {{ this.usrStore.currentUser.apellido }} </span>
            <span>Email: {{ this.usrStore.currentUser.email }} </span>
            <button type="submit" class="salir" @click="salir">Cerrar Sesion</button>
        </div>
    </div>
    <div class="container-adm" v-show="mostrarAgregarPeli">
        <div class="menu-container">
            <h2>Agregar Pelicula</h2>
            <hr>
            <div class="formulario_lg">
                <div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="inputBox">
                                <span>Ingresa el ID</span>
                                <input type="text" required v-model="this.idPeli">
                                <button class="boton-agregar" type="submit" @click="this.agregarPelicula()">Agregar Pelicula</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>   
    <div class="container-adm" v-show="mostrarCrearFuncion">
        <div class="menu-container">
            <h2>Crear Funcion</h2>
            <hr>
            <div class="formulario_lg">
                <div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="inputBox">
                                <span>Ingresa el ID de la pelicula</span>
                                <input type="text" required v-model="this.idPeli">
                            </div>
                            <div class="inputBox">
                                <span>Ingresa la sala</span>
                                <input type="text" required v-model="this.sala">
                            </div>
                            <div class="inputBox">
                                <span>Ingresa el horario</span>
                                <input type="text" required v-model="this.horario">
                            </div>
                            <button class="boton-agregar" type="submit" @click="this.agregarFuncion()">Crear Funcion</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-adm" v-show="mostrarGetUsuarios">
        <div class="menu-container">
            <h2>Usuarios</h2>
            <button @click="this.getUsuarios()">Obtener Usuarios</button>
            <ul>
                <li v-for="usuario in usuarios" :key="usuario.id">
                    Nombre: {{ usuario.nombre }} - 
                    Apellido: {{ usuario.apellido }} - 
                    Email: {{ usuario.email }}
                </li>
            </ul>
            <hr>
        </div>
    </div>
</template>
  
  
  
  <script>
  import { usrStore } from '../../components/store/usrStore'
  import axios from 'axios'
  
  export default {
    data() {
      return {
        usrStore: usrStore(),
        idPeli: "",
        sala: "",
        horario: "",
        usuarios: [],
        mostrarAgregarPeli: false,
        mostrarCrearFuncion: false,
        mostrarGetUsuarios: false

      }
    },

    methods: {
  
        salir() {
                this.usrStore.logOut()
                this.$router.push("/login");
        },

        agregarPelicula() {
            const movieId = this.idPeli;
            axios.post('http://localhost:8080/pelicula/', { id: movieId })
            .then(response => {
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=6311677ef041038470aae345cd71bb78&language=es`)
                .then(response => {
                    // Obtener el título de la película de la respuesta
                    const tituloPelicula = response.data.title;
                    // Mostrar el título en un alert
                    alert(`Se agregó: ${tituloPelicula}`);
                    this.idPeli = "";
                })
                .catch(error => {
                    alert("Error con los datos de la película")
                    console.error("Error al obtener los datos de la película:", error);
                    this.idPeli = "";
                });
            })
            .catch(error => {
                alert("Error al agregar la película")
                console.error("Error al agregar la película:", error);
                this.idPeli = "";
            });
        },

        agregarFuncion() {
            const idPelicula = this.idPeli;
            const sala = this.sala;
            const horario = this.horario;
            const data = {
                sala,
                horario,
                idPelicula
            }
            axios.post('http://localhost:8080/funcion/', data)
            .then(response => {
                alert("Se agregó la función");
                    this.idPeli = "";
                    this.sala = "";
                    this.horario = ""
                
            })
            .catch(error => {
                    alert("Error al crear la función")
                    console.error("Error al crear la función", error);
                    this.idPeli = "";
                    this.sala = "";
                    this.horario = ""
            });   
        },

        getUsuarios() {
            axios.get('http://localhost:8080/usuario/')
            .then(response => {
                const usuarios = response.data.result;
                console.log(usuarios)
                const usuariosRol2 = usuarios.filter(usuario => usuario.Rol.rol === 'user');
                console.log(usuariosRol2);
                this.usuarios = usuariosRol2;
            })
            .catch(error => {
                console.error("Error al obtener los usuarios:", error);
                console.log("no hay ususarios")
            });
        },

        mostrarAgregar() {
            if(this.mostrarAgregarPeli) {
                this.mostrarAgregarPeli = false
            }else {
                this.mostrarAgregarPeli = true
            }
        },
        mostrarCrear() {
            if(this.mostrarCrearFuncion) {
                this.mostrarCrearFuncion = false
            }else {
                this.mostrarCrearFuncion = true
            }
        },
        mostrarUsuarios() {
            if(this.mostrarGetUsuarios) {
                this.mostrarGetUsuarios = false
            }else {
                this.mostrarGetUsuarios = true
            }
        }
    },



    created() {
          document.title = "Detalles"
    },
  
  }
  
</script>
  
  
  
<style scoped>
    .container, .container-adm {
        gap: 20px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
        padding: 20px 80px;
        position: relative;
        color: #fff;
        background-color: #202020;
        overflow: hidden;
        max-width: 100%;
        z-index: 1;
        font-family: "Montserrat", sans-serif;
    }
    .container-adm {
        margin-top: 50px;
    }
    .container button {
        width: 100%;
        padding: 10px;
        color: #fff;
        border: none;
        border-radius: 4px;
        margin-bottom: 15px;
        cursor: pointer;
    }
    .salir {
        background-color: #af4c4c;
    }
    .salir:hover {
        background-color: #b83939;
    }
    .boton-admin {
        background-color: #17a2b8;
    }
    .boton-admin:hover{
        background-color: #0f5d69;
    }
    .menu-container {
        border-radius: 5px;
    }
    .menu-list {
        list-style-type: none;
        padding: 0;
    }
    .menu-list li {
        margin-bottom: 10px;
    }

    .menu-list li a {
        color: #fff;
        text-decoration: none;
    }

    .menu-list li a:hover {
        color: #202020;
        background-color: lightgray;
        border-radius: 5px;
        padding: 5px;
    }

    .boton-agregar {
        background-color: #17a2b8;
        color: #fff;
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        cursor: pointer;
    }

    input {
        margin: 20px 0;
    }
    .boton-agregar:hover{
        background-color: #0f5d69;
    }
    .input-box {
        margin-top: 10px;
    }
  
</style>