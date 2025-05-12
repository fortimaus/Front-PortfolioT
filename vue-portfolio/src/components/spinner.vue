<template>
    <div v-if="show" class="modal-shadow " @click.self="closeModal">
        <div class="spinner-border text-light " style="width: 6rem; height: 6rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>
 
<script>
    export default {
        name: "ModalUpdate",
        data: function () {
            return {
                show: false,
                
            }
        },
        methods: {
            closeModal() {
                this.show = false
            }
        }
    }
</script>
 
<style scoped >
    
    .modal-shadow {
        position:fixed;
        top: 0;
        left: 0;
        min-height: 100%;
        width: 100%;
        padding: 50px ;
        background: rgba(0, 0, 0, 0.39);
        display: flex;
        justify-content: center;
        align-items: center;
    }
 
    .container {
        position: absolute;
        min-width: 100px;
        min-height: 40%;
        height: fit-content;
        top: 50%;
        left: 50%;
        padding: 1%;
        display: flex;
        justify-content: center;
        transform: translate(-50%, -55%);
        background-color: #fff;
        border-radius: 12px;
        border: 12px solid rgb(141, 253, 255);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
 
    }
    .modal-close {
            border-radius: 50%;
            color: #fff;
            background: #2a4cc7;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 7px;
            right: 7px;
            width: 30px;
            height: 30px;
            cursor: pointer;
        }

</style>