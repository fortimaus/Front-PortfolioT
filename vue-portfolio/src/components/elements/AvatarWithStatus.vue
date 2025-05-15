<template>
  <div class="avatar-with-status position-relative d-inline-block">
    <!-- Аватар пользователя -->
    <img 
      :src="avatarUrl || defaultAvatar"
      :alt="username || 'User avatar'"
      class="avatar-img rounded-circle border"
      :class="sizeClass"
      @error="handleImageError"
    >
    
    <!-- Индикатор статуса -->
    <span 
      class="status-badge position-absolute rounded-circle border border-2 border-white d-flex align-items-center justify-content-center"
      :class="[statusClass, sizeClass]"
      :title="statusText"
      data-bs-toggle="tooltip"
    >
      <i :class="statusIcon"></i>
    </span>
  </div>
</template>

<script>
import { Tooltip } from 'bootstrap'

export default {
  name: 'AvatarWithStatus',
  props: {
    avatarUrl: String,
    username: String,
    status: {
      type: String,
      default: 'unverified',
      validator: value => ['unverified', 'verified', 'warning', 'error'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg', 'xl'].includes(value)
    }
  },
  data() {
    return {
      defaultAvatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      imageLoadError: false
    }
  },
  computed: {
    sizeClass() {
      return {
        sm: 'avatar-sm',
        md: 'avatar-md',
        lg: 'avatar-lg',
        xl: 'avatar-xl'
      }[this.size]
    },
    statusClass() {
      return {
        unverified: 'bg-secondary',
        verified: 'bg-success',
        warning: 'bg-warning',
        error: 'bg-danger'
      }[this.status]
    },
    statusIcon() {
      return {
        unverified: 'bi-question',
        verified: 'bi-check',
        warning: 'bi-exclamation',
        error: 'bi-x'
      }[this.status]
    },
    statusText() {
      return {
        unverified: 'Не подтвержден',
        verified: 'Подтвержден',
        warning: 'Есть замечания',
        error: 'Критическая ошибка'
      }[this.status]
    }
  },
  mounted() {
    // Инициализация тултипа
    new Tooltip(this.$el.querySelector('[data-bs-toggle="tooltip"]'))
  },
  methods: {
    handleImageError() {
      this.imageLoadError = true
    }
  }
}
</script>

<style scoped>
.avatar-with-status {
  line-height: 0; /* Убираем лишнее пространство под изображением */
}

.avatar-img {
  display: block;
  object-fit: cover;
  transition: transform 0.2s ease;
}

.avatar-img:hover {
  transform: scale(1.05);
}

/* Размеры аватара */
.avatar-sm {
  width: 32px;
  height: 32px;
}

.avatar-md {
  width: 48px;
  height: 48px;
}

.avatar-lg {
  width: 64px;
  height: 64px;
}

.avatar-xl {
  width: 240px;
  height: 240px;
}

/* Стили для индикатора статуса */
.status-badge {
  bottom: 0;
  right: 0;
  color: white;
}

/* Размеры индикатора в зависимости от размера аватара */
.avatar-sm + .status-badge {
  width: 12px;
  height: 12px;
  font-size: 0.5rem;
}

.avatar-md + .status-badge {
  width: 16px;
  height: 16px;
  font-size: 0.6rem;
}

.avatar-lg + .status-badge {
  width: 20px;
  height: 20px;
  font-size: 0.7rem;
}

.avatar-xl + .status-badge {
  width: 24px;
  height: 24px;
  font-size: 0.8rem;
}
</style>