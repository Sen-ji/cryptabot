<template>
  <div>
    <button @click="counteradd(1)">bb {{this.getCounter()}} </button>
    <v-row>
      <v-text-field
        label="What needs to be done?"
        @keyup.enter="addTodo"
        clearable></v-text-field>

    </v-row>

    <ul>
      <li v-for="todo in this.getTodos()" :key="todo.id">
        <input :checked="todo.done" @change="toggle(todo)" type="checkbox" :id="todo.id">
        <label :class="{ done: todo.done }" :for="todo.id">{{ todo.text }}</label>
        <button @click="removeTodo(todo)">remove</button>
      </li>
    </ul>
    <v-snackbar
      v-model="this.getSnack()"
      :timeout="-1"
      color="success">{{this.getSnackText()}}
      <v-btn
        text
        @click="close()"
      >
        Close
      </v-btn></v-snackbar>
  </div>
</template>

<script>
import {mapMutations,mapActions,mapGetters} from 'vuex'


export default {
  methods: {
    addTodo(event) {
      this.show(event.target.value)
      this.add(event.target.value)
      event.target.value = ''
    },
    ...mapMutations({
      close: 'todos/close',
      add: 'todos/add',
      counteradd:'todos/counteradd',
      removeTodo:'todos/remove',
      toggle: 'todos/toggle'
    }),
    ...mapActions({
      show: 'todos/showAction'
    }),
    ...mapGetters({
      getSnackText: 'todos/snackText',
      getSnack: 'todos/snack',
      getTodos: 'todos/todos',
      getCounter : 'todos/counter'
    })
  }
}
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

ul {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] {
  margin: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.done {
  text-decoration: line-through;
}
</style>
