<template>
  <div>
  <v-snackbar
    v-for="(value,index) in this.getSnackbars()"
    :key="value.text+Math.random()"
    v-model="value.show"
    :color="value.color"
    :timeout="-1"
    :style="`bottom: ${index*60}px`"
  >
    {{value.text}}
  </v-snackbar>
  </div>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  methods:{
    ...mapMutations({
      show:'snackbar/show'
    }),
    ...mapActions({
      show:'snackbar/show'
    }),
    ...mapGetters({
      getSnackbars: "snackbar/snacks",
    })
  }
}
</script>
