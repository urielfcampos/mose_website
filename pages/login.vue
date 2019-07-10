<template>
  <section class="hero is-info is-fullheight">
    <div class="hero-body has-text-centered">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-4 is-mobile box">
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
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'empty',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        await this.$store.dispatch('auth/login').then(() => {
          if (this.remember) {
            localStorage.setItem('lastLogin', this.username)
          }
        })
      } catch (e) {
        this.$toast.open({ type: 'is-danger', message: 'ocorreu um erro' })
      }
    }
  }
}
</script>

<style></style>
