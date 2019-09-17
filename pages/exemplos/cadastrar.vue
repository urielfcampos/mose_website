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
            <b-button type="is-primary" @click="addArtefact">
              Adicionar
            </b-button>
            <br />
            <br />
            <div
              v-for="(registeredArtefact, index) in example.artefacts"
              :key="index"
              class="box"
            >
              <b-field grouped>
                <p class="control title is-3">
                  {{ registeredArtefact.artefact_name }}
                </p>
                <p class="control ">
                  <b-button
                    class="has-text-right "
                    type="is-primary"
                    icon-left="pencil"
                    @click="editArtefact(index)"
                  >
                    {{ editingArtefact ? 'Finalizar edição' : 'Editar' }}
                  </b-button>
                </p>
                <p class="control">
                  <b-button
                    class="has-text-right"
                    type="is-danger"
                    icon-left="delete"
                    @click="deleteArtefact(index)"
                  >
                    Excluir
                  </b-button>
                </p>
              </b-field>
            </div>
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
            <b-button type="is-primary" @click="addIndicator">
              Adicionar
            </b-button>
            <br />
            <br />
            <div
              v-for="(registeredIndicator, index) in example.indicators"
              :key="index"
              class="box"
            >
              <b-field grouped>
                <p class="control title is-3">
                  {{ registeredIndicator.indicator_name }}
                </p>
                <p class="control ">
                  <b-button
                    class="has-text-right "
                    type="is-primary"
                    icon-left="pencil"
                    >Editar</b-button
                  >
                </p>
                <p class="control">
                  <b-button
                    class="has-text-right"
                    type="is-danger"
                    icon-left="delete"
                    >Excluir</b-button
                  >
                </p>
              </b-field>
            </div>
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
      },
      editingArtefact: false,
      editingIndicator: false
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
            message: 'Por favor preencha todo o formulário sobre Exemplo',
            type: 'is-danger'
          })
          return
        }
      }
      if (
        this.example.indicators.length === 0 &&
        this.example.artefacts.length === 0
      ) {
        this.openDangerToast(
          'Por favor cadastre pelo menos um indicador e um artefato'
        )
        return
      }
      if (this.example.indicators.length === 0) {
        this.openDangerToast('Por favor cadastre pelo menos um indicador')
        return
      }
      if (this.example.artefacts.length === 0) {
        this.openDangerToast('Por favor cadastre pelo menos um Exemplo')
        return
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

          this.clearFields()
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
    },
    addArtefact() {
      for (const exampleProperty in this.artefact) {
        if (this.artefact[exampleProperty] === '') {
          this.$toast.open({
            message: 'Por favor preencha todo o formulário de artefato',
            type: 'is-danger'
          })
          return
        }
      }
      this.example.artefacts.push(Object.assign({}, this.artefact))
      Object.keys(this.artefact).forEach((element) => {
        this.artefact[element] = ''
      })
    },
    addIndicator() {
      for (const exampleProperty in this.indicator) {
        if (this.indicator[exampleProperty] === '') {
          this.$toast.open({
            message: 'Por favor preencha todo o formulário de Indicador',
            type: 'is-danger'
          })
          return
        }
      }
      this.example.indicators.push(Object.assign({}, this.indicator))
      Object.keys(this.indicator).forEach((element) => {
        this.indicator[element] = ''
      })
    },
    editArtefact(index) {
      this.artefact = this.example.artefacts[index]
      if (this.editingArtefact === true) {
        this.example.artefacts[index] = Object.assign({}, this.artefact)
        this.editingArtefact = false
        Object.keys(this.artefact).forEach((element) => {
          this.artefact[element] = ''
        })
        return
      }
      this.editingArtefact = true
    },
    editIndicator(index) {
      this.indicator = this.example.indicator[index]
      if (this.editingIndicator === true) {
        this.example.indicators[index] = Object.assign({}, this.indicator)
        this.editingIndicator = false
        Object.keys(this.indicator).forEach((element) => {
          this.indicator[element] = ''
        })
        return
      }
      this.editingIndicator = true
    },
    deleteArtefact(index) {
      this.example.artefacts.splice(index, 1)
    },
    clearFields() {
      Object.keys(this.indicator).forEach((element) => {
        this.indicator[element] = ''
      })
      Object.keys(this.artefact).forEach((element) => {
        this.indicator[element] = ''
      })
      Object.keys(this.example).forEach((element) => {
        if (element === 'artefacts' || element === 'indicators') {
          this.example[element] = []
        } else this.example[element] = ''
      })
    }
  }
}
</script>

<style></style>
