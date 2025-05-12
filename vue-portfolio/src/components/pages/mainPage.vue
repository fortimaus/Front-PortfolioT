<template>
<nav class="navbar px-4 navbar-expand-lg navbar-dark bg-dark text-center" >
        
        <router-link to="/" class="navbar-brand">
            <div class="logo-container text-center">
                <span class="logo-text">Portfolio<span class="logo-highlight">T</span></span>
            </div>
        </router-link>
        <div class="container-fluid">
            <div class="navbar-nav mr-auto ">
                <li class="nav-item">
                  <a class="nav-link" @click="showSettings()">Настройки</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" @click="showListUsers()">Список пользователей</a>
                </li>
            </div>
          <div class="d-flex navbar-brand">
            <button type="button" class="btn btn-light" @click="exit()">Выйти</button>
        </div>
        </div>
      </nav>
<div>
        <section class="section">
            <div class="container-fliud">
                <img alt="Vue logo" class="rounded-circle" 
                    v-bind:style="styleObj"
                    v-bind:src="avatar">
                <h1>{{ this.login }}</h1>
                <h5>{{ this.about }}</h5>            
            </div>
        </section>
        <section class="protfolio d-grid gap-4">
            <h1>Портфолио</h1>
            <div class="d-grid mx-4 gap-4">

                <button type="button" class="btn p-2 btn-primary" @click="generateAll()">
                Собрать из всех источников</button>
                <button type="button" class="btn p-2 btn-success" @click="showAchievementModal">
                    Добавить личное достижение</button>
            </div>
            <div class="d-grid gap-4">
                <div v-if="this.repos.length > 0"  class="container repos py-4">
                <h2>Репозитории</h2>
                <div class="row">
                    <div class="col-md-3 " v-for="repo in repos" v-bind:key="repo.id" >
                            <BasicCard
                            :title="repo.title"
                            :desc="repo.description"
                            :preview="repo.preview"
                            @showInfo="showRepoInfo(repo)"
                            >
                                <div class="d-grid mx-4 gap-2">
                                    <button type="button" class="btn btn-outline-secondary" @click="showRepo(repo.id)">
                                        Редактировать
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="deleteRepo(repo.id)">
                                        Удалить
                                    </button>
                                </div>
                            </BasicCard>
                            <br>
                    </div>
                    
                </div>
            </div>
            <div v-if="this.articles.length > 0"  class="container articles py-4">
                <h2>Статьи</h2>
                <div class="row">
                    <div class="col-md-3" v-for="article in articles" v-bind:key="article.id" >
                            <BasicCard
                            :title="article.title"
                            :desc="article.words"
                            :preview="article.preview"
                            @showInfo="showArticleInfo(article)"
                            >
                                <div class="d-grid mx-4 gap-2">
                                    <button type="button" class="btn btn-outline-secondary" @click="showArticleInfo(article)">
                                        Редактировать
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="deleteArticle(article.id)">
                                        Удалить
                                    </button>
                                </div>
                            </BasicCard>
                            <br>
                    </div>
                    
                </div>
            </div>

            <div v-if="this.achievements.length > 0" class="container achs py-4">
                <h2>Личные достижения</h2>
                <div class="row">
                    <div class="col-md-3 " v-for="ach in achievements" v-bind:key="ach.id" >
                            <BasicCard
                            :title="ach.title"
                            :desc="ach.description"
                            :preview="ach.preview"
                            @showInfo="showAchievementInfo(ach)"
                            >
                                <div class="d-grid mx-4 gap-2">
                                    <button type="button" class="btn btn-outline-secondary" @click="showAchievementInfo(ach)">
                                        Редактировать
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="deleteAch(ach.id)">
                                        Удалить
                                    </button>
                                </div>
                            </BasicCard>
                            <br>
                    </div>
                    
                    
                </div>
            </div>
            
            </div>
            
        </section>
    </div>
    <AchievementModal 
      ref="achievementModal"
      @achievement-created="handleNewAchievement"
    />
    <AchievementViewModal 
      ref="achievementViewModal"
      :achievementData="currentAchievement"
    />
    <showUpdate ref="artUp" @close="updateArt"></showUpdate>
    <showUpdate ref="repoUp" @close="updateRepo"></showUpdate>
    <showUpdate ref="createAch" @close="createNew"></showUpdate>
    <achInfo ref="info"></achInfo>
    <userUpdate ref="userUpdate" @close="updUser"></userUpdate>
    <user_list ref="listUs"></user_list>
    <spinner ref="spin"></spinner>
</template>
<script>
import AchievementService from '../../services/AchievementService';
import UserService from '../../services/UserService';
import RepoService from '@/services/RepoService';
import ArticleService from '@/services/ArticleService';
//import LinkService from '@/services/LinkService';

import BasicCard from '../cards/BasicCard.vue'
import AchievementModal from '../modals/AchievementModal.vue'
import AchievementViewModal from '../modals/AchievementViewModal.vue'

import showUpdate from '../modals/showUpdate.vue'
import achInfo from '../cards/achInfo.vue'
import userUpdate from '../modals/userUpdate.vue';
import user_list from '../modals/user_list.vue';
import spinner from '../spinner.vue';
export default {
    name: "achs-list",
    components: {
    BasicCard,
    AchievementModal,
    AchievementViewModal,

    showUpdate,
    achInfo,
    userUpdate,
    user_list,
    spinner
    },
    beforeCreate() {
        if (localStorage.getItem("token") == null) {
            this.$router.push("/login");
        }
    },
    async created(){
        await UserService.get(localStorage.getItem('user'))
        .then(response => {
            this.login = response.data.login;
            this.about = response.data.about;
            if(response.data.preview == null)
                this.avatar = "https://ds4-sosnovoborsk-r04.gosweb.gosuslugi.ru/netcat_files/21/10/blankdirectory_3.png"
            else
            {
                this.avatar = `data:image/png;base64,${response.data.preview}`;
            }
                
        })
        .catch(error =>{
            console.log(error)
            alert("Ваш токен устарел")
            this.$router.push("/login");
        })
        this.getInfo()
    },
    data() {
      return {
        login: null,
        about: null,
        avatar: null,

        default_image_repo: "https://camo.githubusercontent.com/4e748a1a647da2caf4aa61d6b8f73ecd34af304ca94b4542d606b37dcaf72ccb/68747470733a2f2f63646e2e776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f6769742d69636f6e2e737667",
        default_image_article: "https://sun1-25.userapi.com/s/v1/ig2/-Cx7oKn0kXnxtusDrlNwcMK2jPQt0T2x7p5ysmpsyEfTPDJgK3YopmTiD5ntLlKBWx3kXOY-7K_3hNF3y8BWJ1wK.jpg?size=1067x1067&quality=95&crop=0,0,1067,1067&ava=1",
        default_image_ach: "https://vimk.ddu2.minskedu.gov.by/files/01268/obj/110/37623/img/unnamed_1.jpg",
        repos:[],
        articles: [],
        achievements: [],
        currentAchievement: {
            title: '',
            description: '',
            link: null,
            additionalInfo: null,
            images: []
        },
        ulstu: "VoldemarProger",
        gitHub: "fortimaus",
        elib: "Романов-2020-2023",        
        scope: 0,
        currentArt : -1,
        currentRepo : -1,
        midR: 0,
        midA: 0,
      };
    },
    computed:{
        styleObj(){
            return {
                'border': '18px ' + 'outset ' + 'rgb('+ (125 * this.scope / 100) + ',' + (255 * (this.scope) / 100) + ',' + 0 + ',' + 0.15 + ')'
            }
        }
    },
    methods: {
        exit(){
            localStorage.clear();
            this.$router.push('/login');
        },
        async generateAll(){
            this.$refs.spin.show = true
            await AchievementService.generate(localStorage.getItem('user'))
            .then(response => {
                console.log(response.data);
                this.getInfo()
            }).catch(e => {
                alert("Произошла ошибка: " + e.status)
                console.log(e)
          })
        },
        async getRepos(){
            await RepoService.getbyUser(localStorage.getItem('user'))
            .then(response => {
                this.repos = [];
                response.data.forEach(element =>{
                    if(element.preview == null)
                        element.preview = this.default_image_repo
                    else{
                        element.preview = `data:image/png;base64,${element.preview}`
                    }
                    this.repos.push(element)
                })
            })
            .catch(e =>{
              console.log("Repos: " + e)
            })
        },
        async getArticles(){
            await ArticleService.getbyUser(localStorage.getItem('user'))
            .then(response => {
                this.articles = []
                response.data.forEach(element =>{
                    if(element.preview == null)
                        element.preview = this.default_image_article
                    else{
                        element.preview = `data:image/png;base64,${element.preview}`
                    }
                    
                    this.articles.push(element)
                })
            })
            .catch(error => console.log("Articles: " + error))
        },
        async getAchievements(){
            await AchievementService.getbyUser(localStorage.getItem('user'))
                .then(response => {
                    this.achievements = []
                    response.data.forEach(element =>{
                    if(element.preview == null)
                        element.preview = this.default_image_ach
                    else{
                        element.preview = `data:image/png;base64,${element.preview}`
                    }
                    
                    this.achievements.push(element)
                })
                })
                .catch(error => console.log("Ach: " + error))
        },
        async getInfo(){
            await this.getRepos();
            await this.getArticles();
            await this.getAchievements();
            this.$refs.spin.closeModal();
        },
        async handleNewAchievement(){
            await AchievementService.getbyUser(localStorage.getItem('user'))
                .then(response => {
                    this.achievements = []
                    response.data.forEach(element =>{
                    if(element.preview == null)
                        element.preview = this.default_image_ach
                    else{
                        element.preview = `data:image/png;base64,${element.preview}`
                    }
                    
                    this.achievements.push(element)
                })
                })
                .catch(error => console.log("Ach: " + error))
        },
        showAchievementModal() {
          this.$refs.achievementModal.show()
        },
        async deleteRepo(id){
            await RepoService.delete(id)
            .then(response =>{
                console.log(response)
                alert("Удаление прошло успешно")
                this.getRepos();
            })
            .catch(error => {
                alert("Произошла ошибка")
                console.log(error)
            })
        },
        async deleteArticle(id){
            await ArticleService.delete(id)
            .then(response =>{
                console.log(response)
                alert("Удаление прошло успешно")
                this.getArticles();
            })
            .catch(error => {
                alert("Произошла ошибка")
                console.log(error)
            })
        },
        async deleteAch(id){
            await AchievementService.delete(id)
            .then(response =>{
                console.log(response)
                alert("Удаление прошло успешно")
                this.getAchievements();
            })
            .catch(error => {
                alert("Произошла ошибка")
                console.log(error)
            })
        },
        refactorImages(images){
            let res = [];
            console.log(images)
            if(images && images.length > 0)
            {
                
                images.forEach(element =>{
                    console.log(element)
                    res.push(`data:image/png;base64,${element.image}`);
                })
                
            }
            return res
        },
        showRepoInfo(repo){
            let images = this.refactorImages(repo.images)
            let curAch = {
            title: repo.title,
            description: repo.description,
            link: repo.link ? repo.link : null,
            additionalInfo: repo.language && repo.language.length > 0 ? "Язык программирования" + repo.language : null,
            images: images
            }
            this.currentAchievement = curAch
            this.$refs.achievementViewModal.show()
        },
        showArticleInfo(article){
            let images = this.refactorImages(article.images)
            let curAch = {
            title: article.title,
            description: article.description,
            link: article.link ? article.link : null,
            additionalInfo: article.words,
            images: images
            }
            this.currentAchievement = curAch
            this.$refs.achievementViewModal.show()
        },
        showAchievementInfo(ach){
            let images = this.refactorImages(ach.images)
            console.log(images)
            let curAch = {
            title: ach.title,
            description: ach.description,
            link: ach.link ? ach.link : null,
            additionalInfo: null,
            images: images
            }
            this.currentAchievement = curAch
            this.$refs.achievementViewModal.show()
        },
        
        
    },
}
</script>
<style lang="css" scoped>
    .logo-text {
        font-size: 2rem;
        font-weight: 600;
        color: #ffffff;
      }

      .logo-highlight {
        color: #42b983;
      }
    .section{
        padding-top: 10%;
        padding-bottom: 10%;
    }
    .rounded-circle{
        height: 20%;
        width: 20%;
    }
    .protfolio{
        border-top: 1rem solid #d3d3d3;
        background-color: #b4b4bd17;
        padding-top: 8%;
        padding-bottom: 10%;
        /* padding:15% */
    }
    .img-custome{
        width: 140px;
        height: 140px;
        margin-top: 15px;
    }
    .container{
        box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.6);
        border-width:100%;
        border-radius: 10px;
    }
    .repos {
        background-color: #c1ccff;
    }
    .articles {
        background-color: #d8ffd8;
    }
    .achs {
        background-color: #ffe1bb;
    }

</style>
