<template>
  <div class="section">
    <div class="box" style="word-wrap:break-word">
      <h1 class="title">{{ selectedNews.title }}</h1>
      <br />
      <p>{{ selectedNews.bodyText }}</p>
      <br />
      <footer>{{ footer }}</footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedNews: {
      type: Object,
      default: function() {
        return {
          title: '',
          bodyText: '',
          data: '',
          fullName: ''
        }
      }
    }
  },
  computed: {
    footer() {
      const date = new Date(this.selectedNews.data)
      const data = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
      return `${data} por ${this.selectedNews.fullName}`
    }
  }
}
</script>

<style></style>
