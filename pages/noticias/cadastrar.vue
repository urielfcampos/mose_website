<template>
  <section>
    <div class="container">
      <br />
      <h1 class="text title has-text-centered">Cadastro de Notícias</h1>
      <form @submit.prevent="validateForm">
        <b-field label="Título">
          <b-input v-model="news.title" required></b-input>
        </b-field>
        <b-field label="Texto">
          <b-input
            v-model="news.bodyText"
            type="textarea"
            maxlenght="200"
            required
          ></b-input>
        </b-field>
        <b-field label="Data">
          <b-datepicker v-model="news.data" icon="calendar-today">
          </b-datepicker>
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
      news: {
        title: '',
        bodyText: '',
        data: ''
      }
    }
  },
  methods: {
    validateForm() {
      for (const newsProperty in this.news) {
        if (this.news[newsProperty] === '') {
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
        .post('/api/news', this.news)
        .then((res) => {
          this.openSuccessToast('Notícia cadastrada com sucesso')
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
