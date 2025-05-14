<template>
  <div>
    <button @click="showModal" class="btn btn-primary">
      Оценить репозиторий
    </button>

    <RepositoryRatingModal 
      ref="ratingModal"
      @save-rating="handleSaveRating"
    />
  </div>
</template>

<script>
import RepositoryRatingModal from '../modals/RepositoryRatingModal.vue'

export default {
  name: "OpenTest",
  components: {
    RepositoryRatingModal
  },
  methods: {
    showModal() {
      this.$refs.ratingModal.show(482)
    },
    handleSaveRating({ rating, remarks }) {
      console.log('Сохраненная оценка:', rating)
      console.log('Замечания:', remarks)
      // Здесь можно отправить данные на сервер
      alert(`Оценка ${rating} сохранена!`)
    }
  }
}
</script>