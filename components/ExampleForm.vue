<template>
  <section>
    <div class="container">
      <br />
      <h1 class="text title has-text-centered">{{ title }}</h1>
      <form @submit.prevent="validateForm">
        <section class="section">
          <b-field v-if="formStage >= 1" label="Objetivo de competência">
            <b-select
              v-model="example.objective"
              placeholder="Selecione um objetivo de competência"
              @input="moveFormStage"
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
          <b-field v-if="formStage >= 2" label="Área de Atuação">
            <b-autocomplete
              v-model="example.fieldOfWork"
              :data="autoFieldOfWork"
              icon="magnify"
              required
              @select="(option) => (selected = option)"
            ></b-autocomplete>
          </b-field>
        </section>
        <b-field v-if="formStage === 2" class="has-text-centered">
          <b-button type="is-info" @click="validateExample">Pesquisar</b-button>
        </b-field>
        <b-tabs
          v-if="formStage === 3"
          v-model="activeTab"
          position="is-centered"
        >
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
                    {{ editingArtefact === index ? 'Editar' : 'Visualizar' }}
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
                    @click="editIndicator(index)"
                  >
                    {{
                      editingIndicator === index ? 'Finalizar edição' : 'Editar'
                    }}
                  </b-button>
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
          {{ exampleFormButton }}
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
  name: 'ExampleForm',
  mixins: [errorHandler, notificationHandler, enumMap],
  props: {
    selectedExample: {
      type: Object,
      default: function() {
        return {
          objective: '',
          fieldOfWork: '',
          artefacts: [],
          indicators: [],
          author: 0
        }
      }
    },
    title: {
      type: String,
      default: ''
    },
    update: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      example: this.selectedExample,
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
      editingArtefact: null,
      editingIndicator: null,
      formStage: 1,
      canSubmit: true
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
    },
    exampleFormButton() {
      if (this.update) {
        return 'Atualizar'
      } else {
        return 'Cadastrar'
      }
    }
  },
  created() {
    this.getFields()
    if (this.update) {
      this.formStage = 3
    }
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
          'Por favor cadastre pelo menos um indicador ou um artefato'
        )
        return
      }
      if (this.update) {
        this.updateExample(this.example.id)
      } else this.sendForm()
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
        .get('/api/examples/fields')
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
      if (this.editingArtefact === index) {
        this.example.artefacts[index] = Object.assign({}, this.artefact)
        this.editingArtefact = null
        Object.keys(this.artefact).forEach((element) => {
          this.artefact[element] = ''
        })
        return
      }
      this.editingArtefact = index
    },
    editIndicator(index) {
      this.indicator = this.example.indicators[index]
      if (this.editingIndicator === index) {
        this.example.indicators[index] = Object.assign({}, this.indicator)
        this.editingIndicator = null
        Object.keys(this.indicator).forEach((element) => {
          this.indicator[element] = ''
        })
        return
      }
      this.editingIndicator = index
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
    },
    updateExample(id) {
      this.$axios
        .put(`/api/examples/${id}`, this.selectedExample)
        .then((res) => {
          this.openSuccessToast('Exemplo editado com sucesso')
          this.getExamplesById(id)
          this.$emit('updated-example', 'updated')
        })
        .catch((err) => {
          this.openDangerToast(this.errorMessage(err.response.data.code))
        })
    },
    getExampleById(id) {
      this.$axios.get(`/api/examples/${id}`).then((res) => {
        this.example = res.data[0]
      })
    },
    moveFormStage() {
      this.formStage = 2
    },
    validateExample() {
      const params = {
        params: {
          fieldOfWork: this.example.fieldOfWork,
          objective: this.example.objective
        }
      }
      this.$axios
        .get('/api/examples', params)
        .then((res) => {
          this.canSubmit = !this.canSubmit
          this.formStage = 3
          if (res.data.length >= 1) {
            this.$toast.open('Editando exemplo existente.')
            this.example.indicators = res.data[0].indicators
            this.example.artefacts = res.data[0].artefacts
          } else {
            this.$dialog.confirm({
              message: 'Criar um novo exemplo ?',
              onConfirm: () => {
                this.$toast.open('Cadastrando novo exemplo')
              }
            })
          }
        })
        .catch((err) => {
          this.notificationHandler.openDangerToast(
            this.errorMessage(err.response.data.code)
          )
        })
    }
  }
}
</script>

<style></style>
