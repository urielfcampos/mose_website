<template>
  <section>
    <div class="container">
      <br />
      <h1 class="text title has-text-centered">Cadastro de Exemplo</h1>
      <form @submit.prevent="validateForm">
        <section class="section">
          <b-field label="Finalidade">
            <b-input
              v-model="example.reason"
              maxlength="200"
              type="textarea"
              required
            ></b-input>
          </b-field>
          <b-field label="Objetivo de competência">
            <b-input
              v-model="example.objective"
              maxlength="200"
              type="textarea"
              required
            ></b-input>
          </b-field>
          <b-field label="Área de Atuação">
            <b-autocomplete
              v-model="example.fieldOfWork"
              :data="autoFieldOfWork"
              icon="magnify"
              required
              @select="(option) => (selected = option)"
            ></b-autocomplete>
          </b-field>
        </section>
        <b-tabs v-model="activeTab" position="is-centered">
          <b-tab-item label="Artefato">
            <b-field label="Nome">
              <b-input v-model="example.artefact.name" required></b-input>
            </b-field>
            <b-field label="Modelo">
              <b-input
                v-model="example.artefact.model"
                maxlength="200"
                type="textarea"
                required
              ></b-input>
            </b-field>
            <b-field label="Como utilizar">
              <b-input
                v-model="example.artefact.wayOfUse"
                maxlength="200"
                type="textarea"
                required
              >
              </b-input>
            </b-field>
          </b-tab-item>
          <b-tab-item label="Indicadores">
            <b-field label="Nome">
              <b-input v-model="example.statistics.name" required></b-input>
            </b-field>
            <b-field label="Procedimento de coleta">
              <b-input
                v-model="example.statistics.wayOfCollection"
                maxlength="200"
                type="textarea"
                required
              ></b-input>
            </b-field>
            <b-field label="Procedimento de análise">
              <b-input
                v-model="example.statistics.wayOfAnalysis"
                maxlength="200"
                type="textarea"
                required
              >
              </b-input>
            </b-field>
          </b-tab-item>
        </b-tabs>

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
      example: {
        reason: '',
        objective: '',
        fieldOfWork: '',
        artefact: { name: '', model: '', wayOfUse: '' },
        statistics: { name: '', wayOfCollection: '', wayOfAnalysis: '' },
        author: 0
      },
      fields: [],
      selected: null,
      activeTab: 0
    }
  },
  computed: {
    autoFieldOfWork() {
      return this.fields.filter((option) => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.example.fieldOfWork.toLowerCase()) >= 0
        )
      })
    }
  },
  created() {
    this.getFields()
  },
  methods: {
    validateForm() {
      for (const exampleProperty in this.example) {
        if (this.example[exampleProperty] === '') {
          this.$toast.open({
            message: 'Por favor preencha todo o formulário',
            type: 'is-danger'
          })
          return
        }
      }
      for (const exampleProperty in this.example.statistics) {
        if (this.example.statistics[exampleProperty] === '') {
          this.$toast.open({
            message: 'Por favor preencha todo o formulário',
            type: 'is-danger'
          })
          return
        }
      }
      for (const exampleProperty in this.example.artefact) {
        if (this.example.artefact[exampleProperty] === '') {
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
      this.example.author = this.$store.state.auth.user.id
      this.$axios
        .post('/api/examples', this.example)
        .then((res) => {
          this.openSuccessToast('Exemplo cadastrado com sucesso')
          this.getFields()
        })
        .catch((err) => {
          this.openDangerToast(this.errorMessage(err.response.data.code))
        })
    },
    getFields() {
      this.$axios
        .get('/api/users/fields')
        .then((res) => {
          const fields = [...res.data]
          for (const field in fields) {
            this.fields.push(fields[field].fieldOfWork)
          }
        })
        .catch((err) => {
          this.openDangerToast(this.errorMessage(err.response.data.code))
        })
    }
  }
}
</script>

<style></style>
