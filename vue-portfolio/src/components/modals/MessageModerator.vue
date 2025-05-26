<template>
  <div class="modal fade" id="messagesModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content" style="max-height: 80vh;">
        <div class="modal-header">
          <h5 class="modal-title">Сообщения</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0 border-bottom">
          <!-- Список сообщений -->
          <div class="list-group list-group-flush">
            <div 
              v-for="(message, index) in messages" 
              :key="index" 
              class="list-group-item border-0"
            >
              <div class="d-flex justify-content-between align-items-start mb-2">
                <!-- Отправитель -->
                <div class="d-flex align-items-center">
                  <img 
                    :src="message.avatar" 
                    :alt="message.moderatorName"
                    class="rounded-circle me-2"
                    width="32"
                    height="32"
                  >
                  <strong>{{ message.moderatorName }}</strong>
                </div>
                
                <!-- Дата сообщения -->
                <small class="text-muted">{{ formatDate(message.date) }}</small>
              </div>
              
              <!-- Текст сообщения -->
              <div class="message-text ps-4">
                {{ message.text }}
              </div>
              
              <!-- Разделитель (кроме последнего сообщения) -->
              <hr v-if="index < messages.length - 1" class="my-3">
            </div>
            
            <!-- Пустое состояние -->
            <div v-if="messages.length === 0" class="text-center py-5 text-muted">
              <i class="bi bi-envelope display-5"></i>
              <p class="mt-3">Нет сообщений</p>
            </div>
          </div>
        </div>
        <div class="p-3">
            <form @submit.prevent="sendMessage">
            <div class="input-group">
              <textarea 
                class="form-control" 
                placeholder="Введите сообщение..."
                v-model="newMessage"
                rows="2"
                required
              ></textarea>
              <button class="btn btn-primary" type="submit">
                Отправить
              </button>
            </div>
          </form>
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
import UserService from '@/services/UserService'
export default {
  name: 'MessagesModal',
  data() {
    return {
      modalInstance: null,
      defaultAvatar: "https://ds4-sosnovoborsk-r04.gosweb.gosuslugi.ru/netcat_files/21/10/blankdirectory_3.png",
      messages: [],
      newMessage: '',
      user: 0,
    }
  },
  mounted() {
    this.modalInstance = new Modal(document.getElementById('messagesModal'))
  },
  methods: {
    async getComments(){
        await UserService.comments(this.user)
      .then(response => {
        this.messages = response.data
        this.messages.forEach((element) => {
          if(element.avatar == null)
                element.avatar = this.defaultAvatar
            else
                element.avatar = `data:image/png;base64,${element.avatar}`;
      })
        });
    },
    async show(id) {
      this.user = id
      await this.getComments()
      this.modalInstance.show()
    },
    async sendMessage(){
        let data = {
            text: this.newMessage,
            moderatorId : localStorage.getItem('user'),
            userId: this.user
        }
        await UserService.createComment(data)
        .then(response => {
            console.log(response)
            this.newMessage = ''
            this.getComments()
        })
        .catch(error =>{
            console.log(error)
            alert("Произошла ошибка")
        })
    },
    hide() {
      this.modalInstance.hide()
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.modal-content {
  border-radius: 10px;
}

.list-group-item {
  padding: 1.25rem;
}

.message-text {
  white-space: pre-wrap;
  word-break: break-word;
}

/* Анимация при наведении на сообщение */
.list-group-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
  transition: background-color 0.2s ease;
}

/* Стили для аватара */
img {
  object-fit: cover;
}
.rounded-circle{
    width: 32px;
    height: 32px;
}
</style>