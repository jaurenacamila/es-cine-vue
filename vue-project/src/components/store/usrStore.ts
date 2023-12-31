import { defineStore } from "pinia";
import axios from "axios";

export const usrStore = defineStore('usuariosStore', {
    state: () => ({
        currentUser: null,
        reservasDeUser: null,
        isAdmin: false,
    }),

    actions: {

        async registrarse(nombre, apellido, email, contraseña) {

            //genera una promesa, si el usuarios se regista exitosamente devuelve null
            //en caso contrario un String con el/los mensaje/s de error

            return new Promise(async (resolve) => {

                let mensajeError

                try {
                    const url = 'http://localhost:8080/usuario';
                    const data = {
                        nombre,
                        apellido,
                        email,
                        contraseña,
                    };

                    const response = await axios.post(url, data);

                } catch (error) {

                    let mensajeRaw = error.response.data.message;
                    mensajeError = mensajeRaw.replace(/Validation error: /g, "");

                }

                resolve(mensajeError)
            })

        },

        async logIn(email, contraseña) {

            //genera una promesa, si el usuarios es logedo exitosamente devuelve null,
            //en caso contrario devuelve un String con el mensaje de error

            return new Promise(async (resolve) => {

                let mensajeError

                try {
                    const url = 'http://localhost:8080/usuario/login';
                    const data = {
                        email,
                        contraseña
                    };

                    const response = await axios.post(url, data);
                    this.currentUser = response.data.result
                    console.log(response.data.result)

                    delete this.currentUser.salt;
                    this.currentUser.contraseña = contraseña
                    //piso la contraseña hashed por la contraseña que ingreso el Usuario
                    //ya que si se llego a este punto la validacion fue correcta
                    window.localStorage.setItem("usuario", JSON.stringify(response.data.result));

                    if(this.currentUser.idRol === 1) {
                        console.log('es admin')
                        this.isAdmin = true;
                    }

                    this.cargarReservas()


                } catch (error) {
                    console.log(mensajeError)
                    mensajeError = error.data.result
                   
                }

                resolve(mensajeError)
            })

        },

        //inicia sesion automaticamente
        async cargarDataStorage() {
            // se llama desde el onMounted de la App.vue, toma los datos del user storage y intenta logear automaticamente
            // si la clave y email no fueron cambiadas relogea automaticamente, en caso contrario lanza un alert 
            let item = JSON.parse(String(window.localStorage.getItem("usuario")));
            if (item != null) {
                let relogeado = await this.logIn(item.email, item.contraseña);
                if (relogeado != null) {
                    alert("no se pudo relogear");
                    window.localStorage.removeItem("usuario");
                }
            };
        },

        async cargarReservas() {
            try {
                const { idUsuario } = this.currentUser;
                const url = `http://localhost:8080/usuario/${idUsuario}/reserva`;
                const response = await axios.get(url);
                console.log(response)
                let data = response.data.result;
                data.forEach(reserva => {
                    reserva.Funcion.Horario = reserva.Funcion.Horario.substring(0, 5);
                });
                this.reservasDeUser = data;
            } catch (error) {
                if(error.response.data.message.endsWith("no tiene Reservas")){
                    console.log(error.response.data.message);
                } else{
                    console.error(error.response.data.message);
                }
            };
        },

        logOut() {
            //log out y limpia el localStorage
            this.currentUser = null;
            window.localStorage.removeItem("usuario");
            this.isAdmin =false
        },



    },

    //chequea si el usuario esta loggeado
    getters: {
        isLogged() {
            return this.currentUser != null;
        },
        esAdmin(){
            return this.isAdmin;
        }
    }

})

