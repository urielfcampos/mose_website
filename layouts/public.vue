<template>
  <section>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" :to="{ name: 'public' }">
          <img src="@/assets/logo-mose-transp.png" alt="Logo mose" />
        </nuxt-link>
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link
            class="navbar-item"
            :to="{ name: 'public-noticias' }"
            exact-active-class="is-active"
          >
            Noticias
          </nuxt-link>
          <nuxt-link
            class="navbar-item"
            :to="{ name: 'public-eventos' }"
            exact-active-class="is-active"
          >
            Eventos
          </nuxt-link>
          <nuxt-link
            class="navbar-item"
            :to="{ name: 'public-exemplos' }"
            exact-active-class="is-active"
          >
            Exemplos
          </nuxt-link>
        </div>
        <div class="navbar-end">
          <nuxt-link class="navbar-item has-text-danger" :to="{ path: '/' }">
            Área restrita
          </nuxt-link>
        </div>
      </div>
    </nav>
    <nuxt />
  </section>
</template>

<script>
export default {}
</script>

<style></style>
