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
        <p class="menu-label">
          <b-icon icon="book" />
          Notícias
        </p>
        <ul class="menu-list">
          <li v-for="(item, key) of itemsNews" :key="key">
            <nuxt-link :to="item.to" exact-active-class="is-active">
              {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
        <p class="menu-label">
          <b-icon icon="calendar" />
          Eventos
        </p>
        <ul class="menu-list">
          <li v-for="(item, key) of itemsEvents" :key="key">
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
          title: 'Visualizar',
          to: { name: 'usuarios-visualizar' }
        },
        {
          title: 'Cadastrar',
          to: { name: 'usuarios-cadastrar' }
        }
      ],
      itemsExample: [
        {
          title: 'Visualizar',
          to: { name: 'exemplos-visualizar' }
        },
        {
          title: 'Cadastrar',
          to: { name: 'exemplos-cadastrar' }
        }
      ],
      itemsNews: [
        {
          title: 'Visualizar',
          to: { name: 'noticias-visualizar' }
        },
        {
          title: 'Cadastrar',
          to: { name: 'noticias-cadastrar' }
        }
      ],
      itemsEvents: [
        {
          title: 'Visualizar',
          to: { name: 'eventos-visualizar' }
        },
        {
          title: 'Cadastrar',
          to: { name: 'eventos-cadastrar' }
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
  box-shadow: 3px 3px 3px 3px #f5f5f5;
}
</style>
