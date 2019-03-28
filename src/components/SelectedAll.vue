<template>
  <div class="selectAll">
    <div>
      <input
        v-model="checkAll"
        type="checkbox"> Select all | {{checkAll}}
    </div>
    <button
      @click="removeTodoSelected"
      class="rmselected">remove selected
    </button>
  </div>
</template>
<script>
var mixins = require('../mixins/common.js')
export default {
  mixins: [mixins],
  computed: {
    checkAll: {
      get: function () {
        return this.$store.state.checkAll
      },
      set: function (newValue) {
        this.$store.commit('SET_CHECK_ALL_DATA', newValue)
      }
    }
  },
  methods: {
    removeTodoSelected () {
      let self = this
      this.$store.dispatch('REMOVE_MORE_DATA_TODO').then(function (res) {
        self.MIXIN_Notifycation('Notify', 'error', 'Remove select all success')
        self.$store.dispatch('GET_DATA_TODO').then(function () {
          self.$store.commit('SET_NEXT_PAGE', res)
        })
      })
    }
  }
}
</script>
