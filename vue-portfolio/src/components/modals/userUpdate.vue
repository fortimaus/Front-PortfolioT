<template>
    <div v-if="show" class="modal-shadow" @click.self="closeModal">
        <div class="container">
            <form >
                 
                <div class="mb-3">
                    <label 
                        htmlFor="name"
                        class="form-label">Логин
                    </label>
                    <input 
                        type="text"
                        class="form-control"
                        id="name"
                        name="name"
                        v-model="login"
                    />

                </div>
                <div class="mb-3">
                    <label 
                        htmlFor="phone"
                        class="form-label">Пароль
                    </label>
                    <input 
                        type="password"
                        class="form-control"
                        id="phone"
                        name="phone"
                        v-model="password"
                    />

                </div>
                <div class="mb-3">
                    <label 
                        htmlFor="phone"
                        class="form-label">Почта
                    </label>
                    <input 
                        type="text"
                        class="form-control"
                        id="phone"
                        name="phone"
                        v-model="email"
                    />

                </div>

                <div class="mb-3">
                    <label 
                        htmlFor="desc"
                        class="form-label">О себе
                    </label>
                    <textarea  
                        type="desc"
                        class="form-control"
                        id="desc"
                        name="desc"
                        v-model="about" rows="3"></textarea>

                </div>
                <div class="mb-3">
                    <label 
                        htmlFor="email"
                        class="form-label">Логин GitUlstu:
                    </label>
                    <input  
                        type="extra"
                        class="form-control"
                        id="extra"
                        name="extra"
                        v-model="ulstu" rows="3">

                </div>
                <div class="mb-3">
                    <label 
                        htmlFor="email"
                        class="form-label">Логин GitHub:
                    </label>
                    <input  
                        type="extra"
                        class="form-control"
                        id="extra"
                        name="extra"
                        v-model="github" rows="3">

                </div>

                <div class="mb-3">
                    <label 
                        htmlFor="email"
                        class="form-label">Данные Elib Ulstu:
                    </label>
                    <div></div>
                    <label 
                        htmlFor="email"
                        class="form-label">ФИО
                    </label>
                    <input  
                        type="extra"
                        class="form-control"
                        id="extra"
                        name="extra"
                        v-model="fio" rows="3">
                    <label 
                        htmlFor="email"
                        class="form-label">Дата поступления
                    </label>
                    <input  
                        type="extra"
                        class="form-control"
                        id="extra"
                        name="extra"
                        v-model="datefrom" rows="3">
                        <label 
                        htmlFor="email"
                        class="form-label">Дата окончания обучения
                    </label>
                    <input  
                        type="extra"
                        class="form-control"
                        id="extra"
                        name="extra"
                        v-model="dateTo" rows="3">

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
                login:'Voldemar',
                password:'12345678',
                email: 'VladimirMorozov.73@yandex.ru',
                ulstu: "VoldemarProger",
                github:'fortimaus',
                elib: "Романов-2020-2023",
                fio: 'Романов',
                datefrom: '2020',
                dateTo:'2023',
                about: 'Студент-программист, знаком с C#, Java, Python'
                
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
        max-height: 80%;
        overflow: auto ;
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
</style>