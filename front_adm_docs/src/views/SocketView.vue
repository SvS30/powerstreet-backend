<template>
    <div class="about">
      <h1>This is an socket test page</h1>
    </div>
    <h1>IP 1: {{ mensajes.ip1 }}</h1>
    <h1>IP 2: {{ mensajes.ip2 }}</h1>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapState(['mensajes'])
    },
    mounted() {
      this.connectSockets();
    },
    beforeUnmount() {
      this.disconnectSockets();
    },
    methods: {
      ...mapActions(['connectSocket', 'disconnectSocket']),
      connectSockets() {
        this.connectSocket({ ip: import.meta.env.VITE_URL_UPLOAD_DOCS });
        this.connectSocket({ ip: import.meta.env.VITE_URL_EDIT_DOCS });
      },
      disconnectSockets() {
        this.disconnectSocket({ ip: import.meta.env.VITE_URL_UPLOAD_DOCS });
        this.disconnectSocket({ ip: import.meta.env.VITE_URL_EDIT_DOCS });
      }
    }
  };
  </script>
  
  <style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>
  