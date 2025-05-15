<template>
  <div class="modal fade" id="emailConfirmationModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Подтверждение email</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>На адрес <strong>{{ email }}</strong> отправлен код подтверждения. Введите его ниже:</p>
          
          <div class="d-flex justify-content-center gap-2 mb-4">
            <input
              v-for="(digit, index) in codeDigits"
              :key="index"
              type="text"
              maxlength="1"
              class="form-control text-center verification-digit"
              v-model="codeDigits[index]"
              @input="handleCodeInput(index, $event)"
              @keydown.delete="handleBackspace(index, $event)"
              ref="codeInputs"
            >
          </div>

          <div class="text-center">
            <a href="#" @click.prevent="resendCode">Отправить код повторно</a>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
          <button type="button" class="btn btn-primary" @click="confirmCode">Подтвердить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
  name: 'EmailConfirmationModal',
  data() {
    return {
      email: '',
      codeDigits: ['', '', '', '', '', ''],
      modalInstance: null
    }
  },
  mounted() {
    this.modalInstance = new Modal(document.getElementById('emailConfirmationModal'))
  },
  methods: {
    show(email) {
      this.email = email
      this.codeDigits = ['', '', '', '', '', '']
      this.modalInstance.show()
      this.$nextTick(() => {
        if (this.$refs.codeInputs && this.$refs.codeInputs[0]) {
          this.$refs.codeInputs[0].focus()
        }
      })
    },
    hide() {
      this.modalInstance.hide()
    },
    handleCodeInput(index, event) {
      const value = event.target.value
      if (!/^\d*$/.test(value)) {
        this.codeDigits[index] = ''
        return
      }
      if (value && index < 5) {
        this.$nextTick(() => {
          this.$refs.codeInputs[index + 1].focus()
        })
      }
    },
    handleBackspace(index, event) {
      if (!this.codeDigits[index] && index > 0) {
        event.preventDefault()
        this.$refs.codeInputs[index - 1].focus()
      }
    },
    resendCode() {
      // Отправка кода повторно
      alert('Код отправлен повторно на ' + this.email)
    },
    confirmCode() {
      //const code = this.codeDigits.join('')
      // Проверка кода
      this.hide()
      alert('Email успешно подтвержден!')
    }
  }
}
</script>

<style scoped>
.verification-digit {
  width: 40px;
  height: 50px;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>