<template>
  <div class="modal fade" id="compareUsersModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Сравнение репозиториев</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Форма для выбора пользователей -->
          <div class="row mb-4">
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Выберите сервис Git</label>
                <select class="form-select" v-model="selectedService">
                  <option v-for="service in services" :key="service.id" :value="service.id">
                    {{ service.title }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Введите никнейм пользователя</label>
                <input type="text" class="form-control" v-model="customUsername" placeholder="GitHub username">
              </div>
            </div>
          </div>

          <!-- Кнопка сравнения -->
          <div class="text-center mb-4">
            <button 
              class="btn btn-primary px-4" 
              @click="compareUsers"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
              Сравнить
            </button>
          </div>

          <!-- Результаты сравнения -->
          <div v-if="showResults" class="mt-4">
            <h5 class="text-center mb-4">Результаты сравнения</h5>
            
            <div class="row">
              <!-- Круговая диаграмма языков -->
              <div class="col-md-6">
                <div class="card h-100">
                  <div class="card-header">
                    Ваши языки программирования
                  </div>
                  <div class="card-body">
                    <canvas ref="myLanguageChart"></canvas>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card h-100">
                  <div class="card-header">
                    Языки программирования пользователя
                  </div>
                  <div class="card-body">
                    <canvas ref="UserLanguageChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <!-- Столбчатая диаграмма сравнения -->
              <div class="col-md-6">
                <div class="card h-100">
                  <div class="card-header">
                    Сравнение средних баллов по репозиториям
                  </div>
                  <div class="card-body">
                    <canvas ref="comparisonChart"></canvas>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card h-100">
                  <div class="card-header">
                    Сравнение оценок качества репозиториев
                  </div>
                  <div class="card-body">
                    <canvas ref="comparisonAnalisysChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
import Chart from 'chart.js/auto'
import LinkService from '@/services/LinkService';
import RepoService from '@/services/RepoService';
export default {
  name: 'CompareUsersModal',
  data() {
    return {
      selectedService: null,
      customUsername: '',

      services: [],
      myLanguages: [],
      userLanguages: [],
      pointsStats: {},
      analisysStats: {},

      isLoading: false,
      showResults: false,

      myLanguageChart: null,
      UserLanguageChart: null,
      comparisonChart: null,
      comparisonAnalisysChart: null,

      modalInstance: null,

      
    }
  },
  async created() {
    await LinkService.getTypes(1)
                .then(response => {
                    console.log(response.data)
                    this.services = response.data
                })
                .catch(error => {
                    console.log(error)
                })
  },
  mounted() {
    this.modalInstance = new Modal(document.getElementById('compareUsersModal'))
  },
  methods: {
    show() {
      this.resetForm()
      this.modalInstance.show()
    },
    hide() {
      this.modalInstance.hide()
    },
    resetForm() {
      this.selectedService = null
      this.customUsername = ''
      this.showResults = false
      this.destroyCharts()
    },
    async compareUsers() {
      if (!this.selectedService && !this.customUsername) {
        alert('Пожалуйста, выберите сервис и введите никнейм пользователя')
        return
      }

      this.isLoading = true
      this.showResults = false
      this.destroyCharts()
      
      try {
        // Имитация запроса к API
        await RepoService.difference_many(this.selectedService, this.customUsername, localStorage.getItem('user'))
        .then(response => {
          this.myLanguages = response.data.myLanguageCounts;
          this.userLanguages = response.data.compareLanguageCounts
          this.pointsStats = {
            'Баллы за оформление': [response.data.myDecor, response.data.compareDecor],
            'Баллы за код': [response.data.myCode, response.data.compareCode],
          };
          this.analisysStats = {
            'Оценка безопасности': [this.renderScope(response.data.mySecurity), this.renderScope(response.data.compareSecurity)],
            'Оценка надежности': [this.renderScope(response.data.myMaintability), this.renderScope(response.data.compareMaintability)],
            'Оценка расширяемости': [this.renderScope(response.data.myReability), this.renderScope(response.data.compareReability)],
          };
        })
        .catch(error => {
          alert(error)
        })

        this.showResults = true
        this.$nextTick(() => {
          this.renderCharts()
        })
      } catch (error) {
        console.error('Ошибка при сравнении:', error)
        alert('Произошла ошибка при загрузке данных')
      } finally {
        this.isLoading = false
      }
    },
    renderScope(value){
      return (-1*value)+6
    },
    renderCharts() {
      // Круговая диаграмма my языков
      const languageCtx = this.$refs.myLanguageChart.getContext('2d')
      this.myLanguageChart = new Chart(languageCtx, {
        type: 'pie',
        data: {
          labels: Object.keys(this.myLanguages),
          datasets: [{
            data: Object.values(this.myLanguages),
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      })
      const languageUserCtx = this.$refs.UserLanguageChart.getContext('2d')
      this.UserLanguageChart = new Chart(languageUserCtx, {
        type: 'pie',
        data: {
          labels: Object.keys(this.userLanguages),
          datasets: [{
            data: Object.values(this.userLanguages),
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      })
      // Столбчатая диаграмма сравнения
      const comparisonCtx = this.$refs.comparisonChart.getContext('2d')
      this.comparisonChart = new Chart(comparisonCtx, {
        type: 'bar',
        data: {
          labels: Object.keys(this.pointsStats),
          datasets: [
            {
              label: 'Вы',
              data: Object.values(this.pointsStats).map(arr => arr[0]),
              backgroundColor: '#3e95cd'
            },
            {
              label: 'Выбранный пользователь',
              data: Object.values(this.pointsStats).map(arr => arr[1]),
              backgroundColor: '#8e5ea2'
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 70
            }
          },
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      })
      const comparisonAnalisysCtx = this.$refs.comparisonAnalisysChart.getContext('2d')
      this.comparisonAnalisysChart = new Chart(comparisonAnalisysCtx, {
        type: 'bar',
        data: {
          labels: Object.keys(this.analisysStats),
          datasets: [
            {
              label: 'Вы',
              data: Object.values(this.analisysStats).map(arr => arr[0]),
              backgroundColor: '#3e95cd'
            },
            {
              label: 'Выбранный пользователь',
              data: Object.values(this.analisysStats).map(arr => arr[1]),
              backgroundColor: '#8e5ea2'
            },
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 5

            }
          },
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      })
    },
    destroyCharts() {
      if (this.myLanguageChart) {
        this.myLanguageChart.destroy()
        this.myLanguageChart = null
      }
      if (this.UserLanguageChart) {
        this.UserLanguageChart.destroy()
        this.UserLanguageChart = null
      }
      if (this.comparisonChart) {
        this.comparisonChart.destroy()
        this.comparisonChart = null
      }
      if (this.comparisonAnalisysChart) {
        this.comparisonAnalisysChart.destroy()
        this.comparisonAnalisysChart = null
      }
    }
  },
  beforeUnmount() {
    this.destroyCharts()
  }
}
</script>

<style scoped>
.modal-content {
  border-radius: 10px;
}

.card {
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.card-header {
  background-color: #f8f9fa;
  font-weight: 500;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

canvas {
  max-height: 350px;
  width: 100% !important;
}
</style>