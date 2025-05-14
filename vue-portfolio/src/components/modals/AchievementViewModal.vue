<template>
  <div class="modal fade" id="achievementViewModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ achievement.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Карусель с изображениями -->
          <div v-if="achievement.images && achievement.images.length > 0" class="mb-4">
            <div id="achievementCarousel" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button 
                  v-for="(image, index) in achievement.images" 
                  :key="index"
                  type="button" 
                  data-bs-target="#achievementCarousel"
                  :data-bs-slide-to="index"
                  :class="{ 'active': index === 0 }"
                  aria-current="true"
                  :aria-label="'Slide ' + (index + 1)"
                ></button>
              </div>
              <div class="carousel-inner rounded">
                <div 
                  v-for="(image, index) in achievement.images"
                  :key="'img-' + index"
                  class="carousel-item"
                  :class="{ 'active': index === 0 }"
                >
                  <img 
                    :src="image" 
                    class="d-block w-100 achievement-image"
                    :alt="'Изображение ' + (index + 1) + ' достижения ' + achievement.title"
                  >
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#achievementCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Предыдущее</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#achievementCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Следующее</span>
              </button>
            </div>
          </div>

          <!-- Описание достижения -->
          <div class="mb-4">
            <h6 class="fw-bold">Описание:</h6>
            <p class="text-muted">{{ achievement.description }}</p>
          </div>

          <!-- Ссылка на достижение -->
          <div class="mb-4" v-if="achievement.link">
            <h6 class="fw-bold">Ссылка:</h6>
            <a 
              :href="achievement.link" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-decoration-none"
            >
              {{ formatLink(achievement.link) }}
              <i class="bi bi-box-arrow-up-right ms-1"></i>
            </a>
          </div>

          <!-- Дополнительная информация -->
          <div class="mb-3" v-if="achievement.additionalInfo">
            <h6 class="fw-bold">Дополнительная информация:</h6>
            <p class="text-muted">{{ achievement.additionalInfo }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
  name: 'AchievementViewModal',
  props: {
    achievementData: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        description: '',
        link: '',
        additionalInfo: '',
        images: []
      })
    }
  },
  data() {
    return {
      modalInstance: null,
      achievement: {
        title: '',
        description: '',
        link: '',
        additionalInfo: '',
        images: []
      }
    }
  },
  watch: {
    achievementData: {
      immediate: true,
      handler(newVal) {
        this.achievement = { ...newVal }

      }
    }
  },
  mounted() {
    this.modalInstance = new Modal(document.getElementById('achievementViewModal'))
  },
  methods: {
    show() {
      this.modalInstance.show()
    },
    hide() {
      this.modalInstance.hide()
    },
    formatLink(link) {
      try {
        const url = new URL(link)
        return url.hostname + (url.pathname !== '/' ? url.pathname : '')
      } catch {
        return link
      }
    }
  }
}
</script>

<style scoped>
.achievement-image {
  height: 500px;
  object-fit: contain;
  background-color: #f8f9fa;
}

.modal-content {
  border-radius: 10px;
  border: none;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  border-bottom: 1px solid #dee2e6;
}

.modal-footer {
  border-top: 1px solid #dee2e6;
}

.carousel {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.carousel-indicators button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 5px;
  background-color: #6c757d;
}

.carousel-indicators .active {
  background-color: #0d6efd;
}
</style>