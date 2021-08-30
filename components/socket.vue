<template>
</template>
<script>
import {mapActions} from "vuex";

export default {
  mounted() {
    console.log("oui")
    this.socket = this.$nuxtSocket({
      name:"main"
    })
    /* Listen for events: */
    this.socket
      .on('chat message', (msg) => {
        this.show({
          text:msg,
          color:"blue",
          show:true,
          time:Math.floor(Math.random()*10000)
        })
      })
  },
  methods: {
    method1() {
      /* Emit events */
      this.socket.emit('method1', {
        hello: 'world'
      }, (resp) => {
        /* Handle response, if any */
      })
    },
    ...mapActions({
      show:'snackbar/show'
    }),
  }
}
</script>
