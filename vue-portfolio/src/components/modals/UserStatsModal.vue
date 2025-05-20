<template>
  <div class="modal fade" id="userStatsModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Статистика пользователя</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Блок с баллами -->
          <div class="card mb-4">
            <div class="card-body text-center">
              <h6 class="card-subtitle mb-2 text-muted">Общий рейтинг</h6>
              <div class="display-3 fw-bold text-primary mb-2">{{ rating }}</div>
              <div class="progress" style="height: 10px;">
                <div 
                  class="progress-bar bg-primary" 
                  role="progressbar" 
                  :style="{ width: progressWidth + '%' }"
                  :aria-valuenow="rating" 
                  aria-valuemin="0" 
                  aria-valuemax="1000"
                ></div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header bg-light">
              <h6 class="mb-0">Детализация баллов</h6>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li 
                  v-for="(item, index) in pointsBreakdown" 
                  :key="index" 
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  {{ item.category }}
                  <span class="badge bg-primary rounded-pill">{{ item.points }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="row">
            <h5 class="my-4">Общее сравнение</h5>
            <div class="col-md-6 mb-4">
              <div class="card h-100">
                <div class="card-header bg-light">
                  <h6 class="mb-0">Соотношение видов ваших работ</h6>
                </div>
                <div class="card-body">
                  <canvas ref="myWorksChart"></canvas>
                </div>
              </div>
            </div>
            <div class="col-md-6 mb-4">
              <div class="card h-100">
                <div class="card-header bg-light">
                  <h6 class="mb-0">Сравнение с другими</h6>
                </div>
                <div class="card-body">
                  <canvas ref="allWorksChart"></canvas>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <h5 class="my-4">Сравнение репозиториев</h5>
            <div class="col-md-6 mb-4">
              <div class="card h-100">
                <div class="card-header bg-light">
                  <h6 class="mb-0">Средний балл репозиториев</h6>
                </div>
                <div class="card-body">
                  <canvas ref="repoRating"></canvas>
                </div>
              </div>
            </div>
            <div class="col-md-6 mb-4">
              <div class="card h-100">
                <div class="card-header bg-light">
                  <h6 class="mb-0">Средние оценки репозиториев</h6>
                </div>
                <div class="card-body">
                  <canvas ref="repoScopes"></canvas>
                </div>
              </div>
            </div>
            
            <div class="col-md-6 mb-4">
              <div class="card h-100">
                <div class="card-header bg-light">
                  <h6 class="mb-0">Среднее качество кода репозиториев</h6>
                </div>
                <div class="card-body">
                  <canvas ref="repoCode"></canvas>
                </div>
              </div>
            </div>
            
            <div class="col-md-6 mb-4">
              <div class="card h-100">
                <div class="card-header bg-light">
                  <h6 class="mb-0">Среднее качество оформления репозиториев</h6>
                </div>
                <div class="card-body">
                  <canvas ref="repoDecor"></canvas>
                </div>
              </div>
            </div>

            <div class="col-md-6 mb-4">
              <div class="card h-100">
                <div class="card-header bg-light">
                  <h6 class="mb-0">Средний бонус репозиториев</h6>
                </div>
                <div class="card-body">
                  <canvas ref="repoTeam"></canvas>
                </div>
              </div>
            </div>

            <div class="col-md-6 mb-4">
              <div class="card h-100">
                <div class="card-header bg-light">
                  <h6 class="mb-0">Соотношение ваших языков программирования</h6>
                </div>
                <div class="card-body">
                  <canvas ref="myRepoLanguages"></canvas>
                </div>
              </div>
            </div>

            <div class="col-md-6 mb-4">
              <div class="card h-100">
                <div class="card-header bg-light">
                  <h6 class="mb-0">Соотношение языков программирования пользователей</h6>
                </div>
                <div class="card-body">
                  <canvas ref="allRepoLanguages"></canvas>
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
import UserService from '@/services/UserService'
export default {
  name: 'UserStatsModal',

  data() {
    return {
      modalInstance: null,
      userData: {},
      averageData:{},
      rating: 0,
      compareData:{},
      analisysStats: [],
      pointsBreakdown: [],

      myWorksChart: null,
      AllWorksChart: null,

      repoRating:null,

      repoScopes: null,
      
      repoCode: null,
      repoDecor: null,
      repoTeam: null,

      myRepoLanguages: null,
      allRepoLanguages: null,

    }
  },
  computed: {
    progressWidth() {
      return (this.rating / 100) * 100
    }
  },
  mounted() {
    this.modalInstance = new Modal(document.getElementById('userStatsModal'))
  },
  methods: {
    renderScope(value){
      return (-1*value)+6
    },
    async show(id) {
      await UserService.stats(id)
      .then(response => {
        this.userData = response.data.user;
        this.averageData = response.data.average;
        this.rating = this.userData.rating
        this.pointsBreakdown = [
          { category: 'Репозитории', points: this.userData.averageScopeRepos },
          { category: 'Статьи', points: this.userData.scopeArticles },
        ]
        this.compareData = {
          labels: ["Репозитории", "Статьи","Достижения"],
          datasets: [
          {
            label: 'Вы',
            data: [this.userData.countRepos, this.userData.countArticles,this.userData.countAchievements, ]
          },
          {
            label: 'Среднее',
            data: [this.averageData.countRepos, this.averageData.countArticles,this.averageData.countAchievements,]
          },
        ]
        

        }
          this.analisysStats = {
            'Безопасность': [this.renderScope(this.userData.repoInfo.scopeSecurity), this.renderScope(this.averageData.repoInfo.scopeSecurity)],
            'Надежность': [this.renderScope(this.userData.repoInfo.scopeMaintability), this.renderScope(this.averageData.repoInfo.scopeMaintability)],
            'Расширяемость': [this.renderScope(this.userData.repoInfo.scopeReability), this.renderScope(this.averageData.repoInfo.scopeReability)],
          };
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
      this.modalInstance.show()
      this.$nextTick(() => {
        this.initCharts()
      })
    },
    hide() {
      this.modalInstance.hide()
    },
    clearChart(){
      if (this.myWorksChart) {
        this.myWorksChart.destroy()
        this.myWorksChart = null
      }
      if (this.allWorksChart) {
        this.allWorksChart.destroy()
        this.allWorksChart = null
      }
      if (this.repoRating) {
        this.repoRating.destroy()
        this.repoRating = null
      }
      if (this.repoScopes) {
        this.repoScopes.destroy()
        this.repoScopes = null
      }
      if (this.repoCode) {
        this.repoCode.destroy()
        this.repoCode = null
      }

      if (this.repoDecor) {
        this.repoDecor.destroy()
        this.repoDecor = null
      }

      if (this.repoTeam) {
        this.repoTeam.destroy()
        this.repoTeam = null
      }
      if (this.myRepoLanguages) {
        this.myRepoLanguages.destroy()
        this.myRepoLanguages = null
      }
      if (this.allRepoLanguages) {
        this.allRepoLanguages.destroy()
        this.allRepoLanguages = null
      }

    },
    initCharts() {
      // Уничтожаем старые графики если они есть
      this.clearChart()
      // Круговая диаграмма достижений
      const myWorksCtx = this.$refs.myWorksChart.getContext('2d')
      this.myWorksChart = new Chart(myWorksCtx, {
        type: 'doughnut',
        data: {
          labels: ["Репозитории","Статьи","Личные достижения"],
          datasets: [{
            data: [this.userData.countRepos,this.userData.countArticles,this.userData.countAchievements],
          }]
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          },
          cutout: '70%'
        }
      })

      // Столбчатая диаграмма сравнения
      const allWorksCtx = this.$refs.allWorksChart.getContext('2d')
      this.allWorksChart = new Chart(allWorksCtx, {
        type: 'bar',
        data: {
          labels: this.compareData.labels,
          datasets: this.compareData.datasets.map((set) => ({
            label: set.label,
            data: set.data,

          }))
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            }
          }
        }
      })
      const repoRatingCtx = this.$refs.repoRating.getContext('2d')
      this.repoRating = new Chart(repoRatingCtx, {
        type: 'bar',
        data: {
          labels: [''],
          datasets: [
            {
              label: 'Вы',
              data: [this.userData.averageScopeRepos],
              backgroundColor: '#3e95cd'
            },
            {
              label: 'Среднее',
              data: [this.averageData.averageScopeRepos],
              backgroundColor: '#8e5ea2'
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            }
          }
        }
      })
      const repoScopesCtx = this.$refs.repoScopes.getContext('2d')
      this.repoScopes = new Chart(repoScopesCtx, {
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
              label: 'Среднее',
              data: Object.values(this.analisysStats).map(arr => arr[1]),
              backgroundColor: '#8e5ea2'
            },
          ]
        },
        options: {
          maintainAspectRatio: false,
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

      const repoCodeCtx = this.$refs.repoCode.getContext('2d')
      this.repoCode = new Chart(repoCodeCtx, {
        type: 'bar',
        data: {
          labels: [''],
          datasets: [
            {
              label: 'Вы',
              data: [this.userData.repoInfo.scopeCode],
              backgroundColor: '#3e95cd'
            },
            {
              label: 'Среднее',
              data: [this.averageData.repoInfo.scopeCode],
              backgroundColor: '#8e5ea2'
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            }
          }
        }
      })

      const repeDecorCtx = this.$refs.repoDecor.getContext('2d')
      this.repoDecor = new Chart(repeDecorCtx, {
        type: 'bar',
        data: {
          labels: [''],
          datasets: [
            {
              label: 'Вы',
              data: [this.userData.repoInfo.scopeDecor],
              backgroundColor: '#3e95cd'
            },
            {
              label: 'Среднее',
              data: [this.averageData.repoInfo.scopeDecor],
              backgroundColor: '#8e5ea2'
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            }
          }
        }
      })

      const repoReabCtx = this.$refs.repoTeam.getContext('2d')
      this.repoTeam = new Chart(repoReabCtx, {
        type: 'bar',
        data: {
          labels: [''],
          datasets: [
            {
              label: 'Вы',
              data: [this.userData.repoInfo.scopeTeam],
              backgroundColor: '#3e95cd'
            },
            {
              label: 'Среднее',
              data: [this.averageData.repoInfo.scopeTeam],
              backgroundColor: '#8e5ea2'
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            }
          }
        }
      })
      //
      const myLanguageCtx = this.$refs.myRepoLanguages.getContext('2d')
      this.myRepoLanguages = new Chart(myLanguageCtx, {
        type: 'pie',
        data: {
          labels: Object.keys(this.userData.repoInfo.languageCounts),
          datasets: [{
            data: Object.values(this.userData.repoInfo.languageCounts),
            borderWidth: 1
          }]
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      })
      const allLanguageCtx = this.$refs.allRepoLanguages.getContext('2d')
      this.allRepoLanguages = new Chart(allLanguageCtx, {
        type: 'pie',
        data: {
          labels: Object.keys(this.averageData.repoInfo.languageCounts),
          datasets: [{
            data: Object.values(this.averageData.repoInfo.languageCounts),
            borderWidth: 1
          }]
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      })
  },
  beforeUnmount() {
    this.clearChart()
  },
}
}
</script>

<style scoped>
.modal-content {
  border-radius: 10px;
}

.card {
  border-radius: 8px;
  border: none;
  box-shadow: 0 0.15rem 0.5rem rgba(0, 0, 0, 0.05);
}

.card-header {
  font-weight: 600;
}

.progress {
  border-radius: 5px;
}

.list-group-item {
  border-color: rgba(0, 0, 0, 0.05);
}

canvas {
  min-height: 250px;
  width: 100% !important;
}

.badge {
  font-size: 0.85em;
}
</style>