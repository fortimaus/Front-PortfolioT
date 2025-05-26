<template>
  <div class="dropdown">
    <button 
      class="btn btn-secondary" 
      type="button"
      @click="parseJwt"
    >
      test
    </button>
    
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
  },
  methods:{
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
        return json;
    },
  }
}
</script>