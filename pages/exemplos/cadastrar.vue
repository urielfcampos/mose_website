<template>
  <section>
    <div class="container">
      <br />
      <h1 class="text title has-text-centered">Cadastro de Exemplo</h1>
      <form @submit.prevent="validateForm">
        <section class="section">
          <b-field label="Objetivo de competência">
            <b-select
              v-model="example.objective"
              placeholder="Selecione um objetivo de competência"
            >
              <optgroup
                v-for="(objectives, objectiveName) in objectiveCompetencies"
                :key="objectiveName"
                :label="getObjectiveName(objectiveName)"
              >
                <option
                  v-for="(objective, index) in objectives"
                  :key="index"
                  :value="objective"
                >
                  {{ objective }}
                </option>
              </optgroup>
            </b-select>
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
              <b-input v-model="artefact.artefact_name" required></b-input>
            </b-field>
            <b-field label="Finalidade">
              <b-input
                v-model="artefact.artefact_reason"
                maxlength="200"
                type="textarea"
                required
              ></b-input>
            </b-field>
            <b-field label="Informações constantes no artefato">
              <b-input
                v-model="artefact.model"
                maxlength="200"
                type="textarea"
                required
              ></b-input>
            </b-field>
            <b-field label="Como utilizar">
              <b-input
                v-model="artefact.wayOfUse"
                maxlength="200"
                type="textarea"
                required
              >
              </b-input>
            </b-field>
          </b-tab-item>
          <b-tab-item label="Indicadores">
            <b-field label="Nome">
              <b-input v-model="indicator.indicator_name" required></b-input>
            </b-field>
            <b-field label="Finalidade">
              <b-input
                v-model="indicator.indicator_reason"
                maxlength="200"
                type="textarea"
                required
              ></b-input>
            </b-field>
            <b-field label="Procedimento de coleta">
              <b-input
                v-model="indicator.wayOfCollection"
                maxlength="200"
                type="textarea"
                required
              ></b-input>
            </b-field>
            <b-field label="Procedimento de análise">
              <b-input
                v-model="indicator.wayOfAnalysis"
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
import { objectiveCompetency } from '~/shared/enums'
import { errorHandler } from '~/front/mixins/errorHandler'
import { notificationHandler } from '~/front/mixins/notificationHandler'
import { enumMap } from '~/front/mixins/enum'
export default {
  mixins: [errorHandler, notificationHandler, enumMap],
  data() {
    return {
      example: {
        objective: '',
        fieldOfWork: '',
        artefacts: [],
        indicators: [],
        author: 0
      },
      fields: [],
      selected: null,
      activeTab: 0,
      objectiveCompetencies: objectiveCompetency,
      artefact: {
        artefact_name: '',
        model: '',
        wayOfUse: '',
        artefact_reason: ''
      },
      indicator: {
        indicator_name: '',
        wayOfCollection: '',
        wayOfAnalysis: '',
        indicator_reason: ''
      }
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
      for (const exampleProperty in this.indicator) {
        if (this.indicator[exampleProperty] === '') {
          this.$toast.open({
            message: 'Por favor preencha todo o formulário',
            type: 'is-danger'
          })
          return
        }
      }
      for (const exampleProperty in this.artefact) {
        if (this.artefact[exampleProperty] === '') {
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
      this.example.artefacts = this.example.artefacts.concat(this.artefact)
      this.example.indicators = this.example.indicators.concat(this.indicator)
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
