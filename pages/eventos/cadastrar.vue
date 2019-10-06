<template>
  <section>
    <div class="container">
      <br />
      <h1 class="text title has-text-centered">Cadastro de Eventos</h1>
      <form @submit.prevent="validateForm">
        <b-field label="Nome do evento.">
          <b-input v-model="event.name" required></b-input>
        </b-field>
        <b-field label="Resumo">
          <b-input
            v-model="event.summary"
            type="textarea"
            maxlenght="200"
            required
          ></b-input>
        </b-field>
        <b-field label="Local do evento.">
          <b-input v-model="event.local" required></b-input>
        </b-field>
        <b-field label="Data">
          <b-datepicker v-model="event.date" icon="calendar-today">
          </b-datepicker>
        </b-field>
        <b-field label="Horário">
          <b-timepicker v-model="event.time" icon="clock" hour-format="24">
          </b-timepicker>
        </b-field>
        <br />
        <b-button type="submit" class="btn is-info" @click="validateForm">
          Cadastrar
        </b-button>
      </form>
    </div>
  </section>
</template>

<script>
import { errorHandler } from '~/front/mixins/errorHandler'
import { notificationHandler } from '~/front/mixins/notificationHandler'
export default {
  mixins: [errorHandler, notificationHandler],
  data() {
    return {
      event: {
        name: '',
        summary: '',
        local: '',
        time: new Date(),
        date: new Date()
      }
    }
  },
  methods: {
    validateForm() {
      for (const eventProperty in this.event) {
        if (this.event[eventProperty] === '') {
          this.$toast.open({
            message: 'Por favor preencha todo o formulário',
            type: 'is-danger'
          })
          return
        }
      }
      this.sendForm()
    },
    sendForm() {
      this.$axios
        .post('/api/events', this.event)
        .then((res) => {
          this.openSuccessToast('Evento cadastrado com sucesso')
          this.getFields()
        })
        .catch((err) => {
          this.openDangerToast(this.errorMessage(err.response.data.code))
        })
    }
  }
}
</script>

<style></style>
