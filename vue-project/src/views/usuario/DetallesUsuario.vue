<template>
    <div class="container" v-if="this.usrStore.isLogged">
        <div class="menu-container" v-if="this.usrStore.esAdmin">
            <h1>Adminitrador</h1>
            <ul class="menu-list">
                <li><router-link to="/agregar-pelicula">Agregar Película</router-link></li>
                <li><router-link to="/crear-funcion">Crear Función</router-link></li>
                <li><router-link to="/crear-funcion">Obtener Usuarios</router-link></li>
                <li><router-link to="/crear-funcion">Obtener Reservar</router-link></li>
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
</template>
  
  
  
  <script>
  import { usrStore } from '../../components/store/usrStore'
  
  export default {
    data() {
      return {
        usrStore: usrStore()
      }
    },

    methods: {
  
      salir() {
              this.usrStore.logOut()
              this.$router.push("/login");
      },

      ingresarPelicula() {

      }
  
  
    },
    created() {
          document.title = "Detalles"
      },
  
  }
  
  </script>
  
  
  
<style scoped>
    .container {
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
  
</style>