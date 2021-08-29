<template>
  <button @click="test()">Button</button>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  methods:{
    test(){
      this.show({
        text:Math.floor(Math.random()*10000),
        color:`#${Math.floor(Math.random()*16777215).toString(16)}`,
        show:true,
        time:Math.floor(Math.random()*10000)
      })
    },
    ...mapActions({
      show:'snackbar/show'
    }),
  }
}
</script>
