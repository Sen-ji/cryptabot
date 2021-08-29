export const state = () => ({
  snackbars: []
  /*snackbar:{
    text:"aaa",
    show:true,
    color: 'success'
  }*/
})

export const mutations = {
  show(state, snackbar) {
    state.snackbars.push(snackbar)
  },
  close(state,snackbar) {
    state.snackbars.splice(state.snackbars.indexOf(snackbar),1)
  }
}

export const actions = {
  show(context, snackbar) {
    console.log("test")
    context.commit('show', snackbar)
    setTimeout(() => {
      context.commit('close',snackbar)
    }, snackbar.time)
  }
}
export const getters = {
  snacks: state => {
    return state.snackbars
  },
}
