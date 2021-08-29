export const state = () => ({
  list: [],
  counter: 0,
  snack: true,
  snacktext: "text",
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false
    })
  },
  counteradd(state, number) {
    state.counter += number
  },
  remove(state, todo) {
    console.log(todo)
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(todo) {
    todo.done = !todo.done
  },
  close(state) {
    state.snack = false
  },
  show(state, text) {
    state.snack = true
    state.snacktext = text
  }
}
export const actions = {
  showAction(context, text) {
    context.commit('show', text)
    setTimeout(() => {
      context.commit('close')
    }, 1000)
  }
}

export const getters = {
  snackText: state => {
    return state.snacktext
  },
  snack: state => {
    return state.snack
  },
  todos: state => {
    return state.list
  },
  counter: state => {
    return state.counter
  }
}
