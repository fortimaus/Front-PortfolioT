<template>
  <div class="modal fade" id="updateArticleModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Обновление</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <!-- Название достижения -->
            <div class="mb-3">
              <label for="achievementTitle" class="form-label">Название*</label>
              <input 
                type="text" 
                class="form-control" 
                id="achievementTitle" 
                v-model="form.title"
                required
                placeholder="Например: Программа для сбора данных для портфолио"
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
                placeholder="Опишите ваш репозиторий, цели, задачи, выполняющее ваше приложение и т.д."
              ></textarea>
            </div>

            <!-- Описание языкока программирвоания -->
            <div class="mb-3">
              <label for="achievementWords" class="form-label"> Ключевые слова:</label>
              <textarea 
                class="form-control" 
                id="achievementWords" 
                v-model="form.words"
                rows="6"
                required
                placeholder="Слова, которые лучше всего описывают статью"
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
              <label class="form-label">Основное изображение</label>
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
                  <i class="bi bi-x">X</i>
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
                    <img :src="image.image" class="img-thumbnail" style="width: 100px; height: 100px; object-fit: cover;">
                    <button 
                      type="button" 
                      class="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-1"
                      @click="removeAdditionalImage(index)"
                    >
                      <i class="bi bi-x">X</i>
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
import ArticleService from '@/services/ArticleService'
export default {
  name: 'UpdateArticleModal',
  data() {
    return {
      id: -1,
      form: {
        title: '',
        description: '',
        link: '',
        language: '',
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
    this.modalInstance = new Modal(document.getElementById('updateArticleModal'))
  },
  methods: {
    async show(id) {
      this.resetForm()
      this.id = id
      await ArticleService.get(id)
        .then(response=>{
        this.form.title = response.data.title;
        this.form.description = response.data.description;
        this.form.link = response.data.link;
        this.form.words = response.data.words;
        if(response.data.preview){
          this.form.mainImage = true
          this.form.mainImagePreview = `data:image/png;base64,${response.data.preview}`
        }
        let myImgs = []
        response.data.images.forEach(img =>{
          myImgs.push({
            id: img.id,
            image: `data:image/png;base64,${img.image}`
          })
        })
        this.form.additionalImages = myImgs
    })
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
        language: '',
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
      if (file.size > 2 * 1024 * 1024) {
        this.errorMessage = 'Изображение слишком большое (максимум 2MB)'
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

        if (file.size > 2 * 1024 * 1024) {
          this.errorMessage = `Изображение "${file.name}" слишком большое (максимум 2MB)`
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
            id: -1,
            image: e.target.result
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

      this.isSubmitting = true
      this.errorMessage = ''
      
      let imagePreview = null;
        if(this.form.mainImagePreview != null){
          let arr = this.form.mainImagePreview.split(",");
          imagePreview = arr[1];
        }
        console.log( this.form.additionalImages)
        let AddImages = []
        this.form.additionalImages.forEach(img => {
          let arrImage = img.image.split(",")
          AddImages.push({
            id: img.id,
            image: arrImage[1]});
        })

        var data = {
        id: this.id,
        title: this.form.title,
        description: this.form.description,
        link: this.form.link,
        words: this.form.words,
        preview: imagePreview,
        images: AddImages,
        }
        console.log(data)
        await ArticleService.update(data)
        .then(response=>
        { 
          console.log(response)
          this.hide()
          this.$emit('artcile-update')
        })
        
        .catch(error=>{
          alert(error)
        })
      this.isSubmitting = false
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