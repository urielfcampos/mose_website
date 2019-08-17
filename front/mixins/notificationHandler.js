export const notificationHandler = {
  methods: {
    openSuccessToast(message) {
      this.$toast.open({ message: message, type: 'is-success' })
    },
    openDangerToast(message) {
      this.$toast.open({ message: message, type: 'is-danger' })
    }
  }
}
