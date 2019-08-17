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
          <b-input v-model="user.fieldOfWork" required></b-input>
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
export default {
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
      states
    }
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
          this.$toast.open({
            message: 'Usuário cadastrado com sucesso',
            type: 'is-success'
          })
        })
        .catch((err) => {
          this.$toast.open({ message: err })
        })
    },
    validEmail() {
      const re = RegExp(
        /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      return re.test(this.user.email)
    }
  }
}
</script>

<style></style>
