<template>
  <div class="container">
    <section class="section">
      <h1 class="title has-text-centered">Eventos</h1>
      <div class="columns">
        <div
          v-if="noRegisteredEvents"
          class="column is-half is-offset-one-quarter"
        >
          <div v-for="(event, index) in listEvents" :key="index">
            <CardComponent :title="event.name">
              <template v-slot:content>
                <p>{{ event.summary }}</p>
              </template>
              <template v-slot:footer>
                <a class="card-footer-item" @click="showEventDetails(event)">
                  Ver Detalhes
                </a>
              </template>
            </CardComponent>
            <br />
          </div>
        </div>
        <div v-else class="column is-half is-offset-one-quarter">
          <p class="is-size-3 has-text-centered">
            Infelizmente não há nenhum evento registrado no momento
          </p>
        </div>
      </div>
    </section>
    <b-modal :active.sync="showEventModal">
      <DetailedEvent :selected-event="selectedEvent" />
    </b-modal>
  </div>
</template>

<script>
import CardComponent from '~/components/CardComponent'
import DetailedEvent from '~/components/DetailedEvent'
export default {
  components: { CardComponent, DetailedEvent },
  layout: 'public',
  data() {
    return {
      listEvents: {},
      selectedEvent: {},
      showEventModal: false,
      noRegisteredEvents: false
    }
  },
  async created() {
    await this.getEvents()
  },
  methods: {
    getEvents() {
      this.$axios.get('/api/events').then((res) => {
        this.listEvents = [...res.data]
        if (res.data.length !== 0) {
          this.noRegisteredEvents = true
        }
      })
    },
    showEventDetails(event) {
      this.selectedEvent = event
      this.showEventModal = true
    }
  }
}
</script>

<style></style>
