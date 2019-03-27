module.exports = {
  namespaced: true,
  methods: {
    MIXIN_Notifycation (group, type, title) {
      this.$notify({
        group: group,
        type: type,
        title: title,
        duration: 1000,
        speed: 1000
      })
    }
  }
}
