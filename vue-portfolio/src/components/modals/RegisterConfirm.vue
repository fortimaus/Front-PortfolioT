<template>
    <div class="modal fade" id="emailConfirmationModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title">Подтверждение email</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            
            <div>
              <p>Введите 6-значный код из письма, отправленного на <strong>{{ email }}</strong></p>
              
              <div class="d-flex justify-content-center gap-2 mb-3">
                <input
                  v-for="(digit, index) in digits"
                  :key="index"
                  type="text"
                  maxlength="1"
                  class="form-control text-center verification-digit"
                  v-model="digits[index]"
                  @input="handleInput(index, $event)"
                  @keydown.delete="handleBackspace(index, $event)"
                  ref="digitInputs"
                >
              </div>
  
              <div v-if="error" class="alert alert-danger mb-0">
                {{ error }}
              </div>
            </div>
          </div>
          <div class="modal-footer border-0 pt-0">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
            <button 
              type="button" 
              class="btn btn-primary"
              @click="verifyCode"
              :disabled="!isCodeComplete || verifying"
                >
              <span v-if="verifying" class="spinner-border spinner-border-sm me-2"></span>
              Подтвердить
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Modal } from 'bootstrap'
  import UserService from '../../services/UserService';
  export default {
    name: 'RegisterConfirm',
    props: {
      email: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        digits: ['', '', '', '', '', ''],
        verifying: false,
        user: null,
        error: '',
        modalInstance: null
      }
    },
    computed: {
      isCodeComplete() {
        return this.digits.every(d => d !== '')
      },
      verificationCode() {
        return this.digits.join('')
      }
    },
    mounted() {
      this.modalInstance = new Modal(document.getElementById('emailConfirmationModal'))
    },
    methods: {
      show() {
        this.resetState()
        this.modalInstance.show()
      },
      hide() {
        this.modalInstance.hide()
      },
      resetState() {
        this.digits = ['', '', '', '', '', '']
        this.error = ''
      },
      handleInput(index, event) {
        const value = event.target.value
        
        // Разрешаем только цифры
        if (!/^\d*$/.test(value)) {
          this.digits[index] = ''
          return
        }
        
        // Переход к следующему полю
        if (value && index < 5) {
          this.$nextTick(() => {
            this.$refs.digitInputs[index + 1].focus()
          })
        }
      },
      handleBackspace(index, event) {
        if (!this.digits[index] && index > 0) {
          event.preventDefault()
          this.$refs.digitInputs[index - 1].focus()
        }
      },
      async verifyCode() {
        this.verifying = true
        this.error = ''
        await UserService.confirmEmail(this.user,this.digits.join(""))
        .then(response => {
            console.log(response.status)
            alert("Почта подтверждена. Ввойдите в свой профиль")
            this.hide()
            this.$router.push('/login');
            })
        .catch(error =>
        {
            this.verifying = false
            console.log(error.status)
            this.error = "Неверный код подтверждения"
        })
        }
    }
}
</script>
  
  <style scoped>
  .verification-digit {
    width: 45px;
    height: 60px;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .modal-content {
    border-radius: 12px;
    border: none;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  }
  
  .modal-header {
    padding: 1.5rem 1.5rem 0;
  }
  
  .modal-body {
    padding: 1rem 1.5rem;
  }
  
  .modal-footer {
    padding: 0 1.5rem 1.5rem;
  }
  
  .btn-close:focus {
    box-shadow: none;
  }
  </style>