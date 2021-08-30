<template>
  <v-app dark>
    <navbar></navbar>
    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }} San-gi.tech, développer sous nuxt, </span>
    </v-footer>
    <snackbar></snackbar>
    <socket></socket>
  </v-app>
</template>

<script>
import Navbar from "../components/navbar";
export default {
  components: {Navbar},
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-line',
          title: 'chart',
          to: '/chart'
        },
        {
          icon: 'mdi-card-bulleted',
          title: 'orders',
          to: '/orders'
        },
        {
          icon: 'mdi-message-text-clock',
          title: 'logs',
          to: '/logs'
        },
        {
          icon: 'mdi-message-text-clock',
          title: 'test',
          to: '/test'
        },

      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Cryptabot'
    }
  }
}
</script>
