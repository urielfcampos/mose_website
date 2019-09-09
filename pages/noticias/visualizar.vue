<template>
  <section class="container">
    <b-table
      :data="news"
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
          <b-button class="is-info" @click="editNews(props.row)">
            Editar
          </b-button>
          <b-button class="is-info" @click="deleteNews(props.row.id)">
            Deletar
          </b-button>
        </section>
      </template>
    </b-table>
    <b-modal :active.sync="editNewsActivate">
      <div class="container box">
        <b-field label="Título">
          <b-input v-model="selectedNews.title" required></b-input>
        </b-field>
        <b-field label="Texto">
          <b-input
            v-model="selectedNews.bodyText"
            type="textarea"
            maxlenght="200"
            required
          ></b-input>
        </b-field>
        <b-field label="Data">
          <b-datepicker v-model="selectedNews.data" icon="calendar-today">
          </b-datepicker>
        </b-field>
        <br />
        <b-button
          type="submit"
          class="btn is-info"
          @click="updateNews(selectedNews.id)"
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
      news: [],
      columns: [
        { field: 'title', label: 'Título' },
        { field: 'data', label: 'Data' },
        { field: 'fullName', label: 'Autor' }
      ],
      editNewsActivate: false,
      selectedNews: {}
    }
  },
  async created() {
    await this.getNews()
  },
  methods: {
    getNews() {
      this.$axios.get('/api/news').then((res) => {
        this.news = [...res.data]
      })
    },
    editNews(singleNews) {
      singleNews.data = new Date(singleNews.data)
      this.editNewsActivate = true
      this.selectedNews = Object.assign({}, singleNews)
    },
    updateNews(id) {
      this.$axios
        .put(`/api/news/${id}`, this.selectedNews)
        .then((res) => {
          this.openSuccessToast('Notícia editada com sucesso')
          this.getNews()
        })
        .catch((err) => {
          this.openDangerToast(this.errorMessage(err.response.data.code))
        })
    },
    deleteNews(id) {
      this.$axios
        .delete(`/api/news/${id}`)
        .then((res) => {
          this.openSuccessToast('Notícia deletada com sucesso')
          this.getNews()
        })
        .catch((err) => {
          this.openDangerToast(this.errorMessage(err.response.data.code))
        })
    }
  }
}
</script>

<style></style>
