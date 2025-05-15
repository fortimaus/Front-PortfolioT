<template>
  <div class="modal fade" id="serviceModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ editMode ? 'Редактирование' : 'Добавление' }} сервиса</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveService">
            <div class="mb-3">
              <label class="form-label">Сервис</label>
              <select class="form-select" v-model="service.type" required>
                <option value="gitulstu">Git UlSTU</option>
                <option value="github">GitHub</option>
                <option value="elib">Elib UlSTU</option>
              </select>
            </div>

            <div v-if="service.type === 'elib'">
              <div class="mb-3">
                <label class="form-label">ФИО</label>
                <input type="text" class="form-control" v-model="service.fio" required>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Год начала</label>
                  <input type="number" class="form-control" v-model="service.startYear" min="1900" max="2100" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Год окончания</label>
                  <input type="number" class="form-control" v-model="service.endYear" min="1900" max="2100" required>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="mb-3">
                <label class="form-label">Логин</label>
                <input type="text" class="form-control" v-model="service.login" required>
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Отмена</button>
              <button type="submit" class="btn btn-primary">Сохранить</button>
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
  name: 'ServiceModal',
  data() {
    return {
      service: {
        type: 'gitulstu',
        login: '',
        fio: '',
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear() + 4
      },
      editMode: false,
      modalInstance: null
    }
  },
  mounted() {
    this.modalInstance = new Modal(document.getElementById('serviceModal'))
  },
  methods: {
    show(serviceData = null) {
      if (serviceData) {
        this.service = JSON.parse(JSON.stringify(serviceData))
        this.editMode = true
      } else {
        this.resetForm()
        this.editMode = false
      }
      this.modalInstance.show()
    },
    hide() {
      this.modalInstance.hide()
    },
    resetForm() {
      this.service = {
        type: 'gitulstu',
        login: '',
        fio: '',
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear() + 4
      }
    },
    saveService() {
      this.$emit('save-service', { ...this.service })
      this.hide()
    }
  }
}
</script>