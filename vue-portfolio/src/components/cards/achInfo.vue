<template>

    <div v-if="show" class="modal-shadow" @click.self="closeModal">
        <div class="container">
            <img v-if="repo" alt="Vue logo"
                class="rounded-circle img-custome" 
                  src="https://avatars.mds.yandex.net/i?id=a0c8645964d71bc6fc1219abcba241d4_l-5306514-images-thumbs&n=13">
            <img v-else alt="Vue logo"
                                class="rounded-circle img-custome" 
                                  src="https://vladimir.ruc.su/upload/medialibrary/34d/jn2101ssism0gvf91k1z8x3wjybnzoak.jpg">
            <div class="mb-3">
                <h1>{{ this.title }}</h1>

            </div>

            <div v-if="this.desc.length > 0" class="mb-3">
                <h2>Описание</h2>
                <p>{{ this.desc }}</p>

            </div>
            <div v-if="this.extra.length > 0" class="mb-3">
                <h2>Дополнительная информация</h2>
                <p>{{ this.extra }}</p>

            </div>
            <div v-if="this.link.length > 0" class="mb-3">
                <h3>Ссылка</h3>
                <a v-bind:href="link">{{ this.link }}</a>

            </div>
            <div v-if="repo">
                <div  v-for="(image, index) in images" v-bind:key="index">
                <img  class="img-new" v-bind:src="image">
            </div>
            </div>
            
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
                scope: 0,
                repo: true,
                images:[
                    "https://s.tmimgcdn.com/scr/41800/41864_01main_original.jpg",
                    "https://i.pinimg.com/originals/c0/40/ab/c040aba4edd082232845fb7001945977.jpg",
                    "https://avatars.mds.yandex.net/get-ydo/6059193/2a00000182efa49296483a816ac204fc5b3c/diploma",
                ]
                
            }
        },
        methods: {
            closeModal() {
                this.show = false
            },

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
        overflow: auto ;
        height: fit-content;
        max-height: 80%;
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
        .rounded-circle{
        height: 15%;
        width: 15%;
    }
    .protfolio{
        background-color: #34345238;
        padding-top: 8%;
        padding-bottom: 15%;
        /* padding:15% */
    }
    .img-custome{
        width: 140px;
        height: 140px;
        margin-top: 15px;
    }
    .img-new{
        width: 35%;
        height: 35%;
        margin-top: 15px;
    }
</style>