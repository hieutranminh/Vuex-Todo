<template>
    <div>
      <li v-if="statusEdit" :class="{ done: todoProps.status }">
        <input
          type="checkbox"
          @change="checkTodo"
          :checked="todoProps.status">
        <span>{{ todoProps.name }}</span>
        <button
          @click="editTodo"
          class="edit">Edit
        </button>
        <button
          @click="deleteTodo"
          class="delete">Delete
        </button>
        <div class="clear"></div>
      </li>
      <!--INPUT EDIT-->
      <li v-if="!statusEdit">
        <input
          type="text"
          @keypress.enter="saveTodo"
          v-model="inputSave"
          v-bind:style="{ width: 70 + '%' }"/>
        <button
          @click="saveTodo"
          class="save">Save
        </button>
      </li>
    </div>
</template>

<script>
var mixins = require('../mixins/common.js')
export default {
  mixins: [mixins],
  data () {
    return {
      statusEdit: true,
      inputSave: ''
    }
  },
  props: ['todoProps'],
  methods: {
    editTodo () {
      this.statusEdit = false
      this.inputSave = this.todoProps.name
    },
    saveTodo () {
      this.statusEdit = true
      let self = this
      let newEdit = {...this.todoProps}
      newEdit.name = this.inputSave
      this.$store.dispatch('EDIT_DATA_TODO', newEdit).then(function () {
        self.MIXIN_Notifycation('Notify', 'success', 'Updated todo success')
      })
    },
    deleteTodo () {
      let self = this
      this.$store.dispatch('DELETE_DATA_TODO', this.todoProps.id).then(function () {
        self.MIXIN_Notifycation('Notify', 'error', 'Deleted todo')
      })
    },
    checkTodo () {
      this.$store.commit('SET_CHECK_DATA', this.todoProps.id)
    }
  }
}
</script>
