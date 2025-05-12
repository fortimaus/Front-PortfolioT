<template>
    <div v-if="show" class="modal-shadow" @click.self="closeModal">
        <div class="container">
            <form >
                <div v-if="comments.length > 0" class="comments">
                    <h4>Замечания</h4>
                    <div v-for="comment in comments.split('\n')" v-bind:key="comment">
                        <p>{{ comment }}</p>
                    </div>
                </div>
                
                <h3 v-if="scope != 0">Оценка работы: {{ this.scope }} / 100</h3>
                    
                             <div class="mb-3">
                                 <label 
                                     htmlFor="name"
                                     class="form-label">Название
                                 </label>
                                 <input 
                                     type="text"
                                     class="form-control"
                                     id="name"
                                     name="name"
                                     v-model="title"
                                 />
                                 
                             </div>
                             <div class="mb-3">
                                 <label 
                                     htmlFor="phone"
                                     class="form-label">Ссылка
                                 </label>
                                 <input 
                                     type="text"
                                     class="form-control"
                                     id="phone"
                                     name="phone"
                                     v-model="link"
                                 />
                                 
                             </div>
                             
                             <div class="mb-3">
                                 <label 
                                     htmlFor="desc"
                                     class="form-label">Описание
                                 </label>
                                 <textarea  
                                     type="desc"
                                     class="form-control"
                                     id="desc"
                                     name="desc"
                                     v-model="desc" rows="3"></textarea>
                                 
                             </div>
                             <div class="mb-3">
                                 <label 
                                     htmlFor="email"
                                     class="form-label">Дополнительная информация:
                                 </label>
                                 <textarea  
                                     type="extra"
                                     class="form-control"
                                     id="extra"
                                     name="extra"
                                     v-model="extra" rows="3"></textarea>
                                 
                             </div>
                             
                             <div class="d-grid gap-2">
                                 <button 
                                     type="button"
                                     class="btn btn-primary btn-block">Выбрать картинку
                                 </button>
                                
                             </div>

                             <div class="d-grid gap-2">
                                 <button 
                                     @click="addAch"
                                     type="button"
                                     class="btn btn-primary btn-block">
                                     <p >Редактировать</p>
                                 </button>
                                
                             </div>
                         </form>
        </div>
    </div>
</template>
 
<script>
    export default {
        name: "ModalUpdate",
        data: function () {
            return {
                show: false,
                title:'',
                link:'',
                desc: '',
                extra: '',
                comments:'',
                scope: 0
                
            }
        },
        methods: {
            closeModal() {
                this.show = false
            },
            addAch(){
                this.$emit('close');
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
    }
 
    .container {
        position: absolute;
        min-width: 100px;
        height: fit-content;
        top: 50%;
        left: 50%;
        padding: 1%;
        transform: translate(-50%, -55%);
        background-color: #fff;
        border-radius: 2px;
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
 
    .modal-title {
        color: #0971c7;
    }

    .modal-content {
        margin-bottom: 20px
        }
    .comments
    {
        width: 100%;
        height: fit-content;
        background-color: #f6ff0088;
    }
</style>