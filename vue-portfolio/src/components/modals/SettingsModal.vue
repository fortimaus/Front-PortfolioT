<template>
  <div class="modal fade" id="editUserModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Редактирование пользователя</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ul class="nav nav-tabs mb-4" id="editUserTabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab">
                Основная информация
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="services-tab" data-bs-toggle="tab" data-bs-target="#services" type="button" role="tab">
                Сервисы
              </button>
            </li>
          </ul>

          <div class="tab-content">
            <!-- Основная информация -->
            <div class="tab-pane fade show active" id="profile" role="tabpanel">
              <form @submit.prevent="saveProfile">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label class="form-label">Логин</label>
                    <input type="text" class="form-control" v-model="user.login" required>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Пароль</label>
                    <div class="input-group">
                      <input :type="showPassword ? 'text' : 'password'" class="form-control" v-model="user.password">
                      <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
                        <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Информация о пользователе</label>
                  <textarea class="form-control" v-model="user.info" rows="3"></textarea>
                </div>

                <div class="mb-4">
                  <label class="form-label">Аватар</label>
                  <div class="d-flex align-items-center">
                    <img :src="user.avatar || defaultAvatar" class="rounded-circle me-3" width="64" height="64">
                    <div>
                      <input type="file" class="form-control" @change="handleAvatarUpload" accept="image/*">
                      <small class="text-muted">Рекомендуемый размер: 200x200px</small>
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <div class="input-group">
                    <input type="email" class="form-control" v-model="user.email" required>
                    <button class="btn btn-outline-primary" type="button" @click="updateEmail">
                      Обновить
                    </button>
                  </div>
                </div>

                <div class="d-flex justify-content-end">
                  <button type="submit" class="btn btn-primary">Сохранить</button>
                </div>
              </form>
            </div>

            <!-- Сервисы -->
            <div class="tab-pane fade" id="services" role="tabpanel">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6>Подключенные сервисы</h6>
                <button class="btn btn-sm btn-primary" @click="showAddServiceModal">
                  <i class="bi bi-plus"></i> Добавить сервис
                </button>
              </div>

              <div class="list-group">
                <div v-for="(service, index) in services" :key="index" class="list-group-item">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{{service.serviceName}}</strong>
                    </div>
                    <div>
                      <p>
                        {{service.data}}
                      </p>
                    </div>
                    <div>
                      <button class="btn btn-sm btn-outline-secondary me-2" @click="editService(service.serviceId)">
                        <strong>Ред.</strong>
                      </button>
                      <button class="btn btn-sm btn-outline-danger" @click="removeService(service.serviceId)">
                        <strong>X</strong>
                      </button>
                    </div>
                  </div>
                </div>
                <div v-if="services.length === 0" class="list-group-item text-muted text-center">
                  Нет подключенных сервисов
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Модальное окно добавления/редактирования сервиса -->
  <ServiceModal ref="serviceModal" @save-service="handleServiceSave" />

  <!-- Модальное окно подтверждения email -->
  <EmailConfirmationModal ref="emailConfirmationModal" />
</template>

<script>
import { Modal } from 'bootstrap'
import ServiceModal from './ServiceModal.vue'
import EmailConfirmationModal from './EmailConfirmationModal.vue'
import UserService from '@/services/UserService'
import LinkService from '@/services/LinkService'
export default {
  name: "EditUser",
  components: {
    ServiceModal,
    EmailConfirmationModal
  },
  data() {
    return {
      showPassword: false,
      user: {
        login: '',
        password: '',
        info: '',
        avatar: '',
        email: '',
        
      },
      services: [],
      editServiceIndex: null,
      modalInstance: null
    }
  },
  mounted() {
    this.modalInstance = new Modal(document.getElementById('editUserModal'))
  },
  methods: {
    async show() {
      await UserService.get(localStorage.getItem('user'))
    .then(response =>
      {
        this.user.login = response.data.login
        this.user.password = response.data.password
        this.user.email = response.data.email
        this.user.info = response.data.about
        if(response.data.preview == null)
                this.avatar = null
            else
            {
                this.user.avatar = `data:image/png;base64,${response.data.preview}`;
            }       
        
      } 
    )
      await LinkService.getbyUser(localStorage.getItem('user'))
      .then(response => {
        this.services = response.data
      })
      this.modalInstance.show()
    },
    hide() {
      this.modalInstance.hide()
    },
    handleAvatarUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.user.avatar = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    async updateEmail() {
      await UserService.updateEmail(localStorage.getItem('user'), this.user.email)
      .then(response => {
        this.$refs.emailConfirmationModal.show(this.user.email)
        console.log(response)
      })
      .catch(error => {
        alert("Что-то пошло не так! Возможно данная почта уже занята")
        console.log(error)
      })
      
    },
    saveProfile() {
      let imagePreview = null;

      if(this.user.avatar != null){
        let arr = this.user.avatar.split(",");
        imagePreview = arr[1];
      }

      let data = {
        Id : localStorage.getItem('user'),
        login: this.user.login,
        password: this.user.password,
        about: this.user.info,
        preview:imagePreview
      }
      UserService.update(data)
      .then(response => {
        console.log(response)
        alert("Данные успешно обновлены")
        this.hide();
      })
      .catch(error => {
        console.log(error)
        alert("Произошла ошибка")
      })
    },
    showAddServiceModal() {
      this.editServiceIndex = null
      this.$refs.serviceModal.show()
    },
    editService(index) {
      this.editServiceIndex = index
      this.$refs.serviceModal.show(index)
    },
    async removeService(serviceId) {
      await LinkService.delete(localStorage.getItem('user'),serviceId)
      .then(response => {
        console.log(response)
        LinkService.getbyUser(localStorage.getItem('user'))
        .then(links => {
          this.services = links.data
        })
      })
      .catch(error => {
        console.log(error.data)
      })
    },
    async handleServiceSave() {
      await LinkService.getbyUser(localStorage.getItem('user'))
        .then(links => {
          this.services = links.data
        })
    },
    getServiceName(type) {
      const names = {
        'gitulstu': 'Git UlSTU',
        'github': 'GitHub',
        'elib': 'Elib UlSTU'
      }
      return names[type] || type
    }
  }
}
</script>

<style scoped>
.nav-tabs {
  border-bottom: 1px solid #dee2e6;
}

.nav-tabs .nav-link {
  border: none;
  color: #495057;
  padding: 0.75rem 1.5rem;
}

.nav-tabs .nav-link.active {
  color: #0d6efd;
  background-color: transparent;
  border-bottom: 2px solid #0d6efd;
}

.list-group-item {
  border-left: none;
  border-right: none;
}

.list-group-item:first-child {
  border-top: none;
}

.list-group-item:last-child {
  border-bottom: none;
}

.rounded-circle {
  object-fit: cover;
}
</style>