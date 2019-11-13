<template>
  <section class="container">
    <b-table
      :data="events"
      :columns="columns"
      detailed
      detail-key="id"
      paginated
      per-page="10"
      aria-next-label="Próxima página"
      aria-previous-label="Página anterior"
      aria-page-label="Página"
      aria-current-label="Página Atual"
    >
      <template slot="detail" slot-scope="props">
        <section class="container">
          <b-button class="is-info" @click="editEvents(props.row)">
            Editar
          </b-button>
          <b-button class="is-info" @click="deleteEvents(props.row.id)">
            Deletar
          </b-button>
        </section>
      </template>
    </b-table>
    <b-modal :active.sync="editEventsActivate">
      <div class="container box">
        <b-field label="Nome do evento.">
          <b-input v-model="selectedEvent.name" required></b-input>
        </b-field>
        <b-field label="Resumo">
          <b-input
            v-model="selectedEvent.summary"
            type="textarea"
            maxlenght="200"
            required
          ></b-input>
        </b-field>
        <b-field label="Local do evento.">
          <b-input v-model="selectedEvent.local" required></b-input>
        </b-field>
        <b-field label="Horário">
          <b-timepicker
            v-model="selectedEvent.time"
            icon="clock"
            hour-format="24"
          >
          </b-timepicker>
        </b-field>

        <br />
        <b-button
          type="submit"
          class="btn is-info"
          @click="updateEvents(selectedEvents.id)"
        >
          Editar
        </b-button>
      </div>
    </b-modal>
  </section>
</template>

<script>
import { errorHandler } from '~/front/mixins/errorHandler'
import { notificationHandler } from '~/front/mixins/notificationHandler'
export default {
  mixins: [errorHandler, notificationHandler],
  data() {
    return {
      events: [],
      columns: [
        { field: 'name', label: 'Nome do Evento' },
        { field: 'local', label: 'Local' },
        { field: 'fullName', label: 'Autor' },
        { field: 'date', label: 'Data' }
      ],
      editEventActivate: false,
      selectedEvent: {}
    }
  },
  async created() {
    await this.getEvents()
  },
  methods: {
    getEvents() {
      this.$axios.get('/api/events').then((res) => {
        this.events = [...res.data]
        this.formatDate()
      })
    },
    editEvents(singleEvents) {
      singleEvents.data = new Date(singleEvents.data)
      this.editEventsActivate = true
      this.selectedEvents = Object.assign({}, singleEvents)
    },
    formatDate() {
      this.events.forEach((element) => {
        const date = new Date(element.date)
        // eslint-disable-next-line no-console
        console.log(date)
        element.date = date.toLocaleDateString('pt-br')
      })
    },
    updateEvents(id) {
      this.$axios
        .put(`/api/events/${id}`, this.selectedEvents)
        .then((res) => {
          this.openSuccessToast('Notícia editada com sucesso')
          this.getEvents()
        })
        .catch((err) => {
          this.openDangerToast(this.errorMessage(err.response.data.code))
        })
    },
    deleteEvents(id) {
      this.$axios
        .delete(`/api/Events/${id}`)
        .then((res) => {
          this.openSuccessToast('Notícia deletada com sucesso')
          this.getEvents()
        })
        .catch((err) => {
          this.openDangerToast(this.errorMessage(err.response.data.code))
        })
    }
  }
}
</script>

<style></style>
