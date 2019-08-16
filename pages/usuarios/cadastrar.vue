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
      states: [
        {
          id: 0,
          name: 'Acre'
        },
        {
          id: 1,
          name: 'Alagoas'
        },
        {
          id: 2,
          name: 'Amapá'
        },
        {
          id: 3,
          name: 'Amazonas'
        },
        {
          id: 4,
          name: 'Ceará'
        },
        {
          id: 5,
          name: 'Distrito Federal'
        },
        {
          id: 6,
          name: 'Espírito Santo'
        },
        {
          id: 7,
          name: 'Goiás'
        },
        {
          id: 8,
          name: 'Maranhão'
        },
        {
          id: 9,
          name: 'Mato Grosso'
        },
        {
          id: 10,
          name: 'Mato Grosso do Sul'
        },
        {
          id: 11,
          name: 'Minas Gerais'
        },
        {
          id: 12,
          name: 'Pará'
        },
        {
          id: 13,
          name: 'Paraíba'
        },
        {
          id: 14,
          name: 'Paraná'
        },
        {
          id: 15,
          name: 'Pernambuco'
        },
        {
          id: 16,
          name: 'Piauí'
        },
        {
          id: 17,
          name: 'Rio de Janeiro'
        },
        {
          id: 18,
          name: 'Rio Grande do Norte'
        },
        {
          id: 19,
          name: 'Rio Grande do Sul'
        },
        {
          id: 21,
          name: 'Rondônia'
        },
        {
          id: 22,
          name: 'Roraima'
        },
        {
          id: 23,
          name: 'Santa Catarina'
        },
        {
          id: 24,
          name: 'São Paulo'
        },
        {
          id: 25,
          name: 'Sergipe'
        },
        {
          id: 26,
          name: 'Tocantins'
        }
      ]
    }
  },
  methods: {
    validateForm() {
      for (const userProperty in this.user) {
        if (this.user[userProperty] === '') {
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
    }
  }
}
</script>

<style></style>
