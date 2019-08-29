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
export default {
  mixins: [errorHandler, notificationHandler],
  data() {
    return {
      examples: [],
      columns: [
        { field: 'author.fullName', label: 'Autor' },
        { field: 'reason', label: 'Finalidade' },
        { field: 'objective', label: 'Objetivo de Competência' },
        { field: 'fieldOfWork', label: 'Área de atuação' }
      ],
      editExampleActivate: false,
      selectedExample: {},
      activeTab: 0,
      fields: []
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
        this.selectedExample = Object.assign({}, res.data)
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
          this.openSuccessToast('Usuário editado com sucesso')
          this.getUsers()
        })
        .catch((err) => {
          this.openDangerToast(this.errorMessage(err.response.data.code))
        })
    },
    deleteExample(id) {
      this.$axios.delete(`/api/examples/${id}`).then((res) => {
        this.$toast.open({ message: '' })
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
