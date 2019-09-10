<template>
  <div class="container">
    <section class="section">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div v-for="(event, index) in events" :key="index">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  {{ event.title }}
                </p>
                <a href="#" class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </a>
              </header>
              <div class="card-content">
                <div class="content" style="word-wrap:break-word">
                  <p>{{ getSummaryNews(singleNews.bodyText) }}</p>
                  <br />
                  <time :datetime="getData">{{ getData }}</time>
                </div>
              </div>
              <footer class="card-footer">
                <a href="#" class="card-footer-item">Ver evento</a>
              </footer>
            </div>
            <br />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'public'
}
</script>

<style></style>
