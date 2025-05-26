<template>
  <nav class="navbar px-4 navbar-expand-lg navbar-dark bg-dark text-center" >
        <router-link to="/" class="navbar-brand">
            <div class="logo-container text-center">
                <span class="logo-text">Portfolio<span class="logo-highlight">T</span></span>
            </div>
        </router-link>
        <div class="container-fluid">
            <div class="navbar-nav mr-auto ">
                <li class="nav-item">
                  <a class="nav-link" @click="this.$router.push('/main')">Главная</a>
                </li>
                <li v-if="isAdmin || isModerator" class="nav-item">
                  <a class="nav-link" @click="this.$router.push('/status')">Панель модератора</a>
                </li>
                <li v-if="isAdmin" class="nav-item">
                  <a class="nav-link" @click="this.$router.push('/roles')">Панель админа</a>
                </li>
            </div>
          <div class="d-flex navbar-brand">
            <button type="button" class="btn btn-light" @click="exit()">Выйти</button>
        </div>
        </div>
      </nav>
  <div class="container py-4">
    <h2 class="mb-4">Панель админа</h2>
    
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
                    v-model="user.role"
                    @change="updateUserRole(user)"
                  >
                    <option v-for="role in roleLabels" :key="role.id" v-bind:value="role.id">
                      {{ role.title }}
                    </option>
                  </select>
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
  
</template>

<script>
import UserService from '@/services/UserService'
export default {
  name:"AdminPage",
  data() {
    return {
      users: [],
      roleLabels: [
        {id:2, title:'Пользователь'},
        {id:3, title:'Модератор'},
        {id:4, title:'Админ'},
      ],
      searchQuery: '',
      statusFilter: '',
      currentPage: 1,
      itemsPerPage: 10,
      isAdmin: false,
      isModerator: false,
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
      let role = this.parseJwt()
      if(role == "Admin")
            this.isAdmin = true;
      if(role == "Moderator")
            this.isModerator = true
      if(!this.isAdmin )
        this.$router.push("/main")
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
    async updateUserRole(user) {
      await UserService.updateRole(user.id,user.role)
      .then(response =>{
        console.log(response)
        alert("Роль успешно изменена")
      })
      .catch(error =>{
        console.log(error)
        alert("Что-то пошло не так")
      })
    },
    exit(){
      localStorage.clear();
      this.$router.push('/login');
    },
    goOnPage(login){
      this.$router.push(`/${login}`)
    },
    parseJwt () {
        var base64Url = localStorage.getItem('token').split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        console.log(jsonPayload)
        let role = jsonPayload.replace("http://schemas.microsoft.com/ws/2008/06/identity/claims/", "")
        let json = JSON.parse(role)
        console.log(json)
        return json.role;
        },
  }
}
</script>

<style scoped>
.table th {
  font-weight: 600;
  background-color: #f8f9fa;
}
.logo-text {
    font-size: 2rem;
    font-weight: 600;
    color: #ffffff;
}
.logo-highlight {
    color: #42b983;
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