<template>
  <div class="modal fade" id="userRatingModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Рейтинг пользователей</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-0">
          <!-- Фильтры и сортировка -->
          <div class="card-header bg-light">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-search"></i>
                  </span>
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Поиск по имени..."
                    v-model="searchQuery"
                  >
                </div>
              </div>
              <div class="col-md-6 text-end">
                <span class="text-muted me-2">Сортировка:</span>
                <button 
                  class="btn btn-sm btn-outline-secondary"
                  @click="toggleSortOrder"
                >
                  <i class="bi" :class="sortIcon"></i>
                  По баллам
                </button>
              </div>
            </div>
          </div>

          <!-- Список пользователей -->
          <div class="list-group list-group-flush">
            <div 
              v-for="(user, index) in filteredUsers" 
              :key="user.id" 
              class="list-group-item list-group-item-action"
              @click="goOnPage(user.login)"
            >
              <div class="d-flex justify-content-between align-items-center">
                <!-- Место и аватар -->
                <div class="d-flex align-items-center" style="width: 40%;">
                  <span 
                    class="badge me-3" 
                    :class="getRankBadgeClass(index + 1)"
                  >
                    {{ index + 1 }}
                  </span>
                  <img 
                    :src="user.avatar || defaultAvatar" 
                    class="rounded-circle me-3" 
                    width="40" 
                    height="40"
                  >
                  <div>
                    <h6 class="mb-0">{{ user.login }}</h6>
                  </div>
                </div>

                <!-- Баллы и прогресс -->
                <div class="text-center" style="width: 30%;">
                  <div class="mb-1">
                    <strong>{{ user.rating }}</strong> 
                    <small class="text-muted">баллов</small>
                  </div>
                  <div class="progress" style="height: 6px;">
                    <div 
                      class="progress-bar" 
                      :class="getProgressBarClass(user.rating)"
                      role="progressbar" 
                      :style="{ width: getProgressWidth(user.rating) + '%' }"
                    ></div>
                  </div>
                </div>
            </div>

            <!-- Пустое состояние -->
            <div v-if="filteredUsers.length === 0" class="text-center py-5">
              <i class="bi bi-people display-5 text-muted"></i>
              <p class="mt-3 text-muted">Пользователи не найдены</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import UserService from '@/services/UserService'
export default {
  name: 'UserRatingModal',

  data() {
    return {
      defaultAvatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      searchQuery: '',
      sortDesc: true,
      modalInstance: null,
      users: [],
    }
  },
  computed: {
    sortedUsers() {
      return [...this.users].sort((a, b) => {
        return this.sortDesc ? b.rating - a.rating : a.rating - b.rating
      })
    },
    filteredUsers() {
      if (!this.searchQuery) return this.sortedUsers
      
      const query = this.searchQuery.toLowerCase()
      return this.sortedUsers.filter(user => 
        user.login.toLowerCase().includes(query)
      )
    },
    sortIcon() {
      return this.sortDesc ? 'bi-sort-down' : 'bi-sort-up'
    }
  },
  mounted() {
    this.modalInstance = new Modal(document.getElementById('userRatingModal'))
  },
  methods: {
    goOnPage(login){
        this.hide()
        this.$router.push(`/${login}`)
    },
    async show() {
      await UserService.getAll()
      .then(response => {
        this.users = response.data
      })
      this.users.forEach(user =>{
        if(user.preview == null)
          user.avatar = null
        else
          user.avatar = `data:image/png;base64,${user.preview}`;
      })
      this.modalInstance.show()
    },
    hide() {
      this.modalInstance.hide()
    },
    toggleSortOrder() {
      this.sortDesc = !this.sortDesc
    },
    getRankBadgeClass(rank) {
      if (rank === 1) return 'bg-gold'
      if (rank === 2) return 'bg-silver'
      if (rank === 3) return 'bg-bronze'
      return 'bg-secondary'
    },
    getProgressBarClass(points) {
      if (points > 80) return 'bg-success'
      if (points > 50) return 'bg-primary'
      if (points > 20) return 'bg-warning'
      return 'bg-danger'
    },
    getProgressWidth(points) {
      const maxPoints = 100
      return Math.min((points / maxPoints) * 100, 100)
    },

    getTrophyColor(rank) {
      if (rank === 1) return 'text-warning'
      if (rank <= 3) return 'text-muted'
      return 'text-secondary'
    }
  }
}
</script>

<style scoped>
.modal-content {
  border-radius: 10px;
}

.list-group-item {
  padding: 1rem 1.25rem;
  border-left: none;
  border-right: none;
}

.list-group-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.bg-gold {
  background-color: #ffd700 !important;
  color: #000;
}

.bg-silver {
  background-color: #c0c0c0 !important;
  color: #000;
}

.bg-bronze {
  background-color: #cd7f32 !important;
  color: #fff;
}

.progress {
  border-radius: 3px;
  background-color: #e9ecef;
}

.progress-bar {
  transition: width 0.6s ease;
}

img {
  object-fit: cover;
}
</style>