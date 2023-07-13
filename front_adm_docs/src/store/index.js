import { createStore } from 'vuex';
import io from 'socket.io-client';

const store = createStore({
    state: {
        sockets: {
            ip1: null,
            ip2: null
        },
        mensajes: {
            ip1: '',
            ip2: ''
        }
    },
    mutations: {
        SET_SOCKET(state, { ip, socket }) {
            state.sockets[ip] = socket;
        },
        SET_MENSAJE(state, { ip, mensaje }) {
            state.mensajes[ip] = mensaje;
        }
    },
    actions: {
        connectSocket({ commit }, { ip }) {
            const socket = io(ip);
            console.log(`Socket connected: ${socket.id}`)
            // Escuchar el evento 'mensaje' enviado desde el servidor
            socket.on('mensaje', (data) => {
                console.log(`data received from mensaje channel: ${data}`)
                commit('SET_MENSAJE', { ip, mensaje: data });
            });

            commit('SET_SOCKET', { ip, socket });
        },
        disconnectSocket({ state, commit }, { ip }) {
            const socket = state.sockets[ip];

            if (socket) {
                socket.disconnect();
                commit('SET_SOCKET', { ip, socket: null });
                commit('SET_MENSAJE', { ip, mensaje: '' });
            }
        }
    }
});

export default store;