<template>
    <div v-if="this.usrStore.isLogged">
        <div v-if="this.usrStore.isAdmin">
            <h1>Perfil Admin</h1>
            <button>Ver todas las reservas</button>
        </div>
        <div v-else>
            <div class="container">
                <h1>Tus reservas</h1>
                <div class="container" v-for="reserva in this.usrStore.reservasDeUser">
                    <h6 class="tituloID">Reserva #{{ reserva.idReserva }}</h6>
                    <h6 class="tituloID">Sala '{{ reserva.Funcion.sala }}'</h6>
                    <h6 class="tituloID">Asiento {{ reserva.asientos }}</h6>
                    <h6 class="tituloID">Horario {{ reserva.Funcion.Horario }}</h6>
                    <h6 class="tituloID">Película id: {{ reserva.Funcion.idPelicula }}</h6>                
                </div>
            </div>
        </div>
    </div>
    <div class="container" v-else>
        <span>No estas logeado</span>
    </div>
</template>
  
  
  
<script>
    import { usrStore } from '../../components/store/usrStore'
  
    export default {

        data() {
            return {
                usrStore: usrStore(),
            }
        },

        methods: {
           
    
        },

        created() {
            document.title = "Reservas"
        },
  
    }
  
  </script>
  
  
  <style scoped>
  .container {
    gap: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 30px auto;
    padding: 20px 80px;
    position: relative;
    color: #fff;
    background-color: #202020;
    overflow: hidden;
    max-width: 100%;
    z-index: 1;
    font-family: "Montserrat", sans-serif;
    max-width: 800px;
  }
  
  .tituloID {
    text-align: right;
    display: flex;
    margin: 0;
  }
  </style>