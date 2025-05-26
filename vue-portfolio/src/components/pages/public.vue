<template>
  <div class="portfolio-app">
    <!-- Навигационная панель -->
    <nav v-if="isAuth" class="navbar px-4 navbar-expand-lg navbar-dark bg-dark text-center" >
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

    <!-- Герой-секция -->
    <header class="hero-section">
      <div class="container py-5">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-4">Создай впечатляющее портфолио</h1>
            <p class="lead mb-4">PortfolioT помогает студентам презентовать свои работы, проекты и достижения в профессиональном формате.</p>
          </div>
          <div class="col-lg-6 d-none d-lg-block p-5">
            <img src="@/assets/hero-image.png" alt="Портфолио" class="img-fluid rounded-5 shadow">
          </div>
        </div>
      </div>
    </header>

    <!-- О сервисе -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold">Как это работает?</h2>
          <p class="text-muted lead">Простое решение для вашего профессионального роста</p>
        </div>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="icon-box bg-primary bg-opacity-10 text-primary mb-3">
                  <i class="bi bi-pencil-square fs-3"></i>
                </div>
                <h5>Создай профиль</h5>
                <p class="text-muted">Заполни информацию о себе, образовании и навыках</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="icon-box bg-success bg-opacity-10 text-success mb-3">
                  <i class="bi bi-layout-wtf fs-3"></i>
                </div>
                <h5>Добавь работы</h5>
                <p class="text-muted">Загрузи проекты, курсовые, дипломы или другие достижения</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="icon-box bg-info bg-opacity-10 text-info mb-3">
                  <i class="bi bi-share fs-3"></i>
                </div>
                <h5>Поделись</h5>
                <p class="text-muted">Отправь ссылку работодателям или добавь в резюме</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Список пользователей -->
    <section class="py-5">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="mb-0">Активные пользователи</h2>
        </div>
        
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" v-for="user in users" :key="user.id">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                  <img :src="user.avatar" class="rounded-circle me-3" width="60" height="60" alt="Аватар">
                  <div>
                    <h5 class="mb-0">{{ user.login }}</h5>
                  </div>
                </div>
                <p class="card-text text-truncate-2">{{ user.about }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="badge bg-primary bg-opacity-10 text-primary">
                    <i class="bi bi-star-fill me-1"></i> {{ user.rating }}
                  </span>
                  <router-link :to="`/${user.login}`" class="btn btn-sm btn-outline-primary">
                    Посмотреть
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Призыв к действию -->
    <section class="py-5 bg-primary text-white">
      <div class="container text-center">
        <h2 class="fw-bold mb-4">Готов начать?</h2>
        <p class="lead mb-4">Создай свое портфолио прямо сейчас - это бесплатно!</p>
        <router-link to="/register" class="btn btn-light btn-lg px-4">
          Зарегистрироваться
        </router-link>
      </div>
    </section>

    <!-- Футер -->
    <footer class="bg-dark text-white py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 mb-4 mb-lg-0">
            <h5 class="mb-3">PortfolioT</h5>
            <p>Сервис для создания профессиональных портфолио студентов и начинающих специалистов.</p>
          </div>
          <div class="col-lg-2 col-md-4 mb-4 mb-md-0">
            <h5 class="mb-3">Навигация</h5>
            <ul class="list-unstyled">
              <li class="mb-2"><router-link to="/" class="text-white-50">Главная</router-link></li>
              <li class="mb-2"><router-link to="/login" class="text-white-50">Войти</router-link></li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-4 mb-4 mb-md-0">
            <h5 class="mb-3">Контакты</h5>
            <ul class="list-unstyled">
              <li class="mb-2"><i class="bi bi-envelope me-2"></i> contact@portfoliot.com</li>
              <li class="mb-2"><i class="bi bi-telegram me-2"></i> @portfoliot_support</li>
            </ul>
          </div>

        </div>
        <hr class="my-4">
        <div class="text-center">
          <small class="text-white-50">&copy; 2025 PortfolioT. Все права защищены.</small>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import UserService from '@/services/UserService';
export default {
    name:'publicPage',
    async created(){
        await UserService.getAll()
        .then(response=>{
            this.users = response.data
        })
        this.users.forEach(user =>{
        if(user.preview == null)
          user.avatar = null
        else
          user.avatar = `data:image/png;base64,${user.preview}`;
        })

        this.users.sort((a, b) => {
        return b.rating - a.rating
        })
        this.users = this.users.slice(0,6)
        if(localStorage.getItem('user'))
        {    
            this.isAuth = true;
            let role = this.parseJwt();
            if(role == "Admin")
                this.isAdmin = true;
            if(role == "Moderator")
                this.isModerator = true
        }

        
        
    },
    data(){
        return{
            users :[ ],
            isAuth: false,
            isAdmin:false,
            isModerator:false,
        }
    },
    methods: {
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
        exit(){
            localStorage.clear();
            this.$router.push('/login');
        },
    }
} 
</script>

<style scoped>
.portfolio-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%);
  color: white;
  padding: 5rem 0;
}

.icon-box {
  display: inline-flex;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.social-links a {
  transition: opacity 0.3s;
}
.rounded-circle{
    width: 64px;
    height: 64px;
}
.social-links a:hover {
  opacity: 0.7;
  text-decoration: none;
}
</style>