<template>
  <div class="container">
    <section class="section">
      <h1 class="title has-text-centered">Exemplos</h1>
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
    <b-field v-if="formStage >= 2" class="has-text-centered">
      <b-button type="is-info" @click="validateExample">Pesquisar</b-button>
    </b-field>
    <CardComponent v-if="formStage === 3" :title="example.objective">
      <template v-slot:content>
        <p>Indicadores Cadastrados : {{ example.indicators.length }}</p>
        <p>Artefatos Cadastrados : {{ example.artefacts.length }}</p>
      </template>
      <template v-slot:footer>
        <a class="card-footer-item" @click="showDetailedExample()">
          Ver detalhes
        </a>
      </template>
    </CardComponent>
    <b-modal :active.sync="showDetailedExampleModal">
      <DetailedExample :selected-example="example" />
    </b-modal>
  </div>
</template>

<script>
import { objectiveCompetency } from '~/shared/enums'
import { enumMap } from '~/front/mixins/enum'
import { notificationHandler } from '~/front/mixins/notificationHandler'
import CardComponent from '~/components/CardComponent'
import DetailedExample from '~/components/DetailedExample'
export default {
  layout: 'public',
  components: { CardComponent, DetailedExample },
  mixins: [enumMap, notificationHandler],
  data() {
    return {
      formStage: 1,
      example: {
        objective: '',
        fieldOfWork: '',
        artefacts: [],
        indicators: [],
        author: 0
      },
      objectiveCompetencies: objectiveCompetency,
      fields: [],
      showDetailedExampleModal: false
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
    if (this.update) {
      this.formStage = 3
    }
  },
  methods: {
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
          if (res.data.length >= 1) {
            this.formStage = 3
            this.example.indicators = res.data[0].indicators
            this.example.artefacts = res.data[0].artefacts
          } else {
            this.openDangerToast('Nenhum exemplo encontrado')
          }
        })
        .catch((err) => {
          this.notificationHandler.openDangerToast(
            this.errorMessage(err.response.data.code)
          )
        })
    },
    showDetailedExample() {
      this.showDetailedExampleModal = true
    }
  }
}
</script>

<style></style>
