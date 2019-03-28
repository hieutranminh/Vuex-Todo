<template>
  <transition name="itemTodo" >
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
  </transition>
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
<style scoped>
  .itemTodo-enter{
  }
  .itemTodo-enter-active{
    transform-origin: 50% 0%;
    animation: slide-in 1s ease-out forwards;
  }
  /*leave*/
  .itemTodo-leave{}
  .itemTodo-leave-active{
    transform-origin: 50% 0%;
    animation: slide-out 1s ease-out forwards;
  }
  /*keyframe*/
  @keyframes slide-in {
    0% {
      transform:scale(1) rotateX(90deg);
      opacity: 0;
    }
    70% {
      transform:scale(0.9) rotateX(0deg);
    }
    100% {
      transform:scale(1) rotateX(0deg);
      opacity: 1;
    }
  }
  @keyframes slide-out {
    0% {
      transform:scale(1) rotateX(0deg);
      opacity: 0;
    }
    50% {
      transform:scale(0.9) rotateX(0deg);
      opacity: 1;
    }
    100% {
      transform:scale(0.9) rotateX(90deg);
      opacity: 0;
    }
  }
</style>
