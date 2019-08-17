<template>
  <section class="hero is-fullheight">
    <div class="hero-body has-text-centered">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-4 is-mobile">
            <figure class="image is-square">
              <img src="~/assets/logo-mose-transp.png" alt="Logo mose" />
            </figure>
            <br />
            <form class="container" @submit.prevent="handleLogin">
              <b-field label="E-mail">
                <b-input
                  v-model="email"
                  placeholder="Insira seu e-mail"
                ></b-input>
              </b-field>
              <b-field label="Senha">
                <b-input
                  v-model="password"
                  type="password"
                  placeholder="Insira sua senha"
                  password-reveal
                >
                </b-input>
              </b-field>
              <b-field label="Lembrar-me">
                <b-checkbox v-model="remember" type="checkbox" />
              </b-field>
              <b-button
                class="is-large"
                type="is-info"
                native-type="submit"
                :rounded="true"
                outlined
              >
                Fazer login
              </b-button>
            </form>
            <br />
            <a class="text-muted">
              Esqueci minha senha
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { errorHandler } from '~/front/mixins/errorHandler'
export default {
  name: 'LoginPage',
  layout: 'empty',
  mixins: [errorHandler],
  data() {
    return {
      email: '',
      password: '',
      remember: false
    }
  },
  methods: {
    async handleLogin() {
      try {
        await this.$store
          .dispatch('auth/login', {
            email: this.email,
            password: this.password
          })
          .then(() => {
            if (this.remember) {
              localStorage.setItem('lastLogin', this.username)
            }
            this.$router.push('/')
          })
      } catch (e) {
        this.$toast.open({
          type: 'is-danger',
          message: this.errorMessage(e.response.data.code)
        })
      }
    }
  }
}
</script>

<style></style>
