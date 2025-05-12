<template>
    <div class="auth-container">
      <div class="auth-card">
        <!-- Логотип -->
        <div class="logo-container text-center mb-4">
          <span class="logo-text">Portfolio<span class="logo-highlight">T</span></span>
        </div>
        
        <h2 class="text-center mb-4">Вход в систему</h2>
        
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="login" class="form-label">Логин</label>
            <input 
              type="text" 
              class="form-control" 
              id="login" 
              v-model="form.login"
              placeholder="Введите ваш логин"
              required
            >
          </div>
          
          <div class="mb-3">
            <label for="password" class="form-label">Пароль</label>
            <input 
              type="password" 
              class="form-control" 
              id="password" 
              v-model="form.password"
              placeholder="Введите ваш пароль"
              required
            >
          </div>
          
          
          <button type="submit" class="btn btn-primary w-100 mb-3" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            {{ loading ? 'Вход...' : 'Войти' }}
          </button>
          
          <div class="text-center">
            <span class="text-muted">Ещё нет аккаунта? </span>
            <router-link to="/register" class="text-decoration-none">Зарегистрироваться</router-link>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import UserService from '../../services/UserService';
  export default {
    name: 'AuthPage',
    data() {
      return {
        form: {
          login: '',
          password: '',
        },
        loading: false,
        errors: {}
      }
    },
    methods: {
      async handleSubmit() {
        this.loading = true;
        console.log('Отправка данных:', this.form);
        await UserService.login(this.form.login,this.form.password)
        .then(response => {

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", response.data.user.id);
            this.$router.push('/main');
        })
        .catch(error => {
            this.loading = false
            alert(`Произошла ошибка: ${error.response.data.detail}`)
        })

        
            
            
      },

    }
  }
  </script>
  
  <style scoped>
  .auth-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    padding: 20px;
  }
  
  .auth-card {
    width: 100%;
    max-width: 420px;
    padding: 2rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
  
  .logo-text {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
  }
  
  .logo-highlight {
    color: #42b983;
  }
  
  .form-control {
    padding: 12px;
    border-radius: 8px;
  }
  
  .btn-primary {
    padding: 12px;
    border-radius: 8px;
    font-weight: 600;
    background-color: #42b983;
    border-color: #42b983;
  }
  
  .btn-primary:hover {
    background-color: #369f6b;
    border-color: #369f6b;
  }
  
  a {
    color: #42b983;
    font-weight: 500;
  }
  
  a:hover {
    color: #369f6b;
  }
  </style>