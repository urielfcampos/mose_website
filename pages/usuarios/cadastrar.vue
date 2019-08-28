<template>
  <section>
    <div class="container">
      <br />
      <h1 class="text title has-text-centered">Cadastro de Usuário</h1>
      <form @submit.prevent="validateForm">
        <b-field label="Nome Completo">
          <b-input v-model="user.fullName" required></b-input>
        </b-field>
        <b-field label="E-mail">
          <b-input v-model="user.email" type="email" required></b-input>
        </b-field>
        <b-field label="Senha">
          <b-input
            v-model="user.password"
            type="password"
            password-reveal
            required
          >
          </b-input>
        </b-field>
        <b-field label="Estado">
          <b-select v-model="user.state" required>
            <option disabled value="">Selecione um estado</option>
            <option v-for="state in states" :key="state.id" :value="state.name">
              {{ state.name }}
            </option>
          </b-select>
        </b-field>
        <b-field label="Telefone">
          <b-input v-model="user.phoneNumber" required></b-input>
        </b-field>
        <b-field label="Área de atuação">
          <b-autocomplete
            v-model="user.fieldOfWork"
            :data="autoFieldOfWork"
            icon="magnify"
            required
            @select="(option) => (selected = option)"
          ></b-autocomplete>
        </b-field>
        <b-field label="Papel">
          <b-select v-model="user.role" required>
            <option disabled value="">Selecione um papel</option>
            <option value="admin">Administrador</option>
            <option value="evaluator">Avaliador</option>
            <option value="auditor">Auditor</option>
          </b-select>
        </b-field>
        <br />
        <b-button type="submit" class="btn is-info" @click="validateForm">
          Cadastrar
        </b-button>
      </form>
    </div>
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
      user: {
        fullName: '',
        email: '',
        password: '',
        state: '',
        phoneNumber: '',
        fieldOfWork: '',
        role: ''
      },
      states,
      fields: [],
      selected: null
    }
  },
  computed: {
    autoFieldOfWork() {
      return this.fields.filter((option) => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.user.fieldOfWork.toLowerCase()) >= 0
        )
      })
    }
  },
  created() {
    this.getFields()
  },
  methods: {
    validateForm() {
      const invalidEmail = !this.validEmail()
      for (const userProperty in this.user) {
        if (this.user[userProperty] === '' || invalidEmail) {
          this.$toast.open({
            message: invalidEmail
              ? 'Por favor insira um e-mail valido'
              : 'Por favor preencha todo o formulário',
            type: 'is-danger'
          })
          return
        }
      }
      this.sendForm()
    },
    sendForm() {
      this.$axios
        .post('/api/users', this.user)
        .then((res) => {
          this.openSuccessToast('Usuário cadastrado com sucesso')
          this.getFields()
        })
        .catch((err) => {
          this.openDangerToast(this.errorMessage(err.response.data.code))
        })
    },
    validEmail() {
      const re = RegExp(
        /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      return re.test(this.user.email)
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
