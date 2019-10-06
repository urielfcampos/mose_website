<template>
  <div class="section">
    <div class="box" style="word-wrap:break-word">
      <h1 class="title">{{ selectedEvent.name }}</h1>
      <br />
      <h2 class="subtitle">Sobre</h2>
      <p>{{ selectedEvent.summary }}</p>
      <br />
      <h2 class="subtitle">Local</h2>
      <p>{{ selectedEvent.local }}</p>
      <br />
      <h2 class="subtitle">Data</h2>
      <p>{{ date }}</p>
      <br />
      <h2 class="subtitle">Hora</h2>
      <p>{{ selectedEvent.time }}</p>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedEvent: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    date() {
      const date = new Date(this.selectedEvent.date)
      const dayMonthYear = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
      return dayMonthYear
    }
  }
}
</script>

<style></style>
