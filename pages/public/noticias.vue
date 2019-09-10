<template>
  <div class="container">
    <section class="section">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div v-for="(singleNews, index) in news" :key="index">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  {{ singleNews.title }}
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
                <a href="#" class="card-footer-item">Ver notícia</a>
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
import { errorHandler } from '~/front/mixins/errorHandler'
import { notificationHandler } from '~/front/mixins/notificationHandler'
export default {
  mixins: [errorHandler, notificationHandler],
  layout: 'public',
  data() {
    return {
      news: []
    }
  },
  computed: {
    getData() {
      return Date(this.news.data)
    }
  },
  async created() {
    await this.getNews()
  },
  methods: {
    getNews() {
      this.$axios
        .get('/api/news')
        .then((res) => {
          this.news = res.data
        })
        .catch((err) => {
          this.openDangerToast(this.errorMessage(err.response.data.code))
        })
    },
    getSummaryNews(newsText) {
      const splitString = newsText.split('.')
      return splitString[0].concat('...')
    }
  }
}
</script>

<style></style>
