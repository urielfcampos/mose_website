<template>
  <section class="container">
    <b-table
      :data="examples"
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
          <b-button class="is-info" @click="editExamples(props.row)">
            Editar
          </b-button>
          <b-button class="is-info" @click="deleteExample(props.row.id)">
            Inativar
          </b-button>
        </section>
      </template>
    </b-table>
    <b-modal :active.sync="editExampleActivate">
      <div class="container box">
        <section class="section">
          <b-field label="Objetivo de competência">
            <b-select
              v-model="selectedExample.objective"
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
              v-model="selectedExample.fieldOfWork"
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
              <b-input
                v-model="selectedExample.artefact_name"
                required
              ></b-input>
            </b-field>
            <b-field label="Finalidade">
              <b-input
                v-model="selectedExample.artefact_reason"
                maxlength="200"
                type="textarea"
                required
              ></b-input>
            </b-field>
            <b-field label="Informações constantes no artefato">
              <b-input
                v-model="selectedExample.model"
                maxlength="200"
                type="textarea"
                required
              ></b-input>
            </b-field>
            <b-field label="Como utilizar">
              <b-input
                v-model="selectedExample.wayOfUse"
                maxlength="200"
                type="textarea"
                required
              >
              </b-input>
            </b-field>
          </b-tab-item>
          <b-tab-item label="Indicadores">
            <b-field label="Nome">
              <b-input
                v-model="selectedExample.indicator_name"
                required
              ></b-input>
            </b-field>
            <b-field label="Finalidade">
              <b-input
                v-model="selectedExample.indicator_reason"
                maxlength="200"
                type="textarea"
                required
              ></b-input>
            </b-field>
            <b-field label="Procedimento de coleta">
              <b-input
                v-model="selectedExample.wayOfCollection"
                maxlength="200"
                type="textarea"
                required
              ></b-input>
            </b-field>
            <b-field label="Procedimento de análise">
              <b-input
                v-model="selectedExample.wayOfAnalysis"
                maxlength="200"
                type="textarea"
                required
              >
              </b-input>
            </b-field>
          </b-tab-item>
        </b-tabs>
        <br />
        <b-button
          type="submit"
          class="btn is-info"
          @click="updateExample(selectedExample.id)"
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
import { objectiveCompetency } from '~/shared/enums'
import { enumMap } from '~/front/mixins/enum'
export default {
  mixins: [errorHandler, notificationHandler, enumMap],
  data() {
    return {
      examples: [],
      columns: [
        { field: 'fullName', label: 'Autor' },
        { field: 'indicator_count', label: 'Indicadores' },
        { field: 'artefact_count', label: 'Artefatos' },
        { field: 'objective', label: 'Objetivo de Competência' }
      ],
      editExampleActivate: false,
      selectedExample: {},
      activeTab: 0,
      fields: [],
      objectiveCompetencies: objectiveCompetency
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
    this.getExamples()
  },
  methods: {
    getExamples() {
      this.$axios.get('/api/examples').then((res) => {
        this.examples = [...res.data]
      })
    },
    getExampleById(id) {
      this.$axios.get(`/api/examples/${id}`).then((res) => {
        this.selectedExample = res.data[0]
      })
    },
    editExamples(example) {
      this.editExampleActivate = true
      this.getExampleById(example.id)
    },
    updateExample(id) {
      this.$axios
        .put(`/api/examples/${id}`, this.selectedExample)
        .then((res) => {
          this.openSuccessToast('Exemmplo editado com sucesso')
          this.getExamples()
        })
        .catch((err) => {
          this.openDangerToast(this.errorMessage(err.response.data.code))
        })
    },
    deleteExample(id) {
      this.$axios
        .delete(`/api/examples/${id}`)
        .then((res) => {
          this.openSuccessToast('Exemmplo deletada com sucesso')
          this.getExamples()
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
