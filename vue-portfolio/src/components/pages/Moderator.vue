<template>
  <div class="container py-4">
    <h2 class="mb-4">Панель модератора</h2>
    
    <!-- Фильтры -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row">
          <div class="col mb-3 mb-md-0">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Поиск по имени или email..."
              v-model="searchQuery"
            >
          </div>
        </div>
      </div>
    </div>
    
    <!-- Список пользователей -->
    <div class="card">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Пользователь</th>
                <th>Email</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody >
              <tr v-for="user in filteredUsers" :key="user.id">
                <td>{{ user.id }}</td>
                <td>
                  <div class="hover-cursor d-flex align-items-center justify-content-center" @click="goOnPage(user.login)">
                    <img 
                      :src="user.avatar || defaultAvatar" 
                      class="rounded-circle me-2" 
                    >
                    <p>{{ user.login }}</p>
                  </div>
                    
                </td>
                <td>{{ user.email }}</td>
                <td>
                  <select 
                    class="form-select form-select-sm" 
                    v-model="user.status"
                    @change="updateUserStatus(user)"
                  >
                    <option v-for="status in statusLabels" :key="status.id" v-bind:value="status.id">
                      {{ status.title }}
                    </option>
                  </select>
                </td>
                <td>
                  <button 
                    class="btn btn-sm btn-outline-primary"
                    @click="openMessagesModal(user.id)"
                  >
                    <i class="bi bi-envelope me-1"></i>Сообщения
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Пустое состояние -->
        <div v-if="filteredUsers.length === 0" class="text-center py-5 text-muted">
          <i class="bi bi-people display-5"></i>
          <p class="mt-3">Пользователи не найдены</p>
        </div>
      </div>
    </div>
    
    <!-- Пагинация -->
    <nav v-if="filteredUsers.length > 0" class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="currentPage--">Назад</button>
        </li>
        <li 
          v-for="page in pages" 
          :key="page" 
          class="page-item" 
          :class="{ active: page === currentPage }"
        >
          <button class="page-link" @click="currentPage = page">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="currentPage++">Вперед</button>
        </li>
      </ul>
    </nav>
  </div>
  
  <!-- Модальное окно сообщений -->
  <MessageModerator 
    ref="messagesModal"
    @send-message="handleSendMessage"
  />
</template>

<script>
import MessageModerator from '../modals/MessageModerator.vue'
import UserService from '@/services/UserService'
export default {
  name:"ModeratorPage",
  components: {
    MessageModerator
  },
  data() {
    return {
      users: [],
      statusLabels: [
        {id:0, title:'Не определен'},
        {id:1, title:'Одобрено'},
        {id:2, title:'Есть замечения'},
        {id:3, title:'Есть ошибки'},
      ],
      searchQuery: '',
      statusFilter: '',
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  async created(){
    await UserService.getAll()
    .then(response => {
      this.users = response.data
    })
      this.users.forEach(user =>{
        console.log(user.status)
        if(user.preview == null)
          user.avatar = null
        else
          user.avatar = `data:image/png;base64,${user.preview}`;
      })
  },
  computed: {
    filteredUsers() {
      let result = this.users
      
      // Фильтрация по поисковому запросу
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        result = result.filter(user => 
          user.login.toLowerCase().includes(query) || 
          user.email.toLowerCase().includes(query))
      }
      
      // Фильтрация по статусу
      if (this.statusFilter) {
        result = result.filter(user => user.status === this.statusFilter)
      }
      
      // Пагинация
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return result.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.users.length / this.itemsPerPage)
    },
    pages() {
      const pages = []
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  methods: {
    async updateUserStatus(user) {
      await UserService.updateStatus(user.id,user.status)
      .then(response =>{
        console.log(response)
        alert("Статус успешно изменен")
      })
      .catch(error =>{
        console.log(error)
        alert("Что-то пошло не так")
      })
    },
    goOnPage(login){
      this.$router.push(`/${login}`)
    },
    openMessagesModal(user) {
      this.$refs.messagesModal.show(user)
    },
    handleSendMessage({ userId, message }) {
      // Здесь будет API запрос для отправки сообщения
      console.log(`Отправка сообщения пользователю ${userId}: ${message}`)
    }
  }
}
</script>

<style scoped>
.table th {
  font-weight: 600;
  background-color: #f8f9fa;
}

.table img {
  object-fit: cover;
}
.rounded-circle {
  width: 64px;
  height: 64px;
}
.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.page-link {
  color: #0d6efd;
}

.card {
  border-radius: 8px;
  border: none;
  box-shadow: 0 0.15rem 0.5rem rgba(0, 0, 0, 0.05);
}

.form-select-sm {
  max-width: 180px;
}
.hover-cursor {
  cursor: pointer; /* Стандартная рука */
}
</style>