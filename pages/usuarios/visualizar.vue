<template>
  <section class="container">
    <b-table
      :data="users"
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
          <b-button class="is-info" @click="editUser(props.row)">
            Editar
          </b-button>
          <b-button class="is-info" @click="deactivateUser(props.row.id)">
            Inativar
          </b-button>
        </section>
      </template>
    </b-table>
    <b-modal :active.sync="editUserActivate">
      <div class="container box">
        <b-field label="Nome Completo">
          <b-input v-model="selectedUser.fullName" required></b-input>
        </b-field>
        <b-field label="E-mail">
          <b-input v-model="selectedUser.email" type="email" required></b-input>
        </b-field>
        <b-field label="Senha">
          <b-input
            v-model="selectedUser.password"
            type="password"
            password-reveal
            required
          >
          </b-input>
        </b-field>
        <b-field label="Estado">
          <b-select v-model="selectedUser.state" required>
            <option disabled value="">Selecione um estado</option>
            <option v-for="state in states" :key="state.id" :value="state.name">
              {{ state.name }}
            </option>
          </b-select>
        </b-field>
        <b-field label="Telefone">
          <b-input v-model="selectedUser.phoneNumber" required></b-input>
        </b-field>
        <b-field label="Área de atuação">
          <b-input v-model="selectedUser.fieldOfWork" required></b-input>
        </b-field>
        <b-field label="Papel">
          <b-select v-model="selectedUser.role" required>
            <option disabled value="">Selecione um papel</option>
            <option value="admin">Administrador</option>
            <option value="evaluator">Avaliador</option>
            <option value="auditor">Auditor</option>
          </b-select>
        </b-field>
        <br />
        <b-button
          type="submit"
          class="btn is-info"
          @click="updateUser(selectedUser.id)"
        >
          Editar
        </b-button>
      </div>
    </b-modal>
  </section>
</template>

<script>
import { states } from '~/shared/enums'
import { errorHandler } from '~/front/mixins/errorHandler'
import { notificationHandler } from '~/front/mixins/notificationHandler'
export default {
  mixins: [errorHandler, notificationHandler],
  data() {
    return {
      users: [],
      columns: [
        { field: 'fullName', label: 'Nome' },
        { field: 'email', label: 'E-mail' },
        { field: 'state', label: 'Estado' },
        { field: 'phoneNumber', label: 'Telefone' },
        { field: 'fieldOfWork', label: 'Área de atuação' },
        { field: 'role', label: 'Papel' }
      ],
      editUserActivate: false,
      selectedUser: {},
      states
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      this.$axios.get('/api/users').then((res) => {
        this.users = [...res.data]
      })
    },
    editUser(user) {
      this.editUserActivate = true
      this.selectedUser = Object.assign({}, user)
    },
    updateUser(id) {
      this.$axios
        .put(`/api/users/${id}`, this.selectedUser)
        .then((res) => {
          this.openSuccessToast('Usuário editado com sucesso')
          this.getUsers()
        })
        .catch((err) => {
          this.openDangerToast(this.errorMessage(err.response.data.code))
        })
    },
    deactivateUser(id) {
      this.$axios
        .delete(`/api/users/${id}`)
        .then((res) => {
          this.openSuccessToast('Usuário excluido com sucesso')
          this.getUsers()
        })
        .catch((err) => {
          this.openDangerToast(this.errorMessage(err.response.data.code))
        })
    }
  }
}
</script>

<style></style>
