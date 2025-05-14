<template>
  <div class="modal fade" id="repositoryRatingModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Оценка репозитория: {{ repoName }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Оценка репозитория -->
          <div class="card mb-4">
            <div class="card-body">
              <div class="body d-flex justify-content-between align-items-center mb-3">
                <button 
                  v-tooltip="'Складывается из оценок за оформление, качества кода и дополнительной оценки командой работы'"
                  class="btn btn-outline-dark me-3" >
                  Общая оценка:
                </button>

                <div class="display-4 fw-bold" :class="getRatingColor(rating)" >
                  {{ rating }}/100
                </div>
              </div>
              <div class="progress" style="height: 20px;" >
                <div 
                  class="progress-bar" 
                  :class="getRatingColor(rating, true)"
                  role="progressbar" 
                  :style="{ width: rating + '%' }" 
                  :aria-valuenow="rating" 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>

          <!-- Замечания -->
          <div class="card mb-4" v-if="remarks.length > 0">
            <div class="card-header bg-light">
              <h6 class="mb-0">Замечания к репозиторию</h6>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li 
                  v-for="(remark, index) in remarks" 
                  :key="index" 
                  class="list-group-item d-flex align-items-center"
                >
                  <i class="bi bi-exclamation-circle text-warning me-2"></i>
                  {{ remark }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Сравнение со средним значением -->
          <div class="card">
            <div class="card-header bg-light">
              <h6 class="mb-0">Сравнение со средними баллами за декор по всем репозиториям</h6>
            </div>
            <div class="card-body">
              <canvas ref="comparisonChartDecor"></canvas>
            </div>
          </div>

          <div class="card">
            <div class="card-header bg-light">
              <h6 class="mb-0">Сравнение со средними баллами за качество кода по всем репозиториям</h6>
            </div>
            <div class="card-body">
              <canvas ref="comparisonChartCode"></canvas>
            </div>
          </div>

          <div class="card">
            <div class="card-header bg-light">
              <h6 class="mb-0">Сравнение со средними баллами за бонус по всем репозиториям</h6>
            </div>
            <div class="card-body">
              <canvas ref="comparisonChartBonus"></canvas>
            </div>
          </div>

          <div class="card">
            <div class="card-header bg-light">
              <h6 class="mb-0">Сравнение со средним оценкам по всем репозиториям</h6>
            </div>
            <div class="card-body">
              <canvas ref="comparisonChart"></canvas>
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
import { Tooltip } from 'bootstrap'
import RepoService from '@/services/RepoService'
export default {
    directives: {
    tooltip: {
      mounted(el, binding) {
        let options = {
          title: binding.value,
          html: false,
          placement: 'top'
        }

        if (binding.modifiers.html) {
          options.html = true
        }

        if (typeof binding.value === 'object') {
          options = { ...options, ...binding.value }
        }

        new Tooltip(el, options)
      },
      beforeUnmount(el) {
        const tooltip = Tooltip.getInstance(el)
        if (tooltip) {
          tooltip.dispose()
        }
      }
    }
  },
  name: 'RepositoryRatingModal',
  data() {
    return {
        rating: 0,
        repoName: 'Название репозитория',
        initialRating: 0,
        initialRemarks: [],
        comparisonData: {},
        analisysData: {},
        myData: {},
        averageData:{},
        
        code:0,
        decor: 0,
        team: 0,

        remarks: [],
        chart: null,
        chartDecor: null,
        chartCode: null,
        chartBonus: null,
        modalInstance: null,
    }
  },
  mounted() {
    this.modalInstance = new Modal(document.getElementById('repositoryRatingModal'))

  },
  methods: {
    async show(id) {
      await RepoService.get(id)
      .then(response => {
        
        this.remarks = response.data.comments.split('\n');
        this.rating = response.data.scope_code + response.data.scope_decor + response.data.scope_team
        this.repoName = response.data.title
        this.code = response.data.scope_code
        this.decor = response.data.scope_decor
        this.team = response.data.scope_team
        this.myData = {
            decor: response.data.scope_decor,
            code: response.data.scope_code,
            team: response.data.scope_team,
            security : response.data.scope_security,
            maintability: response.data.scope_maintability,
            reability: response.data.scope_reability
        }
        console.log(this.myData)
      })
      .catch(error => {
        alert(error)
      })
      await RepoService.compare()
      .then(response => {
        
        this.averageData = {
            decor: response.data.scopeDecor,
            code: response.data.scopeCode,
            team: response.data.scopeTeam,
            security : response.data.scopeSecurity,
            maintability: response.data.scopeMaintability,
            reability: response.data.scopeReability
        }
      })
      .catch(error =>{
        console.log(error)
      })
      this.comparisonData =  [
        { name: 'Безопасность', current: this.renderScope(this.myData.security), average: this.renderScope(this.averageData.security) },
        { name: 'Надежность', current: this.renderScope(this.myData.maintability), average: this.renderScope(this.averageData.maintability) },
        { name: 'Расширяемость', current: this.renderScope(this.myData.reability), average: this.renderScope(this.averageData.reability) },
      ]
      this.modalInstance.show()
      this.$nextTick(() => {
        this.renderChart()
      })
    },
    hide() {
      this.modalInstance.hide()
    },
    renderScope(value){
      return (-1*value)+6
    },
    getRatingColor(rating, isProgressBar = false) {
      if (rating >= 80) return isProgressBar ? 'bg-success' : 'text-success'
      if (rating >= 50) return isProgressBar ? 'bg-warning' : 'text-warning'
      return isProgressBar ? 'bg-danger' : 'text-danger'
    },
    clearCharts(){
    if (this.chart) {
      this.chart.destroy()
      this.chart = null
    }
    if (this.chartDecor) {
      this.chartDecor.destroy()
      this.chartDecor = null
    }
    if (this.chartCode) {
      this.chartCode.destroy()
      this.chartCode = null
    }
    if (this.chartBonus) {
      this.chartBonus.destroy()
      this.chartBonus = null
    }
  },
    renderChart() {
      this.clearCharts()
    
      const ctxDecor = this.$refs.comparisonChartDecor.getContext('2d')
      this.chartDecor = new Chart(ctxDecor, {
        type: 'bar',
        data: {
          labels: ["Оценка оформления"],
          datasets: [
            {
              label: 'Текущий репозиторий',
              data: [this.myData.decor],
              backgroundColor: '#4e73df',
              borderColor: '#2e59d9',
              borderWidth: 1
            },
            {
              label: 'Среднее значение',
              data: [this.averageData.decor],
              backgroundColor: '#858796',
              borderColor: '#6c757d',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 30,

            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.raw
                }
              }
            }
          }
        }
      })
      const ctxCode = this.$refs.comparisonChartCode.getContext('2d')
      this.chartCode = new Chart(ctxCode, {
        type: 'bar',
        data: {
          labels:["Оценка кода"],
          datasets: [
            {
              label: 'Текущий репозиторий',
              data: [this.myData.code],
              backgroundColor: '#4e73df',
              borderColor: '#2e59d9',
              borderWidth: 1
            },
            {
              label: 'Среднее значение',
              data: [this.averageData.code],
              backgroundColor: '#858796',
              borderColor: '#6c757d',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 70,

            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.raw
                }
              }
            }
          }
        }
      })
      const ctxBonus = this.$refs.comparisonChartBonus.getContext('2d')
      this.chartBonus = new Chart(ctxBonus, {
        type: 'bar',
        data: {
          labels: ["Бонус"],
          datasets: [
            {
              label: 'Текущий репозиторий',
              data: [this.myData.team],
              backgroundColor: '#4e73df',
              borderColor: '#2e59d9',
              borderWidth: 1
            },
            {
              label: 'Среднее значение',
              data: [this.averageData.team],
              backgroundColor: '#858796',
              borderColor: '#6c757d',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 20,

            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.raw
                }
              }
            }
          }
        }
      })
      const ctx = this.$refs.comparisonChart.getContext('2d')
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.comparisonData.map(m => m.name),
          datasets: [
            {
              label: 'Текущий репозиторий',
              data: this.comparisonData.map(m => m.current),
              backgroundColor: '#4e73df',
              borderColor: '#2e59d9',
              borderWidth: 1
            },
            {
              label: 'Среднее значение',
              data: this.comparisonData.map(m => m.average),
              backgroundColor: '#858796',
              borderColor: '#6c757d',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 5,

            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.raw
                }
              }
            }
          }
        }
      })
      
    },
    saveRating() {
      this.$emit('save-rating', {
        rating: this.rating,
        remarks: this.remarks
      })
      this.hide()
    },
    updateRating(newRating) {
      this.rating = newRating
    },
    addRemark(newRemark) {
      if (newRemark && !this.remarks.includes(newRemark)) {
        this.remarks.push(newRemark)
      }
    }
  },
  
  beforeUnmount() {
    this.clearCharts()
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
  border-radius: 10px;
}

.progress-bar {
  transition: width 0.6s ease;
}

.list-group-item {
  padding: 0.75rem 1.25rem;
  border-color: rgba(0, 0, 0, 0.05);
}

canvas {
  max-height: 300px;
  width: 100% !important;
}
</style>