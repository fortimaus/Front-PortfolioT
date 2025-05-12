<template>
  <div class="modal fade" id="achievementModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Добавить новое достижение</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <!-- Название достижения -->
            <div class="mb-3">
              <label for="achievementTitle" class="form-label">Название достижения*</label>
              <input 
                type="text" 
                class="form-control" 
                id="achievementTitle" 
                v-model="form.title"
                required
                placeholder="Например: Разработка сайта для компании X"
              >
            </div>

            <!-- Описание достижения -->
            <div class="mb-3">
              <label for="achievementDescription" class="form-label">Описание*</label>
              <textarea 
                class="form-control" 
                id="achievementDescription" 
                v-model="form.description"
                rows="4"
                required
                placeholder="Опишите ваше достижение, используемые технологии, ваш вклад и т.д."
              ></textarea>
            </div>

            <!-- Ссылка на достижение -->
            <div class="mb-3">
              <label for="achievementLink" class="form-label">Ссылка</label>
              <input 
                type="url" 
                class="form-control" 
                id="achievementLink" 
                v-model="form.link"
                placeholder="https://example.com"
              >
            </div>

            <!-- Основное изображение -->
            <div class="mb-3">
              <label class="form-label">Основное изображение*</label>
              <div v-if="!form.mainImage" class="border rounded p-3 text-center">
                <button 
                  type="button" 
                  class="btn btn-outline-primary"
                  @click="$refs.mainImageInput.click()"
                >
                  <i class="bi bi-image"></i> Загрузить изображение
                </button>
                <input 
                  type="file" 
                  ref="mainImageInput"
                  class="d-none" 
                  accept="image/*"
                  @change="handleMainImageUpload"
                >
              </div>
              <div v-else class="position-relative">
                <img :src="form.mainImagePreview" class="img-thumbnail d-block mb-2" style="max-height: 200px;">
                <button 
                  type="button" 
                  class="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-1"
                  @click="removeMainImage"
                >
                  <i class="bi bi-x"></i>
                </button>
              </div>
              <small class="text-muted">Это изображение будет использоваться как превью достижения</small>
            </div>

            <!-- Дополнительные изображения -->
            <div class="mb-3">
              <label class="form-label">Дополнительные изображения</label>
              <div class="border rounded p-3">
                <div class="d-flex flex-wrap gap-2 mb-3">
                  <div 
                    v-for="(image, index) in form.additionalImages" 
                    :key="index"
                    class="position-relative"
                  >
                    <img :src="image.preview" class="img-thumbnail" style="width: 100px; height: 100px; object-fit: cover;">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-1"
                      @click="removeAdditionalImage(index)"
                    >
                      <i class="bi bi-x"></i>
                    </button>
                  </div>
                </div>
                <button 
                  type="button" 
                  class="btn btn-outline-secondary"
                  @click="$refs.additionalImagesInput.click()"
                >
                  <i class="bi bi-plus"></i> Добавить изображения
                </button>
                <input 
                  type="file" 
                  ref="additionalImagesInput"
                  class="d-none" 
                  accept="image/*"
                  multiple
                  @change="handleAdditionalImagesUpload"
                >
              </div>
              <small class="text-muted">Вы можете добавить несколько изображений для демонстрации вашего достижения</small>
            </div>

            <div class="alert alert-danger" v-if="errorMessage">
              {{ errorMessage }}
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                {{ isSubmitting ? 'Сохранение...' : 'Сохранить достижение' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
  name: 'AchievementModal',
  data() {
    return {
      form: {
        title: '',
        description: '',
        link: '',
        mainImage: null,
        mainImagePreview: '',
        additionalImages: []
      },
      errorMessage: '',
      isSubmitting: false,
      modalInstance: null
    }
  },
  mounted() {
    this.modalInstance = new Modal(document.getElementById('achievementModal'))
  },
  methods: {
    show() {
      this.resetForm()
      this.modalInstance.show()
    },
    hide() {
      this.modalInstance.hide()
    },
    resetForm() {
      this.form = {
        title: '',
        description: '',
        link: '',
        mainImage: null,
        mainImagePreview: '',
        additionalImages: []
      }
      this.errorMessage = ''
      this.isSubmitting = false
    },
    handleMainImageUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      // Проверка размера файла (до 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'Изображение слишком большое (максимум 5MB)'
        return
      }

      // Проверка типа файла
      if (!file.type.match('image.*')) {
        this.errorMessage = 'Пожалуйста, выберите файл изображения'
        return
      }

      this.form.mainImage = file
      this.errorMessage = ''

      // Создаем превью изображения
      const reader = new FileReader()
      reader.onload = (e) => {
        this.form.mainImagePreview = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeMainImage() {
      this.form.mainImage = null
      this.form.mainImagePreview = ''
    },
    handleAdditionalImagesUpload(event) {
      const files = event.target.files
      if (!files || files.length === 0) return

      // Проверка каждого файла
      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        if (file.size > 5 * 1024 * 1024) {
          this.errorMessage = `Изображение "${file.name}" слишком большое (максимум 5MB)`
          continue
        }

        if (!file.type.match('image.*')) {
          this.errorMessage = `Файл "${file.name}" не является изображением`
          continue
        }

        // Создаем превью и добавляем в массив
        const reader = new FileReader()
        reader.onload = (e) => {
          this.form.additionalImages.push({
            file: file,
            preview: e.target.result
          })
        }
        reader.readAsDataURL(file)
      }

      // Очищаем input для возможности повторной загрузки тех же файлов
      event.target.value = ''
    },
    removeAdditionalImage(index) {
      this.form.additionalImages.splice(index, 1)
    },
    async submitForm() {
      if (!this.form.mainImage) {
        this.errorMessage = 'Пожалуйста, загрузите основное изображение'
        return
      }

      this.isSubmitting = true
      this.errorMessage = ''

      try {
        // Создаем FormData для отправки файлов
        const formData = new FormData()
        formData.append('title', this.form.title)
        formData.append('description', this.form.description)
        formData.append('link', this.form.link)
        formData.append('mainImage', this.form.mainImage)

        // Добавляем дополнительные изображения
        this.form.additionalImages.forEach((img, index) => {
          formData.append(`additionalImages[${index}]`, img.file)
        })

        // Здесь будет запрос к API
        // const response = await this.$api.post('/achievements', formData)
        
        // Имитация запроса
        await new Promise(resolve => setTimeout(resolve, 1500))

        // После успешного сохранения
        this.hide()
        this.$emit('achievement-created', {
          title: this.form.title,
          description: this.form.description,
          // Другие данные из ответа сервера
        })

      } catch (error) {
        console.error('Ошибка при сохранении:', error)
        this.errorMessage = 'Произошла ошибка при сохранении. Пожалуйста, попробуйте позже.'
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style scoped>
.modal-content {
  border-radius: 10px;
}

.img-thumbnail {
  cursor: pointer;
  transition: transform 0.2s;
}

.img-thumbnail:hover {
  transform: scale(1.05);
}
</style>