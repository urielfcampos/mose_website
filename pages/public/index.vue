<template>
  <div class="container">
    <section class="section">
      <h1 class="title has-text-centered">Notícias</h1>
      <br />
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div v-for="(singleNews, index) in news" :key="index">
            <CardComponent :title="singleNews.title">
              <template v-slot:content>
                <p>
                  {{ getSummaryNews(singleNews.bodyText) }}
                </p>
              </template>
              <template v-slot:footer>
                <a
                  class="card-footer-item"
                  @click="showExpandedNews(singleNews)"
                  >Ver notícia</a
                >
              </template>
            </CardComponent>
            <br />
          </div>
        </div>
      </div>
    </section>
    <b-modal :active.sync="showDetailedNews">
      <DetailedNews :selected-news="selectedNews"></DetailedNews>
    </b-modal>
  </div>
</template>

<script>
import { errorHandler } from '~/front/mixins/errorHandler'
import { notificationHandler } from '~/front/mixins/notificationHandler'
import CardComponent from '~/components/CardComponent'
import DetailedNews from '~/components/DetailedNews'
export default {
  components: { CardComponent, DetailedNews },
  mixins: [errorHandler, notificationHandler],
  layout: 'public',
  data() {
    return {
      news: [],
      selectedNews: {},
      showDetailedNews: false
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
    },
    showExpandedNews(singleNews) {
      this.selectedNews = singleNews
      this.showDetailedNews = true
    }
  }
}
</script>

<style></style>
