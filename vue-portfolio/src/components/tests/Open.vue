<template>
  <div class="dropdown">
    <button 
      class="btn btn-secondary dropdown-toggle" 
      type="button" 
      data-bs-toggle="dropdown"
    >
      {{ selectedItem || 'Выберите вариант' }}
    </button>
    <ul class="dropdown-menu">
      <li v-for="(item, index) in items" :key="index">
        <a 
          class="dropdown-item" 
          href="#"
          @click.prevent="selectedItem = item"
        >
          {{ item }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:"tettASF",
  data() {
    return {
      items: ['Вариант 1', 'Вариант 2', 'Вариант 3'],
      selectedItem: ''
    }
  }
}
</script>