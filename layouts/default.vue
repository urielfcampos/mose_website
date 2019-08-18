<template>
  <div>
    <section class="main-content columns">
      <aside class="column is-2 section menu menu-column">
        <ul class="menu-list">
          <li>
            <nuxt-link to="/"> <b-icon icon="home" /> Home </nuxt-link>
          </li>
        </ul>
        <p class="menu-label">
          <b-icon icon="account" />
          Usuários
        </p>
        <ul class="menu-list">
          <li v-for="(item, key) of itemsUser" :key="key">
            <nuxt-link :to="item.to" exact-active-class="is-active">
              {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
        <p class="menu-label">
          <b-icon icon="book" />
          Exemplos
        </p>
        <ul class="menu-list">
          <li v-for="(item, key) of itemsExample" :key="key">
            <nuxt-link :to="item.to" exact-active-class="is-active">
              {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
        <ul class="menu-list">
          <li>
            <a @click="logout"> <b-icon icon="logout" /> Sair </a>
          </li>
        </ul>
      </aside>

      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: ['auth'],
  data() {
    return {
      itemsUser: [
        {
          title: 'Cadastrar',
          to: { name: 'usuarios-cadastrar' }
        },
        {
          title: 'Visualizar',
          to: { name: 'usuarios-visualizar' }
        }
      ],
      itemsExample: [
        {
          title: 'Cadastrar',
          to: { name: 'exemplos-cadastrar' }
        },
        {
          title: 'Visualizar',
          to: { name: 'exemplos-cadastrar' }
        }
      ]
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('auth/logout').then(() => {
          this.$router.push('/login')
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

<style scoped>
.menu-column {
  background-color: #fafafa;
  height: 100vh;
  box-shadow: 3px 3px 3px 3px #f5f5f5;
}
</style>
