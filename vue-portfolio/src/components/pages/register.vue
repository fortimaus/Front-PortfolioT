<template>
  <div class="auth-container">
    <div class="auth-card">
      <!-- Логотип -->
      <div class="logo-container text-center mb-4">
        <span class="logo-text">Portfolio<span class="logo-highlight">T</span></span>
      </div>
      
      <h2 class="text-center mb-4">Регистрация</h2>
      
      <form @submit.prevent="handleSubmit">
        <!-- Поле аватара -->
        <div class="mb-4 text-center">
          <div class="avatar-upload mb-2">
            <img :src="avatarPreview || 'https://via.placeholder.com/100'" 
                 class="avatar-preview rounded-circle"
                 width="100" height="100">
            <input type="file" 
                   ref="avatarInput"
                   class="d-none" 
                   accept="image/*"
                   @change="handleAvatarChange">
          </div>
          <button type="button" 
                  class="btn btn-sm btn-outline-secondary"
                  @click="$refs.avatarInput.click()">
            {{ avatarPreview ? 'Изменить фото' : 'Добавить фото' }}
          </button>
          <small v-if="errors.avatar" class="text-danger d-block mt-1">{{ errors.avatar }}</small>
        </div>

        <!-- Поле логина -->
        <div class="mb-3">
          <label for="username" class="form-label">Логин</label>
          <input 
            type="text" 
            class="form-control" 
            id="username" 
            v-model="form.username"
            placeholder="Придумайте логин"
            required
          >
          <small v-if="errors.username" class="text-danger">{{ errors.username }}</small>
        </div>

        <!-- Поле email -->
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input 
            type="email" 
            class="form-control" 
            id="email" 
            v-model="form.email"
            placeholder="Ваш email"
            required
          >
          <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
        </div>

        <!-- Поле пароля -->
        <div class="mb-3">
          <label for="password" class="form-label">Пароль</label>
          <input 
            type="password" 
            class="form-control" 
            id="password" 
            v-model="form.password"
            placeholder="Придумайте пароль"
            required
          >
          <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
        </div>

        <!-- Подтверждение пароля -->
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Подтвердите пароль</label>
          <input 
            type="password" 
            class="form-control" 
            id="confirmPassword" 
            v-model="form.confirmPassword"
            placeholder="Повторите пароль"
            required
          >
          <small v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</small>
        </div>

        <!-- Информация о пользователе -->
        <div class="mb-3">
          <label for="bio" class="form-label">О себе</label>
          <textarea 
            class="form-control" 
            id="bio" 
            v-model="form.bio"
            placeholder="Расскажите немного о себе"
            rows="3"
          ></textarea>
          <small v-if="errors.bio" class="text-danger">{{ errors.bio }}</small>
        </div>

        <!-- Кнопка регистрации -->
        <button type="submit" class="btn btn-primary w-100 mb-3" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>
        
        <!-- Ссылка на авторизацию -->
        <div class="text-center">
          <span class="text-muted">Уже есть аккаунт? </span>
          <router-link to="/login" class="text-decoration-none">Войти</router-link>
        </div>
      </form>
    </div>
  </div>
  <RegisterConfirm
      ref="emailModal"
      :email="form.email"
    />
</template>

<script>
import RegisterConfirm from '../modals/RegisterConfirm.vue'
import UserService from '../../services/UserService';

export default {
  name: 'RegisterPage',
  components: {
    RegisterConfirm
  },
  
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
        avatar: null
      },
      avatarPreview: null,
      loading: false,
      errors: {}
    }
  },
  methods: {
    handleAvatarChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      
      // Проверка размера файла (не более 2MB)
      if (file.size > 2 * 1024 * 1024) {
        this.errors.avatar = 'Файл слишком большой (макс. 2MB)';
        return;
      }
      
      this.form.avatar = file;
      this.errors.avatar = null;
      
      // Превью аватара
      const reader = new FileReader();
      reader.onload = (e) => {
        this.avatarPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    validateForm() {
      this.errors = {};
      let isValid = true;
      
      // Проверка паролей
      if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = 'Пароли не совпадают';
        isValid = false;
      }
      
      // Проверка длины пароля
      if (this.form.password.length < 6) {
        this.errors.password = 'Пароль должен содержать минимум 6 символов';
        isValid = false;
      }
      
      
      return isValid;
    },
    showModal(id) {
      this.$refs.emailModal.user = id
      this.$refs.emailModal.show()
    },
    async handleSubmit() {
      if (!this.validateForm()) return;
      
      let image = null;
      if(this.avatarPreview != null){
        let arr = this.avatarPreview.split(",");
        image = arr[1];
      }
      var data = {
        login: this.form.username,
        password: this.form.password,
        email: this.form.email,
        about: this.form.bio,
        preview: image
      }
      console.log(data)
      console.log(UserService)
      await UserService.register(data)
      .then(response => {
        console.log(response)
        
        this.showModal(response.data);
        
      })
      .catch(error => {
        this.loading = false
        alert(`Произошла ошибка: ${error.response.data.detail}`)
      })
      
    }
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
  max-width: 500px;
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

.avatar-preview {
  object-fit: cover;
  border: 3px solid #eee;
  cursor: pointer;
}

.avatar-preview:hover {
  opacity: 0.8;
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

.text-danger {
  font-size: 0.85rem;
}
</style>