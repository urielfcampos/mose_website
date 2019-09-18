<template>
  <section class="container">
    <b-table
      :data="examples"
      paginated
      per-page="10"
      aria-next-label="Próxima página"
      aria-previous-label="Página anterior"
      aria-page-label="Página"
      aria-current-label="Página Atual"
    >
      <template slot-scope="props">
        <b-table-column field="fieldOfWork" label="Área de Competência">
          <p>{{ props.row.fieldOfWork }}</p>
        </b-table-column>
        <b-table-column field="objective" label="Objetivo de Competência">
          <p>{{ props.row.objective }}</p>
        </b-table-column>
        <b-table-column field="button">
          <b-button class="is-info" @click="editExamples(props.row)">
            Visualizar
          </b-button>
        </b-table-column>
      </template>
    </b-table>
    <b-modal :active.sync="editExampleActivate" @close="getExamples">
      <div class="box">
        <ExampleForm
          title="Editar exemplo"
          :selected-example="selectedExample"
          :update="true"
          @updated-example.native="getExamples"
        />
      </div>
    </b-modal>
  </section>
</template>

<script>
import { errorHandler } from '~/front/mixins/errorHandler'
import { notificationHandler } from '~/front/mixins/notificationHandler'
import { objectiveCompetency } from '~/shared/enums'
import { enumMap } from '~/front/mixins/enum'
import ExampleForm from '~/components/ExampleForm'
export default {
  components: { ExampleForm },
  mixins: [errorHandler, notificationHandler, enumMap],
  data() {
    return {
      examples: [],
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
      this.selectedExample = { ...example }
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
