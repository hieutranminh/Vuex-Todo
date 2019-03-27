<template>
  <div class="footer-todo">
    <p>Category :</p>
    <button
      @click="filterCate('all')"
      v-bind:class="{ active: $store.state.filterCate === 'all' }"
      class="status">All
    </button>
    <button
      @click="filterCate('active')"
      v-bind:class="{ active: $store.state.filterCate === 'active' }"
      class="status">Active
    </button>
    <button
      @click="filterCate('done')"
      v-bind:class="{ active: $store.state.filterCate === 'done' }"
      class="status">Done
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    filterCate (cate) {
      this.$store.commit('SET_FILTER_DATA', cate)
    }
  }
}
</script>
