<template>
    <div class="card py-4  px-2" @click.self="showInfo">
        <div class="card-head " @click="showInfo">
            <img alt="preview" class="rounded-circle img-custome mb-2" 
             v-bind:src="preview ">
            <h3>{{ title }}</h3>
        </div>
        <hr>
        <div class="card-body" @click="showInfo">
            <p> {{ desc}} </p>
        </div>
         <slot></slot>               
    </div>
</template>
<script>
    export default {
        name: "BasicCard",
        props: {
            title: {
                type: String,
                required: true,
            },
            desc: {
                type: String,
                required: true,
            },
            preview: {
                type: String,
                required: true,
            },
        },
        methods:{
            showInfo(){
                this.$emit('showInfo')
            }
        }
        
    };
</script>
<style>
    .card{
        box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
    }
    .rounded-circle{
        height: 20%;
        width: 20%;
    }
    .img-custome{
        width: 140px;
        height: 140px;
        margin-top: 15px;
    }
</style>