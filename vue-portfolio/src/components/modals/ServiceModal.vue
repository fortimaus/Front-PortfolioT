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
            <div v-if="!editMode" class="mb-3">
              <label class="form-label">Сервис</label>
              <select class="form-select" v-model="service.type" required>
                <option v-for="item in this.services" :key="item.id" :value="item.id"> {{ item.title }} </option>
              </select>
            </div>
            <div v-else class="mb-3">
              <label class="form-label">Сервис {{ (services.find(x => x.id == service.type)).title }}</label>
            </div>
            <div v-if="service.type == 3">
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
import LinkService from '@/services/LinkService'
import { Modal } from 'bootstrap'

export default {
  name: 'ServiceModal',
  data() {
    return {
      service: {
        type: 1,
        login: '',
        fio: '',
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear() + 4
      },
      services: [],
      editMode: false,
      modalInstance: null
    }
  },
  async mounted() {
    await LinkService.getAllTypes()
    .then(response =>{
      this.services = response.data
    })
    this.modalInstance = new Modal(document.getElementById('serviceModal'))
  },
  methods: {
    async show(id = null) {
      if (id) {
        await LinkService.get(localStorage.getItem('user'),id)
        .then(response =>{
          this.service.type = response.data.serviceId
          if(response.data.serviceId == 3)
          {
            let arr = response.data.data.split("-")
            this.service.fio = arr[0]
            this.service.startYear = arr[1]
            this.service.endYear = arr[2]
          }
          else if(response.data.serviceId == 1 || response.data.serviceId == 2)
            this.service.login = response.data.data
        })
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
        type: 1,
        login: '',
        fio: '',
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear() + 4
      }
    },
    async update(){
      let data = ''
      if(this.service.type == 1 || this.service.type == 2)
        data = this.service.login
      else if(this.service.type == 3)
        data = `${this.service.fio}-${this.service.startYear}-${this.service.endYear}`
      let update_data = {
        userId: localStorage.getItem('user'),
        serviceId : this.service.type,
        data: data
      }
      await LinkService.update(update_data)
      .then(response =>{
        console.log(response)
        this.$emit('save-service')
        this.hide()
      })
      .catch(error =>{
        console.log(error)
        alert("Что-то пошло не так")
      })
    },
    async save(){
      let data = ''
      if(this.service.type == 1 || this.service.type == 2)
        data = this.service.login
      else if(this.service.type == 3)
        data = `${this.service.fio}-${this.service.startYear}-${this.service.endYear}`
      let create_data = {
        userId: localStorage.getItem('user'),
        serviceId : this.service.type,
        data: data
      }
      console.log(create_data)
      await LinkService.create(create_data)
      .then(response =>{
        console.log(response)
        this.$emit('save-service')
        this.hide()
      })
      .catch(error =>{
        console.log(error)
        alert("Что-то пошло не так")
      })
      
    },
    async saveService() {
      if(this.editMode)
        await this.update()
      else
        await this.save()
    }
  }
}
</script>
<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.455);
}
</style>