<template>
  <div class="box">
    <h1 class="title">{{ selectedExample.objective }}</h1>
    <h2 class="subtitle">{{ selectedExample.fieldOfWork }}</h2>
    <b-tabs v-model="activeTab">
      <b-tab-item label="Indicadores">
        <div
          v-for="(indicator, index) in selectedExample.indicators"
          :key="index"
        >
          <CardComponent :title="indicator.indicator_name">
            <template v-slot:content>
              <h3 class="is-size-4">Metódo de Coleta</h3>
              <p>{{ indicator.wayOfCollection }}</p>
              <h3 class="is-size-4">Metódo de Análise</h3>
              <p>{{ indicator.wayOfAnalysis }}</p>
              <h3 class="is-size-4">Finalidade</h3>
              <p>{{ indicator.indicator_reason }}</p>
            </template>
          </CardComponent>
        </div>
      </b-tab-item>

      <b-tab-item label="Artefatos">
        <div
          v-for="(artefact, index) in selectedExample.artefacts"
          :key="index"
        >
          <CardComponent :title="artefact.artefact_name">
            <template v-slot:content>
              <h3 class="is-size-4">Modelo</h3>
              <p>{{ artefact.model }}</p>
              <h3 class="is-size-4">Metódo de utilização</h3>
              <p>{{ artefact.wayOfUse }}</p>
              <h3 class="is-size-4">Finalidade</h3>
              <p>{{ artefact.artefact_reason }}</p>
            </template>
          </CardComponent>
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import { notificationHandler } from '~/front/mixins/notificationHandler'
import CardComponent from '~/components/CardComponent'
export default {
  components: { CardComponent },
  mixins: [notificationHandler],
  props: {
    selectedExample: {
      type: Object,
      default: function() {
        return {
          objective: '',
          fieldOfWork: '',
          artefacts: [],
          indicators: [],
          author: 0
        }
      }
    }
  },
  data() {
    return {
      activeTab: 0
    }
  }
}
</script>

<style></style>
