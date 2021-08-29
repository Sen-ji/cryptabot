<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"

      app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title"/>
      <v-spacer/>
      <auth></auth>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>

    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} San-gi.tech,  under NUXT and the MIT license </span>
    </v-footer>
    <snackbar></snackbar>

  </v-app>
</template>

<script>
import Auth from "../components/auth";
import Snackbar from "../components/snackbar";

export default {
  components: {Snackbar, Auth},
  data() {
    return {

      clipped: false,
      drawer: false,
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
