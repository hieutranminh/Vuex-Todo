<template>
  <input
    type="text"
    @keypress.exact.prevent.enter="addTodo"
    ref="addInput"
    class="input-text"
    placeholder="What need to be done?">
</template>
<script>
var mixins = require('../mixins/common.js')
export default {
  mixins: [mixins],
  methods: {
    addTodo (event) {
      let self = this
      if (event.target.value) {
        this.$store.dispatch('ADD_DATA_TODO', event.target.value).then(function (res) {
          self.MIXIN_Notifycation('Notify', 'info', 'Add new todo success')
        })
        this.$refs.addInput.value = ''
      }
    }
  }
}
</script>
