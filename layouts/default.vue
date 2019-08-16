<template>
  <div>
    <section class="main-content columns">
      <aside class="column is-2 section menu-column">
        <ul class="menu-list">
          <li>
            <nuxt-link to="/"> <b-icon icon="home" /> Home </nuxt-link>
          </li>
        </ul>
        <p class="menu-label is-hidden-touch">
          <b-icon icon="account" />
          Usuários
        </p>
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <nuxt-link :to="item.to" exact-active-class="is-active">
              {{ item.title }}
            </nuxt-link>
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
export default {
  data() {
    return {
      items: [
        {
          title: 'Cadastrar',
          to: { name: 'usuarios-cadastrar' }
        },
        {
          title: 'Visualizar',
          to: { name: 'usuarios-visualizar' }
        }
      ]
    }
  }
}
</script>

<style scoped>
.menu-column {
  background-color: #fafafa;
  height: 101vh;
  box-shadow: 3px 3px 3px 3px #f5f5f5;
}
</style>
