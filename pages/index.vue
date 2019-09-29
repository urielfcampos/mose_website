<template>
  <section class="section has-text-centered">
    <p class="title">Bem vindo à área administrativa do MOSE</p>
    <img
      src="@/assets/logo-mose-transp.png"
      alt="Logo mose transparente"
      width="50%"
      height="50%"
    />
  </section>
</template>

<script>
export default {
  name: 'HomePage',
  middleware: ['auth']
}
</script>
